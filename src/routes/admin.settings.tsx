import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

interface Settings {
  id: string;
  company_name: string;
  phone: string;
  email: string;
  address: string;
  hero_title: string;
  hero_intro: string;
}

function AdminSettings() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Settings | null>(null);

  // Fetch settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as Settings;
    },
  });

  // Initialize form when settings load
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  // Update settings mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Settings) => {
      const { error } = await supabase
        .from('settings')
        .update({
          company_name: data.company_name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          hero_title: data.hero_title,
          hero_intro: data.hero_intro,
        })
        .eq('id', data.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success("Settings updated successfully");
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      updateMutation.mutate(formData);
    }
  };

  if (isLoading || !formData) {
    return (
      <AdminAuthGuard>
        <AdminLayout>
          <div className="text-center py-16 text-gray-500 text-[14px]">Loading settings...</div>
        </AdminLayout>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div>
          {/* Page Header */}
          <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight mb-1">Settings</h1>
          <p className="text-[13px] text-gray-600 mb-8">Configure global site settings</p>

          <form onSubmit={handleSubmit} className="max-w-[800px]">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-5 tracking-tight">Company Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-5 tracking-tight">Homepage Hero Section</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.hero_title}
                    onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                  <p className="text-[12px] text-gray-500 mt-1.5">
                    Main headline on the homepage
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Hero Introduction
                  </label>
                  <textarea
                    value={formData.hero_intro}
                    onChange={(e) => setFormData({ ...formData, hero_intro: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow resize-none"
                    required
                  />
                  <p className="text-[12px] text-gray-500 mt-1.5">
                    Introductory text below the hero title
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-[#FF6A00] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
              >
                <Save size={14} />
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(settings)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}
