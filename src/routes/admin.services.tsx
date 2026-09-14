import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  display_order: number;
  published: boolean;
}

function AdminServices() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    number: "",
    title: "",
    description: "",
    detail: "",
    published: true,
  });

  // Fetch services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true});
      
      if (error) throw error;
      return data as Service[];
    },
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Service>) => {
      const maxOrder = Math.max(...services.map(s => s.display_order), 0);
      const { error } = await supabase
        .from('services')
        .insert({
          ...data,
          display_order: maxOrder + 1,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-admin'] });
      toast.success("Service created");
      setIsAdding(false);
      resetForm();
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Service> }) => {
      const { error } = await supabase
        .from('services')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-admin'] });
      toast.success("Service updated");
      setEditingId(null);
      resetForm();
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-admin'] });
      toast.success("Service deleted");
    },
  });

  // Toggle publish mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('services')
        .update({ published: !published })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services-admin'] });
      toast.success("Service visibility updated");
    },
  });

  const resetForm = () => {
    setFormData({
      number: "",
      title: "",
      description: "",
      detail: "",
      published: true,
    });
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    resetForm();
  };

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight">Services</h1>
              <p className="text-[13px] text-gray-600 mt-0.5">{services.length} total services</p>
            </div>
            
            {!isAdding && !editingId && (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-[#FF6A00] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus size={16} />
                Add Service
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-5 tracking-tight">
                {editingId ? "Edit Service" : "Add New Service"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Number/Icon
                    </label>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      placeholder="01"
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Market Entry Strategy"
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    placeholder="Brief description shown in card"
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Detailed Description
                  </label>
                  <textarea
                    value={formData.detail}
                    onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                    rows={4}
                    placeholder="Full detailed description"
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-[#FF6A00] border-gray-300 rounded focus:ring-[#FF6A00] cursor-pointer"
                  />
                  <label htmlFor="published" className="text-[13px] font-medium text-gray-700 cursor-pointer">
                    Published (visible on website)
                  </label>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-[#FF6A00] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save size={14} />
                    {editingId ? "Update" : "Create"} Service
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Services Table */}
          {isLoading ? (
            <div className="text-center py-16 text-gray-500 text-[14px]">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-700 mb-1">No services yet</h3>
              <p className="text-[13px] text-gray-500">Create your first service to get started</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-16">#</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Title</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Summary</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-24">Status</th>
                    <th className="text-right px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={service.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${!service.published ? 'opacity-60' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-[16px] font-bold text-[#FF6A00]">{service.number}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[13px] font-semibold text-[#0A0A0A]">{service.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[13px] text-gray-600 line-clamp-1">{service.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        {service.published ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-[11px] font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="3" />
                            </svg>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="3" />
                            </svg>
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => togglePublishMutation.mutate({ id: service.id, published: service.published })}
                            className="p-1.5 text-gray-500 hover:text-[#FF6A00] hover:bg-[#FFF4ED] rounded transition-colors"
                            title={service.published ? "Hide from website" : "Show on website"}
                          >
                            {service.published ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          <button
                            onClick={() => handleEdit(service)}
                            className="p-1.5 text-gray-500 hover:text-[#FF6A00] hover:bg-[#FFF4ED] rounded transition-colors"
                            title="Edit service"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${service.title}"?`)) {
                                deleteMutation.mutate(service.id);
                              }
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete service"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}
