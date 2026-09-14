-- ============================================================
-- Friscon Tech CMS — Database Cleanup Script
-- Run this in Supabase SQL Editor to completely reset the database
-- ⚠️ WARNING: This will delete ALL data and tables!
-- ============================================================

-- Drop all policies first (policies must be dropped before tables)
drop policy if exists "public read settings" on public.settings;
drop policy if exists "public read statistics" on public.statistics;
drop policy if exists "public read published services" on public.services;
drop policy if exists "public read published team" on public.team_members;
drop policy if exists "public read milestones" on public.milestones;
drop policy if exists "public read published testimonials" on public.testimonials;
drop policy if exists "public read about content" on public.about_content;
drop policy if exists "public can submit forms" on public.form_submissions;

drop policy if exists "admin manage settings" on public.settings;
drop policy if exists "admin manage statistics" on public.statistics;
drop policy if exists "admin manage services" on public.services;
drop policy if exists "admin manage team" on public.team_members;
drop policy if exists "admin manage milestones" on public.milestones;
drop policy if exists "admin manage testimonials" on public.testimonials;
drop policy if exists "admin manage about content" on public.about_content;
drop policy if exists "admin read submissions" on public.form_submissions;
drop policy if exists "admin update submissions" on public.form_submissions;
drop policy if exists "admin delete submissions" on public.form_submissions;

-- Drop storage policies (if they exist)
drop policy if exists "public read site images" on storage.objects;
drop policy if exists "admin upload site images" on storage.objects;
drop policy if exists "admin update site images" on storage.objects;
drop policy if exists "admin delete site images" on storage.objects;

-- Drop all tables (cascade will drop dependent objects)
drop table if exists public.form_submissions cascade;
drop table if exists public.about_content cascade;
drop table if exists public.testimonials cascade;
drop table if exists public.milestones cascade;
drop table if exists public.team_members cascade;
drop table if exists public.services cascade;
drop table if exists public.statistics cascade;
drop table if exists public.settings cascade;

-- Optional: Drop the storage bucket (uncomment if you want to delete uploaded images too)
-- delete from storage.buckets where name = 'site-images';

-- Success message
select 'Database cleaned successfully! You can now run schema.sql to recreate everything.' as message;
