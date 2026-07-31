-- Add admin staff member
-- Grants dashboard access to the admin auth user (id references auth.users)
INSERT INTO public.staff (id, email, name, role)
VALUES ('dfe9c2dc-5a03-4e66-86ab-c40d4a57c62b', 'adminmrpizza@gmail.com', 'Admin', 'admin')
ON CONFLICT (id) DO NOTHING;
