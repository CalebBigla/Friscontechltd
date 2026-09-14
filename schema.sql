-- ============================================================
-- Friscon Tech CMS — Supabase Schema
-- Consolidated from architecture analysis (matches site-content.ts 1:1)
-- Run this in Supabase SQL Editor, top to bottom.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- SETTINGS (singleton row) ----------
create table public.settings (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  hero_title text not null,
  hero_intro text not null,
  updated_at timestamptz default now()
);

-- ---------- STATISTICS ----------
create table public.statistics (
  id uuid primary key default uuid_generate_v4(),
  value text not null,
  label text not null,
  display_order integer not null unique,
  updated_at timestamptz default now()
);

-- ---------- SERVICES ----------
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  number text not null,
  title text not null,
  description text not null,   -- short, used on homepage cards
  detail text not null,        -- long, used on /services
  display_order integer not null unique,
  published boolean default true,
  updated_at timestamptz default now()
);

-- ---------- TEAM MEMBERS ----------
create table public.team_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  subtitle text,               -- e.g. "(Nee Nwokoro)"
  title text not null,         -- e.g. "Founder & CEO"
  bio text not null,
  image_url text,              -- Supabase Storage public URL
  display_order integer not null unique,
  published boolean default true,
  updated_at timestamptz default now()
);

-- ---------- MILESTONES (timeline) ----------
create table public.milestones (
  id uuid primary key default uuid_generate_v4(),
  year text not null,
  title text not null,
  description text not null,
  display_order integer not null unique,
  updated_at timestamptz default now()
);

-- ---------- TESTIMONIALS ----------
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  author_name text not null,
  author_role text not null,
  display_order integer not null unique,
  published boolean default true,
  updated_at timestamptz default now()
);

-- ---------- ABOUT PAGE CONTENT (singleton row) ----------
create table public.about_content (
  id uuid primary key default uuid_generate_v4(),
  pull_quote text not null,
  why_nigeria_title text not null,
  why_nigeria_intro text not null,
  why_nigeria_body text not null,
  our_approach_title text not null,
  our_approach_body text not null,
  government_body text not null,
  updated_at timestamptz default now()
);

-- ---------- FORM SUBMISSIONS (contact form → admin dashboard) ----------
create table public.form_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  is_read boolean default false,
  source_page text,             -- which page/form it came from, e.g. 'contact'
  web3forms_status text,        -- 'sent' | 'failed' | null — lets admin see if email delivery worked
  created_at timestamptz default now()
);

