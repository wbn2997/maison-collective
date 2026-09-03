import { useEffect, useRef, type ReactNode } from "react";

export function CinematicSections({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([g, s, l]) => {
        if (cancelled) return;
        const gsap = g.gsap;
        const ScrollTrigger = s.ScrollTrigger;
        const Lenis = l.default;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        const ctx = gsap.context(() => {
          const estate = '[data-scene="estate"]',
            beauty = '[data-scene="beauty"]',
            fragrance = '[data-scene="fragrance"]';
          const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
          const mobile = matchMedia("(max-width: 767px)").matches;
          gsap.set(estate, { autoAlpha: 1, zIndex: 30 });
          gsap.set(beauty, { autoAlpha: 0, zIndex: 20, scale: 0.9 });
          gsap.set(fragrance, { autoAlpha: 0, zIndex: 10, scale: 0.9 });
          gsap.set('[data-estate="camera"]', {
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
          });
          gsap.set('[data-beauty="product"], [data-fragrance="bottle"]', {
            transformPerspective: 1100,
            transformStyle: "preserve-3d",
          });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: () => `+=${innerHeight * (mobile ? 4.5 : 5.4)}`,
              pin: true,
              scrub: reduced ? 0.3 : 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          if (!reduced)
            tl.fromTo(
              '[data-estate="background"]',
              { scale: 1.02, z: -180 },
              { scale: 1.22, z: -70, duration: 2.3 },
              0,
            )
              .fromTo(
                '[data-estate="villa"]',
                { scale: mobile ? 0.98 : 0.82, yPercent: 10, z: -60 },
                { scale: mobile ? 1.35 : 1.46, yPercent: 11, z: 180, duration: 2.3 },
                0,
              )
              .fromTo(
                '[data-estate="floor"]',
                { scale: 1, z: 40 },
                { scale: 1.28, yPercent: 52, z: 380, duration: 2.3 },
                0,
              )
              .fromTo(
                '[data-estate="left"]',
                { xPercent: 0, z: 140 },
                { xPercent: -44, scale: 1.14, z: 480, duration: 2.3 },
                0,
              )
              .fromTo(
                '[data-estate="right"]',
                { xPercent: 0, z: 140 },
                { xPercent: 44, scale: 1.14, z: 480, duration: 2.3 },
                0,
              )
              .to(
                '[data-estate="camera"]',
                { rotationX: 1.5, rotationY: 3, rotationZ: -2, duration: 1 },
                1.3,
              );
          tl.to('[data-estate="copy"]', { autoAlpha: 0, y: -42, duration: 0.4 }, 1.55)
            .to(
              '[data-estate="doorway"]',
              {
                scale: reduced ? 1.04 : 3.1,
                z: reduced ? 0 : 520,
                rotationY: reduced ? 0 : 8,
                opacity: 0.98,
                duration: 0.8,
              },
              1.5,
            )
            .to('[data-estate="portal"]', { autoAlpha: 0.88, duration: 0.4 }, 2.12)
            .to(beauty, { autoAlpha: 1, scale: 1, duration: 0.65 }, 2.18)
            .to(estate, { autoAlpha: 0, duration: 0.45 }, 2.5);
          if (!reduced)
            tl.set(
              '[data-beauty="product"]',
              { scale: 0.78, rotationY: -45, rotationX: 8, rotationZ: -2, z: -120 },
              2.25,
            )
              .to(
                '[data-beauty="product"]',
                { scale: 0.9, rotationY: 0, rotationX: 2, rotationZ: -1, z: -35, duration: 0.48 },
                2.25,
              )
              .to(
                '[data-beauty="product"]',
                {
                  scale: 1.15,
                  rotationY: 60,
                  rotationX: -10,
                  rotationZ: 3,
                  z: 145,
                  duration: 0.82,
                },
                2.73,
              )
              .to(
                '[data-beauty="product"]',
                { scale: 1.2, rotationY: 15, rotationX: -6, rotationZ: 1, z: 175, duration: 0.7 },
                3.55,
              )
              .fromTo(
                '[data-beauty="camera"]',
                { xPercent: -1.5, scale: 0.98 },
                { xPercent: 1.5, scale: 1.035, duration: 2, ease: "power1.inOut" },
                2.25,
              )
              .fromTo(
                '[data-beauty="cap"]',
                { yPercent: 0, xPercent: -50, z: 0 },
                {
                  yPercent: -155,
                  xPercent: -20,
                  rotationX: 28,
                  rotationZ: 20,
                  z: 120,
                  duration: 0.9,
                },
                3.25,
              )
              .to(
                '[data-beauty="orbit"]',
                { rotationZ: 350, rotationX: 76, scale: 1.3, duration: 2.2 },
                2.3,
              )
              .fromTo(
                '[data-beauty="highlight"]',
                { xPercent: -115, opacity: 0 },
                { xPercent: 115, opacity: 0.78, duration: 1.35 },
                2.75,
              )
              .to(
                '[data-beauty="particles-back"]',
                { scale: 1.18, xPercent: 5, opacity: 0.72, z: -180, duration: 2.2 },
                2.3,
              )
              .to(
                '[data-beauty="particles-front"]',
                { scale: 1.7, xPercent: -9, opacity: 0.62, z: 320, duration: 2.2 },
                2.3,
              );
          tl.to('[data-beauty="copy"]', { autoAlpha: 0, y: -42, duration: 0.4 }, 4.35)
            .set(fragrance, { zIndex: 40, visibility: "visible" }, 4.47)
            .set('[data-fragrance="bottle"]', { visibility: "visible", opacity: 1 }, 4.47)
            .to(fragrance, { autoAlpha: 1, scale: 1, duration: 0.55 }, 4.48)
            .to(beauty, { autoAlpha: 0, visibility: "hidden", duration: 0.35 }, 4.62);
          if (!reduced)
            tl.set(
              '[data-fragrance="bottle"]',
              {
                autoAlpha: 1,
                scale: 0.86,
                rotationY: -35,
                rotationX: 8,
                rotationZ: -2,
                z: -90,
              },
              4.55,
            )
              .to(
                '[data-fragrance="bottle"]',
                { scale: 0.95, rotationY: 0, rotationX: 2, rotationZ: -1, z: -25, duration: 0.38 },
                4.55,
              )
              .to(
                '[data-fragrance="bottle"]',
                { scale: 1.1, rotationY: 55, rotationX: -10, rotationZ: 3, z: 125, duration: 0.48 },
                4.93,
              )
              .to(
                '[data-fragrance="bottle"]',
                { scale: 1.16, rotationY: 15, rotationX: -6, rotationZ: 1, z: 165, duration: 0.66 },
                5.41,
              )
              .fromTo(
                '[data-fragrance="camera"]',
                { xPercent: -1, scale: 0.985 },
                { xPercent: 1, scale: 1.035, duration: 1.52, ease: "power1.inOut" },
                4.55,
              )
              .fromTo(
                '[data-fragrance="highlight"]',
                { xPercent: -125, opacity: 0 },
                { xPercent: 125, opacity: 0.88, duration: 1.4 },
                4.8,
              )
              .to(
                '[data-fragrance="petals"]',
                {
                  scale: 1.42,
                  rotationZ: 16,
                  xPercent: 7,
                  z: 300,
                  opacity: mobile ? 0.35 : 0.72,
                  duration: 1.7,
                },
                4.6,
              )
              .to(
                '[data-fragrance="mist-back"]',
                { scale: 1.2, z: -200, opacity: 0.5, duration: 1.7 },
                4.6,
              )
              .to(
                '[data-fragrance="mist-front"]',
                { scale: 1.5, z: 360, opacity: 0.42, duration: 1.7 },
                4.6,
              );
        }, rootRef);
        ScrollTrigger.refresh();
        cleanup = () => {
          ctx.revert();
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return (
    <div ref={rootRef} className="cinematic-stack relative h-screen overflow-hidden bg-background">
      {children}
    </div>
  );
}
