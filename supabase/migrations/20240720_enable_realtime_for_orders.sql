-- Enable Realtime for the orders table so customer tracking page
-- can subscribe to live status changes without polling.
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
