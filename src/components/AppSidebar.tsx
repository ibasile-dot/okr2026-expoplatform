import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  Target,
  ChevronDown,
  LayoutDashboard,
  TrendingUp,
  Handshake,
  Shield,
  Zap,
  Database,
  BarChart3,
  Map,
  Search,
  ListChecks,
  Lightbulb,
  Rocket,
} from "lucide-react";
import epLogo from "@/assets/ep-logo-full.png";

const defaultSubItems = [
  { suffix: "", label: "Overview", icon: LayoutDashboard },
  { suffix: "/metrics", label: "Metrics", icon: BarChart3 },
  { suffix: "/roadmap", label: "Roadmap", icon: Map },
  { suffix: "/findings", label: "Findings", icon: Search },
  { suffix: "/action-plan", label: "Action Plan", icon: ListChecks },
  { suffix: "/new-initiatives", label: "New Initiatives", icon: Rocket },
];

const okr4ExtraItems = [
  { suffix: "/automation-ideas", label: "Automation Ideas", icon: Lightbulb },
];

const okrNav = [
  { id: 1, label: "Revenue & Profit", icon: TrendingUp, color: "hsl(237, 68%, 33%)" },
  { id: 2, label: "Meetings & Networks", icon: Handshake, color: "hsl(44, 100%, 58%)" },
  { id: 3, label: "Delivery & Platform", icon: Shield, color: "hsl(152, 60%, 40%)" },
  { id: 4, label: "Automation of Manual Processes", icon: Zap, color: "hsl(200, 60%, 45%)" },
  { id: 5, label: "Data-Driven Company", icon: Database, color: "hsl(280, 50%, 50%)" },
];

const AppSidebar = () => {
  const location = useLocation();
  const [expandedOkrs, setExpandedOkrs] = useState<number[]>(() => {
    const activeOkr = okrNav.find((o) =>
      location.pathname.startsWith(`/okr/${o.id}`)
    );
    return activeOkr ? [activeOkr.id] : [];
  });

  const toggleOkr = (id: number) => {
    setExpandedOkrs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 sticky top-0">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-sidebar-foreground mb-1">
          ExpoPlatform
        </p>
        <h1 className="text-sm font-bold text-primary-foreground leading-snug">
          2026 OKRs
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <RouterNavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
              isActive
                ? "bg-sidebar-accent text-primary-foreground"
                : "text-sidebar-foreground hover:text-primary-foreground hover:bg-sidebar-accent/50"
            }`
          }
        >
          <Target className="w-3.5 h-3.5" />
          OKR Overview
        </RouterNavLink>

        <div className="pt-2 pb-1 px-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/50">
            OKRs
          </p>
        </div>

        {okrNav.map((okr) => {
          const isExpanded = expandedOkrs.includes(okr.id);
          const basePath = `/okr/${okr.id}`;
          const isActive = location.pathname.startsWith(basePath);

          return (
            <div key={okr.id}>
              <button
                onClick={() => toggleOkr(okr.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] font-medium transition-colors ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-sidebar-foreground hover:text-primary-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0"
                  style={{ background: okr.color }}
                >
                  {okr.id}
                </span>
                <span className="flex-1 text-left truncate">{okr.label}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isExpanded ? "" : "-rotate-90"}`}
                />
              </button>

              {isExpanded && (
                <div className="ml-6 pl-3 border-l border-sidebar-border/50 space-y-0.5 mt-0.5">
                  {[...defaultSubItems, ...(okr.id === 4 ? okr4ExtraItems : [])].map((sub) => (
                    <RouterNavLink
                      key={sub.suffix}
                      to={`${basePath}${sub.suffix}`}
                      end
                      className={({ isActive: subActive }) =>
                        `flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-medium transition-colors ${
                          subActive
                            ? "bg-sidebar-accent text-primary-foreground"
                            : "text-sidebar-foreground hover:text-primary-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <sub.icon className="w-3 h-3" />
                      {sub.label}
                    </RouterNavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-sidebar-border">
        <img src={epLogo} alt="ExpoPlatform" className="h-8 mt-3 brightness-0 invert" />
      </div>
    </aside>
  );
};

export default AppSidebar;
