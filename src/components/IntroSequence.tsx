import { useEffect, useRef, useState } from "react";

type Phase = "statement" | "portal" | "entering" | "complete";

export function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("statement");
  const portalRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const timer = window.setTimeout(() => setPhase("portal"), 3000);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  const enterPortal = () => {
    if (phase !== "portal" || enteredRef.current) return;
    enteredRef.current = true;
    setPhase("entering");

    copyRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 350,
      fill: "forwards",
      easing: "ease-out",
    });
    portalRef.current?.animate(
      [
        { transform: "scale(1)", borderRadius: "48% 48% 45% 45% / 38% 38% 48% 48%" },
        { transform: "scale(2.2)", offset: 0.52 },
        { transform: "scale(9)", borderRadius: "44%" },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.7, 0, 0.9, 1)",
        fill: "forwards",
      },
    );

    window.setTimeout(() => onFinishRef.current(), 500);
    window.setTimeout(() => {
      setPhase("complete");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        window.dispatchEvent(new Event("resize"));
      });
    }, 1000);
  };

  if (phase === "complete") return null;

  return (
    <section
      className="fixed inset-0 z-[100] h-[100dvh] overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 45%, oklch(0.34 0.035 62) 0%, oklch(0.19 0.02 58) 55%, oklch(0.12 0.012 55) 100%)",
      }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center px-6 text-center transition-all duration-700 ${
          phase === "statement" ? "opacity-100" : "pointer-events-none scale-105 opacity-0"
        }`}
      >
        <div>
          <p className="label text-accent">Maison Collective</p>
          <h2 className="mt-8 font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            Three houses.
            <br />
            <em className="not-italic text-accent opacity-90">One standard of making.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Estates, beauty and fragrance — composed with the same patience.
          </p>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          phase === "portal" || phase === "entering"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div ref={copyRef} className="maison-portal-layout">
          <div className="maison-portal-craft">
            <p className="label text-accent">The Maison Philosophy</p>
            <h2 className="maison-portal-heading mt-4 font-display">We are craft</h2>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-foreground/65 md:text-base">
              Objects, spaces and rituals shaped with patience, precision and purpose.
            </p>
          </div>
          <div className="maison-portal-distinction">
            <h2 className="maison-portal-heading font-display">
              We are
              <br />
              distinction
            </h2>
            <p className="mt-5 text-xs leading-relaxed text-foreground/65 md:text-base">
              Defined not by excess,
              <br /> but by what is considered.
            </p>
          </div>
        </div>

        <div className="maison-portal-group">
          <button
            ref={portalRef}
            type="button"
            aria-label="Enter Maison Collective"
            onClick={enterPortal}
            disabled={phase === "entering"}
            className="intro-portal maison-portal-shell cursor-pointer border-[clamp(.75rem,1.2vw,1.15rem)] border-[#c9c0b7] bg-[radial-gradient(circle_at_65%_25%,#826c58_0%,#5a4332_38%,#2b1c14_100%)] shadow-[0_45px_110px_-30px_rgba(0,0,0,.8),inset_0_0_70px_rgba(255,224,190,.12)] outline-none"
          >
            <span className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,.14),transparent_35%,rgba(0,0,0,.2))]" />
            <span className="relative z-10 font-display text-[clamp(1.4rem,2.4vw,2.5rem)] tracking-[.24em] text-[#f6eee5]">
              MAISON
            </span>
          </button>
          <p className="mt-8 whitespace-nowrap text-[.625rem] uppercase tracking-[.28em] text-accent/55">
            Residences&nbsp; · &nbsp;Beauty&nbsp; · &nbsp;Parfums
          </p>
        </div>
      </div>
    </section>
  );
}
