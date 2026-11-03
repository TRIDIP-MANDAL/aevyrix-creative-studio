CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'new_inquiry',
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text,
  country text NOT NULL,
  service_category text NOT NULL,
  specific_service text,
  package text NOT NULL,
  project_title text NOT NULL,
  project_description text NOT NULL,
  target_audience text,
  preferred_style text,
  deliverables text,
  budget_range text,
  deadline date,
  reference_links text,
  additional_requirements text,
  service_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  privacy_consent boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (privacy_consent = true AND status = 'new_inquiry');

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);