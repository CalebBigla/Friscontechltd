import { Link, useLocation } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth-context';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Briefcase, 
  Users, 
  FileText, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('adminSidebarCollapsed', String(newState));
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-sm border border-gray-200"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0A0A0A] text-white transform transition-all duration-300 ease-in-out z-40
          ${collapsed ? 'w-16' : 'w-56'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo/Header */}
        <div className={`${collapsed ? 'p-4' : 'px-5 py-5'} border-b border-gray-800`}>
          {collapsed ? (
            <div className="text-center">
              <span className="text-[#FF6A00] font-bold text-lg">F</span>
            </div>
          ) : (
            <>
              <h1 className="text-base font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-white">frisco</span>
                <span className="text-[#FF6A00]">ntech</span>
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5 tracking-wide uppercase">Admin</p>
            </>
          )}
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#FF6A00] rounded-full items-center justify-center text-white hover:bg-[#FF7A1A] transition-colors shadow-lg"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navigation */}
        <nav className={`${collapsed ? 'p-2' : 'px-3 py-4'} space-y-0.5`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'} rounded-md transition-all group relative
                  ${isActive 
                    ? 'bg-[#1A1A1A] text-white border-l-2 border-[#FF6A00]' 
                    : 'text-gray-400 hover:bg-[#141414] hover:text-gray-200'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={16} className={isActive ? 'text-[#FF6A00]' : ''} />
                {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-[#141414] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800">
          {!collapsed && (
            <div className="px-5 py-3 text-xs text-gray-500 truncate border-b border-gray-800">
              {user?.email}
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center ${collapsed ? 'justify-center p-4' : 'gap-3 px-5 py-3'} w-full text-gray-400 hover:bg-[#141414] hover:text-gray-200 transition-all group relative`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={16} />
            {!collapsed && <span className="text-[13px] font-medium">Logout</span>}
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-[#141414] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`${collapsed ? 'lg:ml-16' : 'lg:ml-56'} min-h-screen transition-all duration-300`}>
        <div className="max-w-[1400px] p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
