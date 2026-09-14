import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Plus, Edit2, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

interface AboutContent {
  id: string;
  pull_quote: string;
  why_nigeria_title: string;
  why_nigeria_intro: string;
  why_nigeria_body: string;
  our_approach_title: string;
  our_approach_body: string;
  government_body: string;
}

interface Statistic {
  id: string;
  value: string;
  label: string;
  display_order: number;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  display_order: number;
}

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  display_order: number;
  published: boolean;
}

function AdminContent() {
  const queryClient = useQueryClient();
  const [aboutData, setAboutData] = useState<AboutContent | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Fetch about content
  const { data: about, isLoading: aboutLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as AboutContent;
    },
  });

  // Fetch statistics
  const { data: statistics = [] } = useQuery({
    queryKey: ['statistics-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Statistic[];
    },
  });

  // Fetch milestones
  const { data: milestones = [] } = useQuery({
    queryKey: ['milestones-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Milestone[];
    },
  });

  // Fetch testimonials
  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  useEffect(() => {
    if (about) setAboutData(about);
  }, [about]);

  // Update about content mutation
  const updateAboutMutation = useMutation({
    mutationFn: async (data: AboutContent) => {
      const { error } = await supabase
        .from('about_content')
        .update(data)
        .eq('id', data.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-content'] });
      toast.success("Content updated");
      setEditingSection(null);
    },
  });

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aboutData) {
      updateAboutMutation.mutate(aboutData);
    }
  };

  if (aboutLoading || !aboutData) {
    return (
      <AdminAuthGuard>
        <AdminLayout>
          <div className="text-center py-16 text-gray-500 text-[14px]">Loading content...</div>
        </AdminLayout>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div>
          <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight">Content Management</h1>
          <p className="text-[13px] text-gray-600 mt-0.5 mb-6">Edit website content and pages</p>

          {/* About Page Content */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A] tracking-tight">About Page Content</h2>
              {editingSection !== 'about' ? (
                <button
                  onClick={() => setEditingSection('about')}
                  className="text-gray-500 hover:text-[#FF6A00] hover:bg-[#FFF4ED] px-3 py-1.5 rounded-md flex items-center gap-2 text-[13px] font-medium transition-colors"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAboutData(about);
                    setEditingSection(null);
                  }}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-2 text-[13px] font-medium transition-colors"
                >
                  <X size={14} />
                  Cancel
                </button>
              )}
            </div>

            {editingSection === 'about' ? (
              <form onSubmit={handleAboutSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Pull Quote
                  </label>
                  <textarea
                    value={aboutData.pull_quote}
                    onChange={(e) => setAboutData({ ...aboutData, pull_quote: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Why Nigeria Title
                    </label>
                    <input
                      type="text"
                      value={aboutData.why_nigeria_title}
                      onChange={(e) => setAboutData({ ...aboutData, why_nigeria_title: e.target.value })}
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Our Approach Title
                    </label>
                    <input
                      type="text"
                      value={aboutData.our_approach_title}
                      onChange={(e) => setAboutData({ ...aboutData, our_approach_title: e.target.value })}
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Why Nigeria Intro
                  </label>
                  <textarea
                    value={aboutData.why_nigeria_intro}
                    onChange={(e) => setAboutData({ ...aboutData, why_nigeria_intro: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Why Nigeria Body
                  </label>
                  <textarea
                    value={aboutData.why_nigeria_body}
                    onChange={(e) => setAboutData({ ...aboutData, why_nigeria_body: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Our Approach Body
                  </label>
                  <textarea
                    value={aboutData.our_approach_body}
                    onChange={(e) => setAboutData({ ...aboutData, our_approach_body: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Government Section Body
                  </label>
                  <textarea
                    value={aboutData.government_body}
                    onChange={(e) => setAboutData({ ...aboutData, government_body: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updateAboutMutation.isPending}
                    className="bg-[#FF6A00] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Save size={14} />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAboutData(about);
                      setEditingSection(null);
                    }}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-[13px] text-gray-600 space-y-2">
                <p><strong className="text-gray-700">Pull Quote:</strong> {aboutData.pull_quote}</p>
                <p><strong className="text-gray-700">Why Nigeria Title:</strong> {aboutData.why_nigeria_title}</p>
                <p><strong className="text-gray-700">Our Approach Title:</strong> {aboutData.our_approach_title}</p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-[16px] font-semibold text-[#0A0A0A] tracking-tight mb-4">Homepage Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.map((stat) => (
                <div key={stat.id} className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-[28px] font-bold text-[#FF6A00] mb-1">{stat.value}</div>
                  <div className="text-[12px] text-gray-600 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-500 mt-4">
              Note: Statistics are currently read-only. Contact developer to modify.
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-[16px] font-semibold text-[#0A0A0A] tracking-tight mb-4">Timeline Milestones</h2>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="border-l-4 border-l-[#FF6A00] pl-4">
                  <div className="font-semibold text-[13px] text-[#0A0A0A]">{milestone.year} - {milestone.title}</div>
                  <div className="text-[13px] text-gray-600 mt-0.5">{milestone.description}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-500 mt-4">
              Note: Milestones are currently read-only. Contact developer to modify.
            </p>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-[16px] font-semibold text-[#0A0A0A] tracking-tight mb-4">Testimonials</h2>
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-[13px] text-gray-800 italic mb-2">"{testimonial.quote}"</p>
                  <p className="text-[13px] font-semibold text-[#0A0A0A]">{testimonial.author_name}</p>
                  <p className="text-[13px] text-gray-600">{testimonial.author_role}</p>
                  {!testimonial.published && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-[11px] font-medium mt-2">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-500 mt-4">
              Note: Testimonials are currently read-only. Contact developer to modify.
            </p>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}