create index idx_services_order on public.services(display_order);
create index idx_team_order on public.team_members(display_order);
create index idx_submissions_read on public.form_submissions(is_read);
create index idx_submissions_created on public.form_submissions(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.settings enable row level security;
alter table public.statistics enable row level security;
alter table public.services enable row level security;
alter table public.team_members enable row level security;
alter table public.milestones enable row level security;
alter table public.testimonials enable row level security;
alter table public.about_content enable row level security;
alter table public.form_submissions enable row level security;

-- Public (anon) read access — website visitors
create policy "public read settings" on public.settings for select to anon, authenticated using (true);
create policy "public read statistics" on public.statistics for select to anon, authenticated using (true);
create policy "public read published services" on public.services for select to anon, authenticated using (published = true);
create policy "public read published team" on public.team_members for select to anon, authenticated using (published = true);
create policy "public read milestones" on public.milestones for select to anon, authenticated using (true);
create policy "public read published testimonials" on public.testimonials for select to anon, authenticated using (published = true);
create policy "public read about content" on public.about_content for select to anon, authenticated using (true);

-- Public INSERT-only on form_submissions (this is how the contact form saves without a backend)
create policy "public can submit forms" on public.form_submissions
  for insert to anon, authenticated with check (true);
-- Deliberately NO public select/update/delete policy on form_submissions —
-- anon users can write but never read other people's submissions.

-- Authenticated admin — full CRUD on everything (single-admin model; add admin_profiles later if you need roles)
create policy "admin manage settings" on public.settings for all to authenticated using (true) with check (true);
create policy "admin manage statistics" on public.statistics for all to authenticated using (true) with check (true);
create policy "admin manage services" on public.services for all to authenticated using (true) with check (true);
create policy "admin manage team" on public.team_members for all to authenticated using (true) with check (true);
create policy "admin manage milestones" on public.milestones for all to authenticated using (true) with check (true);
create policy "admin manage testimonials" on public.testimonials for all to authenticated using (true) with check (true);
create policy "admin manage about content" on public.about_content for all to authenticated using (true) with check (true);
create policy "admin read submissions" on public.form_submissions for select to authenticated using (true);
create policy "admin update submissions" on public.form_submissions for update to authenticated using (true) with check (true);
create policy "admin delete submissions" on public.form_submissions for delete to authenticated using (true);

-- ============================================================
-- STORAGE (run in Supabase Storage settings, or via SQL after creating the 'site-images' bucket)
-- ============================================================
-- create policy "public read site images" on storage.objects for select to anon, authenticated using (bucket_id = 'site-images');
-- create policy "admin upload site images" on storage.objects for insert to authenticated with check (bucket_id = 'site-images');
-- create policy "admin update site images" on storage.objects for update to authenticated using (bucket_id = 'site-images');
-- create policy "admin delete site images" on storage.objects for delete to authenticated using (bucket_id = 'site-images');

-- ============================================================
-- SEED DATA — populated from your actual site-content.ts
-- ============================================================

insert into public.settings (company_name, phone, email, address, hero_title, hero_intro) values (
  'Friscon Tech Limited',
  '+2348032461305',
  'hello@friscontech.com',
  'Block 1, Flat P, Croxley Place, Adam Prescott Flats, Cadogan Place Estate, Jakande, Lagos, Nigeria',
  'Your Bridge to the Nigerian Market.',
  'We help international companies and development partners build the relationships, insight and local momentum to succeed in Nigeria.'
);

insert into public.statistics (value, label, display_order) values
  ('2013', 'Founded in Nigeria', 1),
  ('12+', 'Years of local insight', 2),
  ('05', 'Core practice areas', 3);

insert into public.services (number, title, description, detail, display_order) values
  ('01', 'Market Entry Strategy', 'Turn ambition into an informed, executable Nigeria market plan.', 'We combine local intelligence, commercial analysis and practical sequencing to help new entrants make confident decisions from day one.', 1),
  ('02', 'Stakeholder & Government Relations', 'Navigate the institutions and relationships that shape progress.', 'Our team builds credible engagement strategies across government, communities, industry bodies and development partners.', 2),
  ('03', 'Partnership Facilitation', 'Find the right local partners and make collaboration work.', 'From first introduction to working model, we help clients identify aligned partners and create the conditions for durable value.', 3),
  ('04', 'Agricultural Value Chains', 'Build inclusive, investable systems from farm to market.', 'We support organic fertiliser distribution, smallholder aggregation and programmes that grow farmer income and resilience.', 4),
  ('05', 'Market Research & Analysis', 'See the opportunity clearly before you commit resources.', 'Our research turns complex local markets into a sharp view of competition, demand, risk and the next best move.', 5);

insert into public.milestones (year, title, description, display_order) values
  ('2013', 'Friscon Tech begins', 'Founded to help ambitious organisations work with Nigeria, not around it.', 1),
  ('2017', 'Agriculture practice grows', 'Expanded into value-chain programmes connecting partners, growers and markets.', 2),
  ('2021', 'New partnerships, wider reach', 'Built a broader network across public, private and development sectors.', 3),
  ('Today', 'Built for what comes next', 'Supporting the next generation of market entry and inclusive growth.', 4);

insert into public.testimonials (quote, author_name, author_role, display_order) values
  ('Friscon gave us the local clarity and trusted introductions we needed to move from a good idea to a credible Nigerian operation.', 'Development partner', 'Agriculture & market systems programme', 1);

insert into public.team_members (name, subtitle, title, bio, image_url, display_order) values
  ('Chinenye O. Ketebu-Brown', '(Nee Nwokoro)', 'Founder & CEO', 'Chinenye founded Friscon Tech in 2013 with a vision to bridge international ambition with Nigerian reality. Her hands-on experience in agricultural development and stakeholder relations has positioned the company as a trusted partner for organizations seeking sustainable growth in Nigeria.', null, 1);

insert into public.about_content (pull_quote, why_nigeria_title, why_nigeria_intro, why_nigeria_body, our_approach_title, our_approach_body, government_body) values (
  'Friscon Tech Limited is an indigenous consulting company specializing in stakeholder relations, partnership building, and market entry implementation. Founded in 2013, we leverage deep local expertise to connect international companies and development partners with the vast opportunities in Nigeria.',
  'Why Nigeria matters',
  'A land of opportunity: young, dynamic, and entrepreneurial.',
  'Nigeria is Africa''s most populous country and a leading economy, offering unique and fertile ground for impactful business and development projects. Its young, dynamic population creates an entrepreneurial ecosystem unlike anywhere else on the continent.',
  'Our strategic approach',
  'Our insight is rooted in practical, on-the-ground experience. For years, we have actively engaged in the agricultural sector through the sale of organic fertilizers, aggregation of smallholder farmers, and empowerment programs. This direct involvement gives us unparalleled insight into local value chains and community dynamics. We utilize this foundational knowledge to design and implement market entry and partnership strategies that are sustainable, community-informed, and built for long-term success.',
  'Friscon Tech liaises with relevant statutory bodies and government agencies to facilitate smooth market entry and project expansion for our partners, contributing to the growth of the Nigerian economy.'
);
