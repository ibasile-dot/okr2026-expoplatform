import { NavLink as RouterNavLink } from "react-router-dom";
import {
  BarChart3,
  Search,
  ListChecks,
  Lightbulb,
  FileText,
} from "lucide-react";

const navItems = [
  { to: "/", icon: BarChart3, label: "Overview" },
  { to: "/findings", icon: Search, label: "Findings" },
  { to: "/action-plan", icon: ListChecks, label: "Action Plan" },
  { to: "/automation-ideas", icon: Lightbulb, label: "Automation Ideas" },
  { to: "/workarounds", icon: FileText, label: "Workaround Catalogue" },
];

const AppSidebar = () => {
  return (
    <aside className="w-60 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <div className="mb-3">
          <span className="text-2xl font-black tracking-tight text-white">EP</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground ml-2">ExpoP<span className="lowercase">latform</span></span>
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-sidebar-foreground mb-1">
          OKR4
        </p>
        <h1 className="text-sm font-bold text-white leading-snug">
          Operational Efficiency
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50"
              }`
            }
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </RouterNavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-[11px] font-medium text-sidebar-primary">Ilaria Basile</p>
        <p className="text-[10px] text-sidebar-foreground">Head of Ops Efficiency</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
