import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CompanionTrigger } from "@/components/companion/CompanionTrigger";
import { DestinationHero } from "@/components/destinations/DestinationHero";
import { EditorialSection } from "@/components/destinations/EditorialSection";
import { DestinationGallery } from "@/components/destinations/DestinationGallery";
import { LocationMapLoader } from "@/components/map/LocationMapLoader";
import { DestinationMedia } from "@/components/ui/DestinationMedia";
import { Reveal } from "@/components/animations/Reveal";
import { CtaLink } from "@/components/ui/CtaLink";
import { getAllDestinations, getDestinationBySlug } from "@/lib/destinations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};

  return {
    title: destination.country,
    description: destination.description,
    openGraph: {
      title: `${destination.country} — ${destination.tagline}`,
      description: destination.description,
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) notFound();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <CompanionTrigger
        mood="discovering"
        message={`Discovering ${destination.country}…`}
      />
      <DestinationHero destination={destination} />

      <EditorialSection index="01" title="The Place">
        <p>{destination.description}</p>
      </EditorialSection>

      <EditorialSection index="02" title="Culture">
        <p>{destination.culture}</p>
      </EditorialSection>

      <EditorialSection index="03" title="Food">
        <p>{destination.food}</p>
      </EditorialSection>

      <section className="border-t border-stone-200 px-6 py-16 dark:border-stone-800 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
            04 — Landscapes
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {destination.highlights.map((place, i) => (
              <div key={place} className="flex flex-col gap-2">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <DestinationMedia
                    destination={destination}
                    imageId={destination.gallery[i % destination.gallery.length]?.id}
                    alt={place}
                    decorative
                    variant={i + 4}
                    sizes="(min-width: 768px) 20vw, 33vw"
                    className="h-full w-full"
                  />
                </div>
                <p className="text-sm font-medium">{place}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-stone-200 px-6 py-16 dark:border-stone-800 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
            05 — Experiences
          </h2>
          <div className="mt-6">
            <DestinationGallery destination={destination} />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-stone-200 px-6 py-16 dark:border-stone-800 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
            Where it sits
          </h2>
          <div className="mt-6">
            <LocationMapLoader destination={destination} />
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center sm:px-10">
        <p className="font-display text-2xl sm:text-3xl">
          Where to next?
        </p>
        <CtaLink href="/destinations" variant="solid">
          Explore Another Destination
        </CtaLink>
        <Link
          href="/explore"
          className="text-sm text-stone-500 underline underline-offset-4 hover:text-ink dark:hover:text-paper"
        >
          Or browse by continent
        </Link>
      </section>
    </main>
  );
}
