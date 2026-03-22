import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  innerClassName?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8", className)}>
      <div className={cn("max-w-7xl mx-auto", innerClassName)}>{children}</div>
    </section>
  );
}
