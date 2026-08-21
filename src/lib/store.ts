import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "auto";

export type CompanionMood =
  | "idle"
  | "excited"
  | "exploring"
  | "thinking"
  | "discovering"
  | "success";

type OdysseyState = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  companionMood: CompanionMood;
  companionMessage: string | null;
  setCompanion: (mood: CompanionMood, message?: string) => void;
};

const MAX_RECENT_SEARCHES = 6;

export const useOdysseyStore = create<OdysseyState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      recentSearches: [],
      addRecentSearch: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          const next = [
            trimmed,
            ...state.recentSearches.filter((q) => q !== trimmed),
          ].slice(0, MAX_RECENT_SEARCHES);
          return { recentSearches: next };
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),

      theme: "auto",
      setTheme: (theme) => set({ theme }),

      companionMood: "idle",
      companionMessage: null,
      setCompanion: (mood, message) =>
        set({ companionMood: mood, companionMessage: message ?? null }),
    }),
    {
      name: "odyssey-store",
      skipHydration: true,
      partialize: (state) => ({
        favorites: state.favorites,
        recentSearches: state.recentSearches,
        theme: state.theme,
      }),
    },
  ),
);
