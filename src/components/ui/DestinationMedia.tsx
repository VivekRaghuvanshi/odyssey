import Image from "next/image";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { getDestinationImage } from "@/lib/images";
import type { Destination } from "@/types/destination";

type DestinationMediaProps = {
  destination: Destination;
  imageId?: string;
  alt: string;
  decorative?: boolean;
  variant?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function DestinationMedia({
  destination,
  imageId,
  alt,
  decorative = false,
  variant = 0,
  className = "",
  priority,
  sizes = "100vw",
}: DestinationMediaProps) {
  const id = imageId ?? destination.gallery[0]?.id;
  const photo = id ? getDestinationImage(destination.slug, id) : undefined;

  if (!photo) {
    return (
      <EditorialArt
        palette={destination.palette}
        motif={destination.motif}
        variant={variant}
        label={decorative ? undefined : alt}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={decorative ? "" : alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
