import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client with fallback - will work even if env vars are missing initially
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co');
};

// Database types (matches schema.sql)
export interface Settings {
  id: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  hero_title: string;
  hero_intro: string;
  updated_at: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  display_order: number;
  updated_at: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  display_order: number;
  published: boolean;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  subtitle: string | null;
  title: string;
  bio: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
  updated_at: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  display_order: number;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  display_order: number;
  published: boolean;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  pull_quote: string;
  why_nigeria_title: string;
  why_nigeria_intro: string;
  why_nigeria_body: string;
  our_approach_title: string;
  our_approach_body: string;
  government_body: string;
  updated_at: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
  source_page: string | null;
  web3forms_status: string | null;
  created_at: string;
}
