import { useEffect, useRef, useState, type PointerEvent } from "react";

import heroBeauty from "@/assets/hero-beauty.jpg";
import heroFragrance from "@/assets/hero-fragrance.jpg";
import heroRealEstate from "@/assets/hero-realestate.jpg";
import fragranceMist from "@/assets/fragrance-v2/atmospheric-mist.png";

const houses = [
  {
    id: "residences",
    index: "01",
    kicker: "Private Estates",
    heading: "Architecture held to a quieter standard",
    body: "We acquire, restore and represent a small number of residences each year. Every property is sourced off-market, surveyed by our own architects and handed over fully appointed.",
    image: heroRealEstate,
    stats: [
      ["18", "Off-market residences"],
      ["7", "Cities represented"],
      ["100%", "Turnkey delivery"],
    ],
    reverse: false,
    tone: "#110c08",
  },
  {
    id: "beauty",
    index: "02",
    kicker: "Beauty Maison",
    heading: "Colour engineered for skin, not for screens",
    body: "A compact makeup range built around nine pigments. Formulated in Grasse, tested under daylight, and finished in refillable brass compacts made to outlive the season.",
    image: heroBeauty,
    stats: [
      ["9", "Core pigments"],
      ["0", "Seasonal drops"],
      ["Refill", "By design"],
    ],
    reverse: true,
    tone: "#140b08",
  },
  {
    id: "fragrance",
    index: "03",
    kicker: "Parfums",
    heading: "Scent composed as an object",
    body: "Rare extractions aged in oak, decanted into hand-cut crystal. Three compositions only — amber, smoke and salt — each released in numbered runs.",
    image: heroFragrance,
    stats: [
      ["3", "Compositions"],
      ["24m", "Oak maturation"],
      ["500", "Numbered flacons"],
    ],
    reverse: false,
    tone: "#100806",
  },
] as const;

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!element || !match) return;
    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const start = performance.now();
        const duration = 1000;
        const tick = (time: number) => {
          const progress = Math.min(1, (time - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="editorial-stat">
      <dt ref={ref} className="font-display text-3xl text-foreground md:text-4xl">
        {value.match(/^\d/) ? "0" : value}
      </dt>
      <dd className="label mt-2 text-muted-foreground">{label}</dd>
    </div>
  );
}

export function EditorialContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const context = gsap.context(() => {
          gsap.fromTo(
            "[data-collective-line]",
            { yPercent: reduced ? 12 : 110 },
            {
              yPercent: 0,
              duration: reduced ? 0.35 : 0.9,
              stagger: 0.11,
              ease: "power3.out",
              scrollTrigger: { trigger: "[data-collective]", start: "top 75%", once: true },
            },
          );
          gsap.utils.toArray<HTMLElement>("[data-editorial-section]").forEach((section) => {
            const imageMask = section.querySelector<HTMLElement>("[data-image-mask]");
            const image = section.querySelector<HTMLElement>("[data-editorial-image]");
            const copy = section.querySelectorAll<HTMLElement>("[data-copy-item]");
            const stats = section.querySelectorAll<HTMLElement>(".editorial-stat");
            const divider = section.querySelector<HTMLElement>("[data-divider]");
            const mode = section.dataset["mode"];
            gsap.fromTo(
              divider,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: section, start: "top 78%", once: true },
              },
            );
            gsap.fromTo(
              imageMask,
              {
                clipPath: reduced
                  ? "inset(4% 0)"
                  : mode === "beauty"
                    ? "inset(100% 0 0 0)"
                    : "inset(15% 0)",
              },
              {
                clipPath: "inset(0% 0 0% 0)",
                duration: reduced ? 0.4 : 1.1,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 72%", once: true },
              },
            );
            gsap.fromTo(
              image,
              { scale: mode === "beauty" ? 1.15 : 1.12 },
              {
                scale: 1.02,
                duration: 1.25,
                ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 72%", once: true },
              },
            );
            if (!reduced)
              gsap.fromTo(
                image,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              );
            gsap.fromTo(
              copy,
              { autoAlpha: 0, y: reduced ? 8 : 30 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.09,
                ease: "power2.out",
                scrollTrigger: { trigger: section, start: "top 67%", once: true },
              },
            );
            gsap.fromTo(
              stats,
              { autoAlpha: 0, y: reduced ? 4 : 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: { trigger: section, start: "top 62%", once: true },
              },
            );
          });
          gsap.fromTo(
            "[data-closing-wordmark]",
            { letterSpacing: "0.35em", opacity: 0.03 },
            {
              letterSpacing: "0.12em",
              opacity: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-closing-wordmark]",
                start: "top bottom",
                end: "bottom 70%",
                scrub: 1,
              },
            },
          );
          gsap.fromTo(
            "#contact [data-copy-item]",
            { autoAlpha: 0, y: reduced ? 8 : 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: { trigger: "#contact", start: "top 72%", once: true },
            },
          );
        }, rootRef);
        cleanup = () => context.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  const moveBeautyLight = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={rootRef} className="relative">
      <section
        data-collective
        className="editorial-collective relative z-10 px-6 pb-32 pt-16 md:px-14 md:pb-44 md:pt-24"
      >
        <div className="collective-light pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[100rem]">
          <p className="label text-accent">The Collective</p>
          <div className="mt-8 max-w-5xl font-display text-[clamp(2rem,5vw,4.7rem)] leading-[1.02] tracking-[-0.025em]">
            {[
              "Three houses, one standard of making —",
              "where a residence, a pigment and a scent",
              "are treated with the same patience.",
            ].map((line) => (
              <div key={line} className="overflow-hidden">
                <p data-collective-line>{line}</p>
              </div>
            ))}
          </div>
          <nav
            aria-label="Maison categories"
            className="mt-20 grid max-w-4xl border-y border-border md:grid-cols-3"
          >
            {houses.map((house) => (
              <a
                key={house.id}
                href={`#${house.id}`}
                className="category-index border-b border-border px-1 py-6 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              >
                <span>{house.index}</span>
                <strong>{house.kicker}</strong>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {houses.map((house) => (
        <section
          key={house.id}
          id={house.id}
          data-editorial-section
          data-mode={
            house.id === "beauty" ? "beauty" : house.id === "fragrance" ? "fragrance" : "estate"
          }
          className="editorial-section relative z-10 px-6 py-24 md:px-14 md:py-36"
          style={{ backgroundColor: house.tone }}
        >
          <div data-divider className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
          <div
            className={`mx-auto grid max-w-[100rem] items-center gap-12 lg:grid-cols-2 lg:gap-20 ${house.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <div
              data-image-mask
              className={`editorial-image-mask relative overflow-hidden ${house.id === "beauty" ? "beauty-cursor-light" : ""}`}
              onPointerMove={house.id === "beauty" ? moveBeautyLight : undefined}
            >
              <img
                data-editorial-image
                src={house.image}
                alt={`${house.kicker} — ${house.heading}`}
                width={1920}
                height={1088}
                loading="lazy"
                className="h-[52vh] w-full object-cover lg:h-[70vh]"
              />
              {house.id === "fragrance" && (
                <>
                  <img src={fragranceMist} alt="" className="editorial-mist editorial-mist-back" />
                  <img src={fragranceMist} alt="" className="editorial-mist editorial-mist-front" />
                </>
              )}
            </div>
            <div className="max-w-xl">
              <div data-copy-item className="flex items-baseline gap-5">
                <span className="font-display text-4xl text-accent opacity-70">{house.index}</span>
                <span className="label text-muted-foreground">{house.kicker}</span>
              </div>
              <div className="mt-7 overflow-hidden">
                <h2
                  data-copy-item
                  className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em]"
                >
                  {house.heading}
                </h2>
              </div>
              <p
                data-copy-item
                className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {house.body}
              </p>
              <dl
                data-copy-item
                className="editorial-stats mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8"
              >
                {house.stats.map(([value, label]) => (
                  <AnimatedStat key={label} value={value} label={label} />
                ))}
              </dl>
              <a data-copy-item href="#contact" className="btn-ghostline mt-11">
                Request access
              </a>
            </div>
          </div>
        </section>
      ))}

      <section
        id="contact"
        className="closing-contact relative z-10 px-6 py-36 text-center md:px-14 md:py-48"
      >
        <div className="mx-auto max-w-3xl">
          <p data-copy-item className="label text-accent">
            Enquiries
          </p>
          <div className="mt-8 overflow-hidden pb-2">
            <h2
              data-copy-item
              className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-[-0.03em]"
            >
              Begin a conversation
            </h2>
          </div>
          <p
            data-copy-item
            className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground"
          >
            Introductions are handled privately. Share a note and a member of the collective will
            respond within two working days.
          </p>
          <div data-copy-item className="mx-auto mt-12 min-h-14 max-w-md">
            {submitted ? (
              <p className="font-display text-2xl text-accent">Thank you. We’ll be in touch.</p>
            ) : (
              <form
                className="luxury-email flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  aria-label="Your email"
                  className="w-full border-b border-border bg-transparent px-2 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" className="btn-ghostline justify-center">
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div
        data-closing-wordmark
        className="closing-wordmark pointer-events-none overflow-hidden py-8 text-center font-display text-[clamp(5rem,20vw,20rem)] leading-none"
      >
        MAISON
      </div>
      <footer className="border-t border-border bg-[#0b0806] px-6 py-10 md:px-14">
        <div className="mx-auto flex max-w-[100rem] flex-col items-center justify-between gap-5 md:flex-row">
          <span className="font-display text-base tracking-[0.3em]">
            MAISON<span className="text-accent">.</span>
          </span>
          <nav className="flex gap-6 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
            <a href="#top">Instagram</a>
          </nav>
          <p className="label text-muted-foreground">
            © {new Date().getFullYear()} Maison Collective
          </p>
        </div>
      </footer>
    </div>
  );
}
