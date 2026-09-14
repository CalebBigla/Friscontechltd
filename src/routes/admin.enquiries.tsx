import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Mail, MailOpen, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

interface FormSubmission {
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

function AdminEnquiries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch enquiries
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FormSubmission[];
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('form_submissions')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      toast.success("Marked as read");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      setSelectedId(null);
      toast.success("Enquiry deleted");
    },
  });

  // Filter enquiries by search
  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.company && e.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedEnquiry = selectedId ? enquiries.find(e => e.id === selectedId) : null;
  const unreadCount = enquiries.filter(e => !e.is_read).length;

  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight">Enquiries</h1>
              <p className="text-[13px] text-gray-600 mt-0.5">
                {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-[13px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-shadow w-64"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16 text-gray-500 text-[14px]">Loading enquiries...</div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail size={24} className="text-gray-400" />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-700 mb-1">
                {searchQuery ? "No enquiries found" : "No enquiries yet"}
              </h3>
              <p className="text-[13px] text-gray-500">
                {searchQuery ? "Try a different search term" : "Contact form submissions will appear here"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enquiries List */}
              <div className="space-y-2">
                {filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    onClick={() => {
                      setSelectedId(enquiry.id);
                      if (!enquiry.is_read) {
                        markAsReadMutation.mutate(enquiry.id);
                      }
                    }}
                    className={`
                      bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-sm
                      ${selectedId === enquiry.id ? 'ring-2 ring-[#FF6A00] border-[#FF6A00]' : 'border-gray-200'}
                      ${!enquiry.is_read ? 'border-l-4 border-l-[#FF6A00]' : ''}
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {enquiry.is_read ? (
                          <MailOpen size={14} className="text-gray-400 flex-shrink-0" />
                        ) : (
                          <Mail size={14} className="text-[#FF6A00] flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-[13px] text-[#0A0A0A]">{enquiry.name}</h3>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {new Date(enquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-[13px] text-gray-600 mb-1.5">{enquiry.email}</p>
                    {enquiry.company && (
                      <p className="text-[12px] text-gray-500 mb-2">{enquiry.company}</p>
                    )}
                    <p className="text-[13px] text-gray-700 line-clamp-2">{enquiry.message}</p>
                  </div>
                ))}
              </div>

              {/* Enquiry Details */}
              <div className="lg:sticky lg:top-6 h-fit">
                {selectedEnquiry ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-1 tracking-tight">
                          {selectedEnquiry.name}
                        </h2>
                        <p className="text-[13px] text-gray-600">{selectedEnquiry.email}</p>
                        {selectedEnquiry.company && (
                          <p className="text-[13px] text-gray-500 mt-0.5">{selectedEnquiry.company}</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Delete this enquiry?')) {
                            deleteMutation.mutate(selectedEnquiry.id);
                          }
                        }}
                        className="text-gray-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <p className="text-[12px] text-gray-500 mb-1">
                        Received {new Date(selectedEnquiry.created_at).toLocaleString()}
                      </p>
                      {selectedEnquiry.web3forms_status && (
                        <p className="text-[12px] text-gray-500">
                          Email status: <span className="font-medium text-[#10B981]">{selectedEnquiry.web3forms_status}</span>
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Message:</h3>
                      <p className="text-[13px] text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedEnquiry.message}</p>
                    </div>

                    <div className="mt-4">
                      <a
                        href={`mailto:${selectedEnquiry.email}?subject=Re: Your enquiry&body=Hi ${selectedEnquiry.name},%0D%0A%0D%0A`}
                        className="w-full bg-[#FF6A00] text-white py-2 px-4 rounded-md text-center text-[13px] font-medium hover:bg-[#FF7A1A] transition-colors inline-block"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail size={24} className="text-gray-400" />
                    </div>
                    <p className="text-[13px] text-gray-500">Select an enquiry to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}
