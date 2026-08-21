"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DestinationMedia } from "@/components/ui/DestinationMedia";
import { getDestinationImage } from "@/lib/images";
import type { Destination, GalleryImage } from "@/types/destination";

type LightboxProps = {
  destination: Destination;
  images: GalleryImage[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({
  destination,
  images,
  openIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (openIndex === null) return;

    function onKey(event: KeyboardEvent) {
      if (openIndex === null) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((openIndex + 1) % images.length);
      if (event.key === "ArrowLeft")
        onNavigate((openIndex - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-6"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full text-paper hover:bg-paper/10"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate((openIndex - 1 + images.length) % images.length)
            }
            aria-label="Previous image"
            className="absolute left-4 flex size-10 items-center justify-center rounded-full text-paper hover:bg-paper/10 sm:left-8"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <motion.div
            key={openIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl"
          >
            <DestinationMedia
              destination={destination}
              imageId={images[openIndex].id}
              alt={images[openIndex].caption}
              variant={openIndex + 2}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-full w-full"
            />
          </motion.div>

          <button
            type="button"
            onClick={() => onNavigate((openIndex + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-4 flex size-10 items-center justify-center rounded-full text-paper hover:bg-paper/10 sm:right-8"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>

          <p className="absolute bottom-6 text-sm text-paper/70">
            {images[openIndex].caption} — {openIndex + 1} / {images.length}
            {(() => {
              const photo = getDestinationImage(destination.slug, images[openIndex].id);
              if (!photo) return null;
              return (
                <>
                  {" "}
                  ·{" "}
                  <a
                    href={photo.pexelsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-paper"
                  >
                    Photo by {photo.photographer}
                  </a>
                </>
              );
            })()}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
