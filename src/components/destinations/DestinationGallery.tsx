"use client";

import { useState } from "react";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { Lightbox } from "./Lightbox";
import type { Destination } from "@/types/destination";

const aspectClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function DestinationGallery({ destination }: { destination: Destination }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3">
        {destination.gallery.map((image, i) => (
          <button
            key={image.id}
            type="button"
            data-cursor="view"
            onClick={() => setOpenIndex(i)}
            className={`mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl ${aspectClass[image.aspect]}`}
          >
            <EditorialArt
              palette={destination.palette}
              motif={destination.motif}
              variant={i + 2}
              label={image.caption}
              className="h-full w-full transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={destination.gallery}
        palette={destination.palette}
        motif={destination.motif}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
