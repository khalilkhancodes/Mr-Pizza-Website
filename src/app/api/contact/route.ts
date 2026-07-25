import { NextRequest, NextResponse } from 'next/server';
import { contactRateLimiter } from '@/lib/rate-limit';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendEmailResend({ name, email, phone, subject, message }: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'info@mrpizza.pk',
      subject: `[Mr. Pizza Contact] ${subject}`,
      html,
      reply_to: email,
    }),
  });

  return res.ok;
}

export async function POST(request: NextRequest) {
  const rateLimit = await contactRateLimiter(request);
  if (rateLimit.limited) return rateLimit.response;

  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
    }

    const emailSent = await sendEmailResend({ name, email: email.trim(), phone, subject, message });

    if (!emailSent) {
      console.log('Contact form submission (email not configured):', { name, email, phone, subject, message });
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully. We\'ll get back to you within 24 hours.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}