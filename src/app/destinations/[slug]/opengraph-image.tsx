import { ImageResponse } from "next/og";
import { getAllDestinations, getDestinationBySlug } from "@/lib/destinations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  const palette = destination?.palette ?? ["#0b0b0a", "#4a433b"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          backgroundImage: `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
          color: "#f7f4ee",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Odyssey
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, marginTop: 12 }}>
          {destination?.country ?? "ODYSSEY"}
        </div>
        <div style={{ fontSize: 32, fontStyle: "italic", marginTop: 8, opacity: 0.9 }}>
          {destination?.tagline ?? ""}
        </div>
      </div>
    ),
    { ...size },
  );
}
