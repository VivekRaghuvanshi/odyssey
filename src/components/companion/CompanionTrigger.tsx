"use client";

import { useEffect } from "react";
import { useOdysseyStore, type CompanionMood } from "@/lib/store";

type CompanionTriggerProps = {
  mood: CompanionMood;
  message?: string;
};

export function CompanionTrigger({ mood, message }: CompanionTriggerProps) {
  const setCompanion = useOdysseyStore((state) => state.setCompanion);

  useEffect(() => {
    setCompanion(mood, message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, message]);

  return null;
}
