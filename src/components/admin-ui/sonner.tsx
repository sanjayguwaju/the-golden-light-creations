"use client";

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="adm:toaster adm:group"
      icons={{
        success: <CircleCheck className="adm:h-4 adm:w-4" />,
        info: <Info className="adm:h-4 adm:w-4" />,
        warning: <TriangleAlert className="adm:h-4 adm:w-4" />,
        error: <OctagonX className="adm:h-4 adm:w-4" />,
        loading: <LoaderCircle className="adm:h-4 adm:w-4 adm:animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "adm:group adm:toast adm:group-[.toaster]:bg-background adm:group-[.toaster]:text-foreground adm:group-[.toaster]:border-border adm:group-[.toaster]:shadow-lg",
          description: "adm:group-[.toast]:text-muted-foreground",
          actionButton: "adm:group-[.toast]:bg-primary adm:group-[.toast]:text-primary-foreground",
          cancelButton: "adm:group-[.toast]:bg-muted adm:group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
