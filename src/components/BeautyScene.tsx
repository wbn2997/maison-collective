import { useRef, type ReactNode } from "react";
import beautyParticles from "@/assets/beauty-v2/depth-particles.png";
import foundationBottle from "@/assets/beauty-v2/foundation-bottle.png";
import foundationCap from "@/assets/beauty-v2/foundation-cap.png";
import movingHighlight from "@/assets/beauty-v2/moving-highlight.png";

export function BeautyScene({
  children,
  className = "",
}: {
  children: ReactNode;
  managed?: boolean;
  className?: string;
}) {
  const productRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLImageElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const particlesBackRef = useRef<HTMLImageElement>(null);
  const particlesFrontRef = useRef<HTMLImageElement>(null);
  const highlightRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  return (
    <section
      data-scene="beauty"
      className={`${className || "relative"} h-screen overflow-hidden bg-[#2a1e19]`}
    >
      <div className="beauty-vignette absolute inset-0" />
      <img
        ref={particlesBackRef}
        data-beauty="particles-back"
        src={beautyParticles}
        alt=""
        className="beauty-particles opacity-25"
      />
      <div
        data-beauty="camera"
        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[10vw]"
      >
        <div
          ref={productRef}
          data-beauty="product"
          className="beauty-product relative aspect-square h-[68vh] max-h-[48rem] max-w-[92vw]"
        >
          <div
            ref={orbitRef}
            data-beauty="orbit"
            className="beauty-orbit absolute inset-[17%] rounded-full"
          />
          <img
            src={foundationBottle}
            alt="Premium refillable serum foundation bottle"
            className="absolute inset-0 h-full w-full object-contain"
          />
          <img
            ref={capRef}
            data-beauty="cap"
            src={foundationCap}
            alt=""
            className="absolute left-1/2 top-[3%] z-20 h-[30%] w-[32%] object-contain"
          />
          <div className="absolute inset-[9%_30%] z-30 overflow-hidden rounded-[42%] mix-blend-screen">
            <img
              ref={highlightRef}
              data-beauty="highlight"
              src={movingHighlight}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <img
        ref={particlesFrontRef}
        data-beauty="particles-front"
        src={beautyParticles}
        alt=""
        className="beauty-particles z-30 opacity-20"
      />
      <div ref={copyRef} data-beauty="copy" className="relative z-40 h-full">
        {children}
      </div>
    </section>
  );
}
