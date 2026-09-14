import { useQuery } from '@tanstack/react-query';
import { supabase, type Settings, type Statistic, type Service, type TeamMember, type Milestone, type Testimonial, type AboutContent } from '../supabase';
import { siteContent } from '../site-content';

// Settings (singleton)
export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as Settings;
    },
    // Fallback to hardcoded content
    placeholderData: {
      id: '',
      company_name: siteContent.settings.company,
      phone: siteContent.settings.phone,
      email: siteContent.settings.email,
      address: siteContent.settings.address,
      hero_title: siteContent.settings.heroTitle,
      hero_intro: siteContent.settings.heroIntro,
      updated_at: new Date().toISOString(),
    } as Settings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Statistics
export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Statistic[];
    },
    placeholderData: siteContent.stats.map((stat, index) => ({
      id: `fallback-${index}`,
      value: stat.value,
      label: stat.label,
      display_order: index + 1,
      updated_at: new Date().toISOString(),
    })) as Statistic[],
    staleTime: 5 * 60 * 1000,
  });
}

// Services
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    },
    placeholderData: siteContent.services.map((service, index) => ({
      id: `fallback-${index}`,
      number: service.number,
      title: service.title,
      description: service.description,
      detail: service.detail,
      display_order: index + 1,
      published: true,
      updated_at: new Date().toISOString(),
    })) as Service[],
    staleTime: 5 * 60 * 1000,
  });
}

// Team Members
export function useTeamMembers() {
  return useQuery({
    queryKey: ['team_members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as TeamMember[];
    },
    placeholderData: siteContent.team_members.map((member, index) => ({
      id: member.id,
      name: member.name,
      subtitle: member.subtitle || null,
      title: member.title,
      bio: member.bio,
      image_url: member.image,
      display_order: index + 1,
      published: true,
      updated_at: new Date().toISOString(),
    })) as TeamMember[],
    staleTime: 5 * 60 * 1000,
  });
}

// Milestones
export function useMilestones() {
  return useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Milestone[];
    },
    placeholderData: siteContent.milestones.map((milestone, index) => ({
      id: `fallback-${index}`,
      year: milestone.year,
      title: milestone.title,
      description: milestone.text,
      display_order: index + 1,
      updated_at: new Date().toISOString(),
    })) as Milestone[],
    staleTime: 5 * 60 * 1000,
  });
}

// Testimonials
export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Testimonial[];
    },
    placeholderData: [{
      id: 'fallback-1',
      quote: siteContent.testimonial.quote,
      author_name: siteContent.testimonial.name,
      author_role: siteContent.testimonial.role,
      display_order: 1,
      published: true,
      updated_at: new Date().toISOString(),
    }] as Testimonial[],
    staleTime: 5 * 60 * 1000,
  });
}

// About Content (singleton)
export function useAboutContent() {
  return useQuery({
    queryKey: ['about_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as AboutContent;
    },
    placeholderData: {
      id: 'fallback-1',
      pull_quote: siteContent.about.pullQuote,
      why_nigeria_title: siteContent.about.whyNigeria.title,
      why_nigeria_intro: siteContent.about.whyNigeria.intro,
      why_nigeria_body: siteContent.about.whyNigeria.body,
      our_approach_title: siteContent.about.ourApproach.title,
      our_approach_body: siteContent.about.ourApproach.body,
      government_body: siteContent.about.government.body,
      updated_at: new Date().toISOString(),
    } as AboutContent,
    staleTime: 5 * 60 * 1000,
  });
}
