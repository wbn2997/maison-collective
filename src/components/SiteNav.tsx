import { useEffect, useState } from "react";

const links = [
  { label: "Residences", href: "#residences" },
  { label: "Beauty", href: "#beauty" },
  { label: "Fragrance", href: "#fragrance" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "nav-solid" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center justify-between px-6 py-5 md:px-14">
        <a href="#top" className="font-display text-lg tracking-[0.3em] text-foreground">
          MAISON<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-ghostline">
          Enquire
        </a>
      </nav>
    </header>
  );
}
