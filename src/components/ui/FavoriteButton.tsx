"use client";

import { Heart } from "lucide-react";
import { useOdysseyStore } from "@/lib/store";

type FavoriteButtonProps = {
  id: string;
  label: string;
  className?: string;
};

export function FavoriteButton({ id, label, className = "" }: FavoriteButtonProps) {
  const isFavorite = useOdysseyStore((state) => state.favorites.includes(id));
  const toggleFavorite = useOdysseyStore((state) => state.toggleFavorite);
  const setCompanion = useOdysseyStore((state) => state.setCompanion);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? `Remove ${label} from favorites` : `Save ${label} to favorites`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const next = !isFavorite;
        toggleFavorite(id);
        if (next) {
          setCompanion("success", `Saved to your journey.`);
        }
      }}
      className={`flex size-9 items-center justify-center rounded-full bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70 ${className}`}
    >
      <Heart
        className="size-4"
        fill={isFavorite ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
