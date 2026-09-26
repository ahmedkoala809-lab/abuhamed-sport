import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="edge border-b border-border pb-12 pt-36 md:pb-16 md:pt-44">
      <span className="eyebrow text-signal">{eyebrow}</span>
      <h1 className="display mt-5 text-5xl md:text-8xl">{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
    </header>
  );
}
