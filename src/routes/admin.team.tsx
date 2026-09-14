import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ImageUpload";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, User } from "lucide-react";

export const Route = createFileRoute("/admin/team")({
  component: AdminTeam,
});

interface TeamMember {
  id: string;
  name: string;
  subtitle: string | null;
  title: string;
  bio: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
}

function AdminTeam() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    subtitle: "",
    title: "",
    bio: "",
    image_url: "",
    published: true,
  });

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  // Create team member mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<TeamMember>) => {
      const maxOrder = Math.max(...teamMembers.map(t => t.display_order), 0);
      const { error } = await supabase
        .from('team_members')
        .insert({
          ...data,
          display_order: maxOrder + 1,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-admin'] });
      toast.success("Team member added");
      setIsAdding(false);
      resetForm();
    },
  });

  // Update team member mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TeamMember> }) => {
      const { error } = await supabase
        .from('team_members')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-admin'] });
      toast.success("Team member updated");
      setEditingId(null);
      resetForm();
    },
  });

  // Delete team member mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-admin'] });
      toast.success("Team member removed");
    },
  });

  // Toggle publish mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('team_members')
        .update({ published: !published })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-admin'] });
      toast.success("Visibility updated");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      subtitle: "",
      title: "",
      bio: "",
      image_url: "",
      published: true,
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData(member);
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
              <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight">Team Members</h1>
              <p className="text-[13px] text-gray-600 mt-0.5">{teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}</p>
            </div>
            
            {!isAdding && !editingId && (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-[#FF6A00] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus size={16} />
                Add Team Member
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-5 tracking-tight">
                {editingId ? "Edit Team Member" : "Add New Team Member"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Chinenye O. Ketebu-Brown"
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Subtitle (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle || ""}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value || null })}
                      placeholder="Nee Nwokoro"
                      className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Founder & CEO"
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    placeholder="Brief biography and background..."
                    className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow resize-none"
                    required
                  />
                </div>

                <ImageUpload
                  currentImageUrl={formData.image_url || null}
                  onImageChange={(url) => setFormData({ ...formData, image_url: url })}
                />

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
                    {editingId ? "Update" : "Add"} Member
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

          {/* Team Members Table */}
          {isLoading ? (
            <div className="text-center py-16 text-gray-500 text-[14px]">Loading team members...</div>
          ) : teamMembers.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-700 mb-1">No team members yet</h3>
              <p className="text-[13px] text-gray-500">Add your first team member to get started</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-20">Photo</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Name</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Title</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-24">Status</th>
                    <th className="text-right px-4 py-3 text-[11px] font-semibold text-gray-600 uppercase tracking-wide w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr
                      key={member.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${!member.published ? 'opacity-60' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {member.image_url ? (
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} className="text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[13px] font-semibold text-[#0A0A0A]">{member.name}</div>
                        {member.subtitle && (
                          <div className="text-[12px] text-gray-500 italic mt-0.5">{member.subtitle}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[13px] text-gray-700">{member.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        {member.published ? (
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
                            onClick={() => togglePublishMutation.mutate({ id: member.id, published: member.published })}
                            className="p-1.5 text-gray-500 hover:text-[#FF6A00] hover:bg-[#FFF4ED] rounded transition-colors"
                            title={member.published ? "Hide from website" : "Show on website"}
                          >
                            {member.published ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-1.5 text-gray-500 hover:text-[#FF6A00] hover:bg-[#FFF4ED] rounded transition-colors"
                            title="Edit team member"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${member.name} from team?`)) {
                                deleteMutation.mutate(member.id);
                              }
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete team member"
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
