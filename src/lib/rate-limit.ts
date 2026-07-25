import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix: string;
}

interface RateLimitResult {
  limited: boolean;
  response?: NextResponse;
  remaining: number;
  resetTime: number;
}

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.slice(0, 50)}`;
}

function getWindowStart(windowMs: number): Date {
  const now = new Date();
  const windowStartMs = Math.floor(now.getTime() / windowMs) * windowMs;
  return new Date(windowStartMs);
}

function getWindowEnd(windowStart: Date, windowMs: number): Date {
  return new Date(windowStart.getTime() + windowMs);
}

export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(request);
  const key = `${config.keyPrefix}:${identifier}`;
  const windowStart = getWindowStart(config.windowMs);
  const windowEnd = getWindowEnd(windowStart, config.windowMs);
  const now = Date.now();
  const resetTime = windowEnd.getTime();

  const supabase = createServiceClient();

  // Try to increment existing record or create new one
  const { data: existing, error: selectError } = await supabase
    .from('rate_limits')
    .select('request_count')
    .eq('identifier', identifier)
    .eq('endpoint', config.keyPrefix)
    .eq('window_start', windowStart.toISOString())
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    console.error('Rate limit select error:', selectError);
    // Fail open - allow request if DB error
    return { limited: false, remaining: config.maxRequests, resetTime };
  }

  let requestCount = 1;
  let isNewRecord = !existing;

  if (existing) {
    requestCount = existing.request_count + 1;
  }

  if (requestCount > config.maxRequests) {
    const retryAfter = Math.ceil((resetTime - now) / 1000);
    const response = NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
    response.headers.set('Retry-After', retryAfter.toString());
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());
    return { limited: true, response, remaining: 0, resetTime };
  }

  // Upsert the rate limit record
  const { error: upsertError } = await supabase
    .from('rate_limits')
    .upsert({
      identifier,
      endpoint: config.keyPrefix,
      request_count: requestCount,
      window_start: windowStart.toISOString(),
    }, {
      onConflict: 'identifier,endpoint,window_start',
    });

  if (upsertError) {
    console.error('Rate limit upsert error:', upsertError);
    // Fail open
    return { limited: false, remaining: config.maxRequests - requestCount, resetTime };
  }

  const remaining = Math.max(0, config.maxRequests - requestCount);

  return { limited: false, remaining, resetTime };
}

export function createRateLimiter(config: RateLimitConfig) {
  return async function rateLimiter(request: NextRequest): Promise<RateLimitResult> {
    return checkRateLimit(request, config);
  };
}

export const orderRateLimiter = createRateLimiter({
  windowMs: 60_000, // 1 minute
  maxRequests: 10,
  keyPrefix: 'orders',
});

export const contactRateLimiter = createRateLimiter({
  windowMs: 60_000, // 1 minute
  maxRequests: 5,
  keyPrefix: 'contact',
});

export async function loginRateLimiter(identifier: string) {
  const supabase = createServiceClient();
  const windowMs = 900_000; // 15 minutes
  const maxRequests = 5;
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  const windowEnd = new Date(windowStart.getTime() + windowMs);
  const resetTime = windowEnd.getTime();

  const { data, error } = await supabase
    .rpc('atomic_rate_limit_increment', {
      p_identifier: identifier,
      p_endpoint: 'login',
      p_window_start: windowStart.toISOString(),
      p_max_requests: maxRequests,
    });

  if (error) {
    console.error('Rate limit RPC error:', error);
    return { limited: false, remaining: maxRequests, resetTime };
  }

  const rows = data as Array<{ request_count: number; is_limited: boolean }>;
  if (!rows || rows.length === 0) {
    console.error('Rate limit RPC returned no data');
    return { limited: false, remaining: maxRequests, resetTime };
  }
  const { request_count, is_limited } = rows[0];
  const remaining = Math.max(0, maxRequests - request_count);
  return { limited: is_limited, remaining, resetTime };
}