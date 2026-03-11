"use client";

import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    FileText,
    Globe2,
    Hospital,
    LayoutDashboard,
    Activity,
    Settings,
    Sparkles,
    LogOut,
    Plus,
    Menu,
    X,
    User,
    Clock,
    Phone
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/patients", label: "Patients", icon: User },
    { href: "/dashboard/schedule", label: "Schedule Configuration", icon: CalendarDays },
    { href: "/dashboard/chambers", label: "Chambers", icon: Hospital },
    { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-slate-900">Masum's Dental</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 shadow-xl flex flex-col transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "md:w-72"}
        w-72
      `}>
        {/* Sidebar Header */}
        <div className={`p-6 border-b border-slate-100 flex items-center h-20 transition-all duration-300 ${isCollapsed ? "justify-center px-2" : "justify-between"}`}>
          <div className="flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
            <Sparkles size={24} />
          </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight whitespace-nowrap">
              Masum's Dental <span className="text-primary">Admin</span>
            </h2>
          </div>
          <div className={`hidden md:flex transition-all duration-300 ${isCollapsed ? "" : ""}`}>
             <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 text-slate-400 hover:text-primary bg-slate-50 hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/10 shrink-0"
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all relative group ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-500 hover:text-primary hover:bg-primary/5"
              }`}
                title={isCollapsed ? item.label : ""}
              >
                <div className={`${isCollapsed ? "w-full flex justify-center" : ""}`}>
                  <item.icon size={20} className={`${isActive ? "text-white" : "group-hover:text-primary transition-colors"}`} />
                </div>
                {!isCollapsed && <span className="font-bold text-[13px] uppercase tracking-wider">{item.label}</span>}

                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-14 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[60] ml-2 shadow-xl border border-slate-800">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all relative group
                text-slate-500 hover:bg-primary/5 hover:text-primary
              `}
              title={isCollapsed ? "Visit Main Site" : ""}
            >
              <div className={`${isCollapsed ? "w-full flex justify-center" : ""}`}>
                <Globe2 size={20} className="group-hover:text-primary transition-colors" />
              </div>
              {!isCollapsed && <span className="font-bold text-[13px] uppercase tracking-wider">Visit Main Site</span>}

              {isCollapsed && (
                <div className="absolute left-14 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[60] ml-2 shadow-xl border border-primary/20">
                  Visit Main Site
                </div>
              )}
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
           <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all mt-2"
          >
            <div className={`${isCollapsed ? "w-full flex justify-center" : ""}`}>
              <LogOut size={20} className="group-hover:text-red-600 transition-colors" />
            </div>
            {!isCollapsed && <span className="font-bold text-[13px] uppercase tracking-wider">Logout</span>}

            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
              <div className="absolute left-14 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[60] ml-2 shadow-xl">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`
        flex-1 flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? "md:ml-20" : "md:ml-72"}
        min-h-screen overflow-auto bg-slate-50 pt-16 md:pt-0
      `}>
        <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
