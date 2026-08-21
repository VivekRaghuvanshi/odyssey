import { ImageResponse } from "next/og";

export const alt = "ODYSSEY — Interactive Travel Experience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0a",
          color: "#f7f4ee",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Odyssey
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            marginTop: 24,
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          The world is waiting.
        </div>
      </div>
    ),
    { ...size },
  );
}
