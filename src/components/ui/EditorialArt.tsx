import type { ArtMotif } from "@/types/destination";

type EditorialArtProps = {
  palette: [string, string];
  motif: ArtMotif;
  label?: string;
  variant?: number;
  className?: string;
};

const motifPaths: Record<ArtMotif, string[]> = {
  mountains: [
    "M0 260 L70 160 L120 220 L190 90 L260 220 L320 150 L400 260 Z",
    "M0 300 L60 240 L140 290 L220 190 L300 290 L400 230 L400 400 L0 400 Z",
  ],
  waves: [
    "M0 150 Q50 110 100 150 T200 150 T300 150 T400 150",
    "M0 210 Q50 170 100 210 T200 210 T300 210 T400 210",
    "M0 270 Q50 230 100 270 T200 270 T300 270 T400 270",
  ],
  dunes: [
    "M0 260 Q100 190 200 260 T400 260 L400 400 L0 400 Z",
    "M0 220 Q120 160 240 220 T400 200",
  ],
  forest: [
    "M60 340 L60 260 M40 270 L60 220 L80 270 Z M30 300 L60 240 L90 300 Z",
    "M180 340 L180 240 M155 255 L180 190 L205 255 Z M140 295 L180 220 L220 295 Z",
    "M300 340 L300 270 M280 280 L300 230 L320 280 Z M270 310 L300 250 L330 310 Z",
  ],
  aurora: [
    "M0 180 C100 100 140 260 240 160 S380 220 400 140",
    "M0 240 C110 170 150 300 260 220 S380 260 400 200",
  ],
  city: [
    "M20 340 L20 200 L55 200 L55 340 Z",
    "M75 340 L75 150 L105 150 L105 340 Z",
    "M120 340 L120 240 L150 240 L150 340 Z",
    "M165 340 L165 180 L200 180 L200 340 Z",
    "M215 340 L215 260 L240 260 L240 340 Z",
    "M255 340 L255 120 L290 120 L290 340 Z",
  ],
};

export function EditorialArt({
  palette,
  motif,
  label,
  variant = 0,
  className = "",
}: EditorialArtProps) {
  const angle = 135 + (variant % 4) * 25;
  const paths = motifPaths[motif];
  const flip = variant % 2 === 1;

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, ${palette[0]}, ${palette[1]})`,
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full opacity-25"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        {paths.map((d, i) =>
          motif === "city" || motif === "forest" ? (
            <path key={i} d={d} fill={palette[1]} fillOpacity={0.5} />
          ) : (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={palette[1]}
              strokeWidth={1.5}
            />
          ),
        )}
      </svg>

      <div
        aria-hidden="true"
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
      />

      {label && (
        <span className="pointer-events-none absolute bottom-3 right-4 font-display text-[10px] uppercase tracking-[0.3em] text-white/40">
          {label}
        </span>
      )}
    </div>
  );
}
