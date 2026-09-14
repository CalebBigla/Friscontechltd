-- ============================================================
-- Supabase Storage Setup for Team Member Images
-- Run this in Supabase SQL Editor to create the storage bucket
-- and set up proper access policies
-- ============================================================

-- Create the storage bucket for team images
insert into storage.buckets (id, name, public)
values ('team-images', 'team-images', true)
on conflict (id) do nothing;

-- Policy: Allow public to view/download team images (for public website)
create policy "Public can view team images"
on storage.objects for select
using (bucket_id = 'team-images');

-- Policy: Allow authenticated users (admins) to upload images
create policy "Authenticated users can upload team images"
on storage.objects for insert
with check (
  bucket_id = 'team-images' 
  and auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users (admins) to update/replace images
create policy "Authenticated users can update team images"
on storage.objects for update
using (
  bucket_id = 'team-images' 
  and auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users (admins) to delete images
create policy "Authenticated users can delete team images"
on storage.objects for delete
using (
  bucket_id = 'team-images' 
  and auth.role() = 'authenticated'
);

-- ============================================================
-- NOTES:
-- 1. The bucket is public so website visitors can load images
-- 2. Only authenticated users can upload/modify/delete
-- 3. Images are stored in the 'team' folder within the bucket
-- 4. Public URLs will be in the format:
--    https://[project-ref].supabase.co/storage/v1/object/public/team-images/team/[filename]
-- ============================================================
