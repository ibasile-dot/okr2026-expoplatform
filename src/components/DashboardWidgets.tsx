import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusMap: Record<string, string> = {
  "Done": "status-done",
  "In Progress": "status-in-progress",
  "To Do": "status-to-do",
  "To explore": "status-to-explore",
  "Hypothesis": "status-to-explore",
  "Draft exists": "status-in-progress",
  "No budget yet": "status-to-do",
  "Idea only": "status-to-do",
  "Quick Win": "bg-success/15 text-success border-success/25",
  "Live": "status-done",
  "Unfinished": "status-to-explore",
  "Not Started": "status-to-do",
  "Map tasks first": "status-to-explore",
  "Automation Days": "status-in-progress",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const style = statusMap[status] || "status-to-do";
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", style, className)}>
      {status}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

const priorityColors: Record<string, string> = {
  "High": "bg-destructive/10 text-destructive border-destructive/20",
  "Medium": "bg-warning/10 text-warning border-warning/20",
  "Low": "bg-muted text-muted-foreground border-border",
  "Quick Win": "bg-success/15 text-success border-success/25",
};

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const style = priorityColors[priority] || "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", style, className)}>
      {priority}
    </span>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: string;
  className?: string;
}

export const MetricCard = ({ title, value, subtitle, icon, trend, className }: MetricCardProps) => (
  <div className={cn("glass-card rounded-xl p-5", className)}>
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      {icon && <div className="text-primary">{icon}</div>}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    {trend && <p className="text-xs text-success mt-1 font-medium">{trend}</p>}
  </div>
);

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export const ProgressBar = ({ value, max = 100, label, className }: ProgressBarProps) => (
  <div className={cn("space-y-1.5", className)}>
    {label && (
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium font-mono text-foreground">{value}%</span>
      </div>
    )}
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full rounded-full gradient-primary transition-all duration-500"
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-8">
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
  </div>
);
