import { EditorialArt } from "@/components/ui/EditorialArt";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Parallax } from "@/components/animations/Parallax";
import type { Destination } from "@/types/destination";

export function DestinationHero({ destination }: { destination: Destination }) {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 text-paper sm:px-10">
      <Parallax className="absolute inset-0 -z-10" strength={40}>
        <EditorialArt
          palette={destination.palette}
          motif={destination.motif}
          className="h-[120%] w-full"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />

      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-paper/70">
          {destination.continent.replace("-", " ")}
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          {destination.country}
        </h1>
        <p className="mt-6 max-w-xl font-display text-2xl italic text-paper/90 sm:text-3xl">
          {destination.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-medium uppercase tracking-[0.15em] text-paper/70">
          <span>Best time: {destination.bestTime}</span>
          <span>
            {destination.temperature.low}°–{destination.temperature.high}°C
          </span>
          <FavoriteButton id={destination.id} label={destination.country} />
        </div>
      </div>
    </section>
  );
}
