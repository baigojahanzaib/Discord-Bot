-- Create a storage bucket for announcement images
INSERT INTO storage.buckets (id, name, public)
VALUES ('announcements', 'announcements', true);

-- Allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'announcements');

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'announcements');