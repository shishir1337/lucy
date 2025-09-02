-- Create the scam_victims table
CREATE TABLE IF NOT EXISTS scam_victims (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  total_amount BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE scam_victims ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "public can read scam_victims"
ON public.scam_victims
FOR SELECT TO anon
USING (true);

-- Create policy to allow public insert access
CREATE POLICY "public can insert scam_victims"
ON public.scam_victims
FOR INSERT TO anon
WITH CHECK (true);

-- Create index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_scam_victims_created_at ON scam_victims(created_at DESC);

-- Insert sample data (optional)
INSERT INTO scam_victims (name, phone, total_amount) VALUES
  ('Md. Shishir Ahmed', '01730285500', 2222500),
  ('আব্দুল রহমান', '০১৮১২৩৪৫৬৭৮', 1500000),
  ('ফাতেমা বেগম', '০১৯৮৭৬৫৪৩২১', 3000000);
