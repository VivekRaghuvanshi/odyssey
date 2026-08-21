import { destinationImages } from "@/data/destination-images.generated";
import type { DestinationImageMeta } from "@/data/destination-images.generated";

export function getDestinationImage(
  slug: string,
  imageId: string,
): DestinationImageMeta | undefined {
  return destinationImages[slug]?.[imageId];
}
