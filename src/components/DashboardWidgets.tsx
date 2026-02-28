import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  className?: string;
}

export const StatCard = ({ label, value, detail, className }: StatCardProps) => (
  <div className={cn("section-card p-5", className)}>
    <p className="stat-label mb-3">{label}</p>
    <p className="stat-value">{value}</p>
    {detail && <p className="text-xs text-muted-foreground mt-1.5">{detail}</p>}
  </div>
);

interface BarProps {
  label: string;
  value: number;
  className?: string;
}

export const HorizontalBar = ({ label, value, className }: BarProps) => (
  <div className={cn("space-y-1", className)}>
    <div className="flex justify-between text-xs">
      <span className="text-foreground font-medium">{label}</span>
      <span className="font-mono text-muted-foreground">{value}%</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export const SectionTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={cn("text-xs font-semibold uppercase tracking-[0.1em] text-primary/60 mb-4", className)}>
    {children}
  </h2>
);

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-10">
    <h1 className="text-2xl font-bold tracking-tight text-primary">{title}</h1>
    {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
  </div>
);
