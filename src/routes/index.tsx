import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { EditorialContent } from "@/components/EditorialContent";
import { HeroScroll } from "@/components/HeroScroll";
import { IntroSequence } from "@/components/IntroSequence";
import { SiteNav } from "@/components/SiteNav";

const TITLE = "Maison Collective — Estates, Beauty & Fragrance";
const DESCRIPTION =
  "A three-house collective: architectural private estates, a pigment-led makeup maison, and rare-extraction fragrance. Explore each world as you scroll.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <IntroSequence onFinish={() => setEntered(true)} />
      <main
        id="top"
        className="bg-background transition-opacity duration-1000"
        style={{ opacity: entered ? 1 : 0 }}
      >
        <SiteNav />
        <h1 className="sr-only">
          Maison Collective — private estates, beauty maison and fragrance house
        </h1>
        <HeroScroll />
        <EditorialContent />
      </main>
    </>
  );
}
