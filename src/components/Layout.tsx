import type { ReactNode } from "react";
import { forwardRef } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-secondary-gradient-1">
      <main
        className="relative w-full mx-auto"
        style={{
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray" | "primary";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = "", id, background = "white" }, ref) => {
    const backgroundClasses = {
      white: "bg-secondary-gradient-1",
      gray: "bg-secondary-gradient-2",
      primary: "bg-secondary-gradient-3",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={`py-8 px-6 ${backgroundClasses[background]} ${className}`}
        style={{
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <div className="w-full">{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`w-full px-6 py-4 ${className}`}
      style={{
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};
