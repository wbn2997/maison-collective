import { useRef, type ReactNode } from "react";
import amberBottle from "@/assets/fragrance-v2/amber-bottle.png";
import atmosphericMist from "@/assets/fragrance-v2/atmospheric-mist.png";
import floatingPetals from "@/assets/fragrance-v2/floating-petals.png";
import glassHighlight from "@/assets/fragrance-v2/glass-highlight.png";

export function FragranceScene({
  children,
  className = "",
}: {
  children: ReactNode;
  managed?: boolean;
  className?: string;
}) {
  const bottleRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLImageElement>(null);
  const mistBackRef = useRef<HTMLImageElement>(null);
  const mistFrontRef = useRef<HTMLImageElement>(null);
  const petalsRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  return (
    <section
      data-scene="fragrance"
      className={`${className || "relative"} h-screen overflow-hidden bg-[#120d0b]`}
    >
      <div className="fragrance-vignette absolute inset-0" />
      <img
        ref={mistBackRef}
        data-fragrance="mist-back"
        src={atmosphericMist}
        alt=""
        className="fragrance-layer opacity-20"
      />
      <div
        data-fragrance="camera"
        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[10vw]"
      >
        <div
          ref={bottleRef}
          data-fragrance="bottle"
          className="fragrance-bottle relative aspect-square h-[70vh] max-h-[49rem] max-w-[94vw]"
        >
          <img
            src={amberBottle}
            alt="Thick-glass perfume bottle with amber fragrance and a dark gold cap"
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div className="absolute inset-[8%_28%] overflow-hidden rounded-[18%] mix-blend-screen">
            <img
              ref={highlightRef}
              data-fragrance="highlight"
              src={glassHighlight}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <img
        ref={petalsRef}
        data-fragrance="petals"
        src={floatingPetals}
        alt=""
        className="fragrance-layer z-30 opacity-20"
      />
      <img
        ref={mistFrontRef}
        data-fragrance="mist-front"
        src={atmosphericMist}
        alt=""
        className="fragrance-layer z-40 opacity-10"
      />
      <div ref={copyRef} data-fragrance="copy" className="relative z-50 h-full">
        {children}
      </div>
    </section>
  );
}
