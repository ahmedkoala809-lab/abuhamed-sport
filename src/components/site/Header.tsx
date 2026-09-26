import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { NAV } from "@/lib/content";
import { SearchOverlay } from "./SearchOverlay";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-500 ${
          compact
            ? "bg-background/85 backdrop-blur-md py-3 border-b border-border"
            : "bg-transparent py-6"
        }`}
      >
        <div className="edge flex items-center justify-between gap-6">
          <Link to="/" aria-label="أبو حمد — الصفحة الرئيسية" className="shrink-0">
            <Wordmark className={compact ? "h-5" : "h-6"} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="التنقل الرئيسي">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-sm font-medium text-foreground/75 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:right-0 after:h-px after:w-0 after:bg-signal after:transition-all hover:after:w-full"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="بحث"
              className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-signal hover:text-signal"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="القائمة"
              className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-signal hover:text-signal lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background rise">
          <div className="edge flex items-center justify-between py-6">
            <Wordmark className="h-6" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
              className="grid h-10 w-10 place-items-center border border-border"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="edge mt-8 flex flex-col" aria-label="قائمة الجوال">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="display border-b border-border py-5 text-4xl transition-colors hover:text-signal"
              >
                <span className="eyebrow ms-3 align-middle text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
