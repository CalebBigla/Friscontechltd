import { createFileRoute } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/AdminAuthGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { MessageSquare, Briefcase, Users, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminAuthGuard>
      <AdminLayout>
        <div>
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold text-[#0A0A0A] tracking-tight">Dashboard</h1>
            <p className="text-[13px] text-gray-600 mt-0.5">Welcome to Friscon Tech Admin</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<MessageSquare size={18} />}
              title="Enquiries"
              value="0"
              subtitle="New messages"
            />
            <StatCard
              icon={<Briefcase size={18} />}
              title="Services"
              value="5"
              subtitle="Active services"
            />
            <StatCard
              icon={<Users size={18} />}
              title="Team Members"
              value="1"
              subtitle="Team profiles"
            />
            <StatCard
              icon={<FileText size={18} />}
              title="Content"
              value="100%"
              subtitle="Site coverage"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
            <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-4 tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ActionCard
                title="View Enquiries"
                description="Check and respond to customer messages"
                link="/admin/enquiries"
              />
              <ActionCard
                title="Manage Services"
                description="Edit service offerings and descriptions"
                link="/admin/services"
              />
              <ActionCard
                title="Update Team"
                description="Add or edit team member profiles"
                link="/admin/team"
              />
              <ActionCard
                title="Edit Content"
                description="Update website text and settings"
                link="/admin/content"
              />
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#0A0A0A]">
                  Admin Dashboard Active
                </h3>
                <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
                  All core features are operational. Use the navigation to manage website content, services, and enquiries.
                </p>
              </div>
            </div>
            <ul className="text-[13px] text-gray-700 space-y-1.5 ml-10">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Contact form with dual submission (Web3Forms + Supabase)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Admin authentication & protected routes
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Full CRUD functionality for all content types
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Team member image upload via Supabase Storage
              </li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  );
}

function StatCard({ icon, title, value, subtitle }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string; 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#FFF4ED] flex items-center justify-center text-[#FF6A00]">
          {icon}
        </div>
        <div className="text-[28px] font-bold text-[#0A0A0A] tracking-tight leading-none">{value}</div>
      </div>
      <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide mb-0.5">{title}</h3>
      <p className="text-[12px] text-gray-500">{subtitle}</p>
    </div>
  );
}

function ActionCard({ title, description, link }: { 
  title: string; 
  description: string; 
  link: string; 
}) {
  return (
    <a
      href={link}
      className="block p-4 rounded-lg border border-gray-200 hover:border-[#FF6A00] hover:bg-[#FFF4ED]/30 transition-all group"
    >
      <h4 className="font-semibold text-[14px] text-[#0A0A0A] mb-1 group-hover:text-[#FF6A00] transition-colors">{title}</h4>
      <p className="text-[13px] text-gray-600 leading-relaxed">{description}</p>
    </a>
  );
}
