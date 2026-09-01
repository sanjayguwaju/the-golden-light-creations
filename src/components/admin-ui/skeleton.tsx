import { cn } from "@/utilities/ui";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("adm:animate-pulse adm:rounded-md adm:bg-muted", className)} {...props} />
  );
}

export { Skeleton };
