import { useEffect, useRef, type ReactNode } from "react";
import estateDoorway from "@/assets/real-estate-v2/doorway-glow.png";
import estateEnvironment from "@/assets/real-estate-v2/environment.png";
import estateArchitecture from "@/assets/real-estate-v2/foreground-architecture.png";
import estateTerrace from "@/assets/real-estate-v2/terrace.png";
import estateVegetation from "@/assets/real-estate-v2/vegetation.png";
import estateVilla from "@/assets/real-estate-v2/villa.png";

export function EstateScene({
  children,
  managed = false,
  className = "",
}: {
  children: ReactNode;
  managed?: boolean;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const villaRef = useRef<HTMLImageElement>(null);
  const leftForegroundRef = useRef<HTMLImageElement>(null);
  const rightForegroundRef = useRef<HTMLImageElement>(null);
  const floorRef = useRef<HTMLImageElement>(null);
  const doorwayRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const portalWashRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (managed || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      const gsap = g.gsap;
      gsap.registerPlugin(s.ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.set(cameraRef.current, { transformPerspective: 1200, transformStyle: "preserve-3d" });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${innerHeight * 1.6}`,
              pin: true,
              scrub: 1,
            },
          })
          .fromTo(backgroundRef.current, { scale: 1.08, z: -180 }, { scale: 1.42, z: -80 }, 0)
          .fromTo(
            villaRef.current,
            { scale: 0.88, yPercent: 13, z: -40 },
            { scale: 1.34, yPercent: 13, z: 170, rotationY: -3 },
            0,
          )
          .fromTo(leftForegroundRef.current, { xPercent: 0, z: 160 }, { xPercent: -48, z: 420 }, 0)
          .fromTo(rightForegroundRef.current, { xPercent: 0, z: 160 }, { xPercent: 48, z: 420 }, 0)
          .fromTo(floorRef.current, { scaleY: 1, z: 60 }, { scaleY: 1.55, yPercent: 12, z: 340 }, 0)
          .to(copyRef.current, { autoAlpha: 0, y: -48 }, 0.55)
          .to(doorwayRef.current, { scale: 3.1, z: 520, rotationY: 12, opacity: 0.92 }, 0.68)
          .to(portalWashRef.current, { autoAlpha: 0.96 }, 0.84);
      }, sectionRef);
      cleanup = () => ctx.revert();
    });
    return () => cleanup();
  }, [managed]);
  return (
    <section
      ref={sectionRef}
      data-scene="estate"
      className={`${className || "relative"} h-screen overflow-hidden bg-[#11191d]`}
    >
      <div ref={cameraRef} data-estate="camera" className="estate-camera absolute inset-0">
        <img
          ref={backgroundRef}
          data-estate="background"
          src={estateEnvironment}
          alt=""
          className="estate-layer object-cover"
        />
        <img
          ref={villaRef}
          data-estate="villa"
          src={estateVilla}
          alt="Luxury modern Mediterranean villa at blue hour"
          className="estate-layer object-contain object-center"
          style={{ objectPosition: "center 45%" }}
        />
        <img
          ref={doorwayRef}
          data-estate="doorway"
          src={estateDoorway}
          alt=""
          className="estate-layer object-contain object-center mix-blend-screen"
        />
        <img
          src={estateVegetation}
          alt=""
          data-estate="vegetation"
          className="estate-layer object-cover"
        />
        <img
          ref={floorRef}
          data-estate="floor"
          src={estateTerrace}
          alt=""
          className="estate-layer object-cover"
        />
        <img
          ref={leftForegroundRef}
          data-estate="left"
          src={estateArchitecture}
          alt=""
          className="estate-layer object-cover [clip-path:inset(0_50%_0_0)]"
        />
        <img
          ref={rightForegroundRef}
          data-estate="right"
          src={estateArchitecture}
          alt=""
          className="estate-layer object-cover [clip-path:inset(0_0_0_50%)]"
        />
      </div>
      <div className="hero-scrim absolute inset-0" />
      <div ref={copyRef} data-estate="copy" className="relative h-full">
        {children}
      </div>
      <div
        ref={portalWashRef}
        data-estate="portal"
        className="invisible pointer-events-none absolute inset-0 bg-[#d3aa73] opacity-0 mix-blend-screen"
      />
    </section>
  );
}
