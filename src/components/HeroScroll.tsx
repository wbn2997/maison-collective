import { BeautyScene } from "@/components/BeautyScene";
import { CinematicSections } from "@/components/CinematicSections";
import { EstateScene } from "@/components/EstateScene";
import { FragranceScene } from "@/components/FragranceScene";

export type HeroConcept = {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  cta: string;
  image: string;
  align: "left" | "center" | "right";
};

export const concepts: HeroConcept[] = [
  {
    id: "residences",
    eyebrow: "01 — Residences",
    title: "Private",
    accent: "Estates",
    copy: "A curated portfolio of architectural residences, acquired quietly and delivered turnkey.",
    cta: "View the portfolio",
    image: heroRealEstate,
    align: "left",
  },
  {
    id: "beauty",
    eyebrow: "02 — Beauty",
    title: "Studio",
    accent: "Maison",
    copy: "Colour engineered for skin. A makeup house built on pigment, texture and restraint.",
    cta: "Explore the collection",
    image: heroBeauty,
    align: "left",
  },
  {
    id: "fragrance",
    eyebrow: "03 — Fragrance",
    title: "Elysian",
    accent: "Parfums",
    copy: "Rare extractions, aged in oak. Scent composed as an object, not a product.",
    cta: "Discover the scent",
    image: heroFragrance,
    align: "center",
  },
];

function HeroCopy({ concept }: { concept: HeroConcept }) {
  return (
    <>
      <span className="label text-accent">{concept.eyebrow}</span>
      <h2 className="mt-6 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.85] tracking-[-0.03em] text-foreground">
        {concept.title} <em className="not-italic text-accent opacity-90">{concept.accent}</em>
      </h2>
      <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
        {concept.copy}
      </p>
      <a href={`#${concept.id}`} className="btn-ghostline mt-9">
        {concept.cta}
      </a>
    </>
  );
}

const copyLayout =
  "mx-auto flex h-full max-w-[100rem] flex-col items-start justify-end px-6 pb-28 md:px-14 md:pb-32";

export function HeroScroll() {
  const estate = concepts[0]!;
  const beauty = concepts[1]!;
  const fragrance = concepts[2]!;

  return (
    <CinematicSections>
      <EstateScene managed className="absolute inset-0">
        <div className={copyLayout}>
          <HeroCopy concept={estate} />
        </div>
      </EstateScene>

      <BeautyScene managed className="absolute inset-0">
        <div className={copyLayout}>
          <HeroCopy concept={beauty} />
        </div>
      </BeautyScene>

      <FragranceScene managed className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[100rem] flex-col items-center justify-end px-6 pb-28 text-center md:px-14 md:pb-32">
          <HeroCopy concept={fragrance} />
        </div>
      </FragranceScene>
    </CinematicSections>
  );
}
import heroBeauty from "@/assets/hero-beauty.jpg";
import heroFragrance from "@/assets/hero-fragrance.jpg";
import heroRealEstate from "@/assets/hero-realestate.jpg";
