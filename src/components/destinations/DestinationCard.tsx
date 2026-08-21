import Link from "next/link";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import type { Destination } from "@/types/destination";

type DestinationCardProps = {
  destination: Destination;
  variant?: number;
};

export function DestinationCard({ destination, variant = 0 }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      data-cursor="view"
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <EditorialArt
          palette={destination.palette}
          motif={destination.motif}
          variant={variant}
          className="h-full w-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <FavoriteButton
        id={destination.id}
        label={destination.country}
        className="absolute right-3 top-3"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-paper transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/70">
          {destination.continent.replace("-", " ")}
        </p>
        <h3 className="font-display text-2xl leading-tight">
          {destination.country}
        </h3>
        <p className="max-h-0 overflow-hidden text-xs text-paper/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-12 group-hover:opacity-100">
          {destination.tagline}
        </p>
      </div>
    </Link>
  );
}
