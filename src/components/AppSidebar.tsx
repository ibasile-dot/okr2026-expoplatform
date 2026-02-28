import { NavLink as RouterNavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  Map,
  Lightbulb,
  AlertTriangle,
  FileText,
  Calendar,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/key-results", icon: Target, label: "Key Results" },
  { to: "/roadmap", icon: Map, label: "Roadmap" },
  { to: "/automation-ideas", icon: Lightbulb, label: "Automation Ideas" },
  { to: "/workarounds", icon: AlertTriangle, label: "Workarounds" },
  { to: "/notes", icon: FileText, label: "Notes & Next Steps" },
];

const AppSidebar = () => {
  return (
    <aside className="w-64 min-h-screen gradient-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-primary">OKR4</h1>
            <p className="text-[11px] text-sidebar-foreground/60">Operational Efficiency</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </RouterNavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            IB
          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground">Ilaria Basile</p>
            <p className="text-[10px] text-sidebar-foreground/50">Head of Ops Efficiency</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
