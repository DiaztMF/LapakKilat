"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TemplateTokens, TemplatePreset } from "@/lib/template-presets";
import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  categories: string[];
  tokens: TemplateTokens;
  preset: TemplatePreset;
}

export function CategoryTabs({ categories, tokens, preset }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Dispatch custom event untuk ProductGrid
  const handleTabChange = (category: string) => {
    setActiveCategory(category);
    window.dispatchEvent(
      new CustomEvent("category-change", { detail: category })
    );
  };

  const getTabStyles = (isActive: boolean) => {
    if (isActive) {
      switch (preset) {
        case "fresh":
          return "bg-emerald-600 text-white";
        case "playful":
          return "bg-rose-400 text-white";
        case "minimalist":
          return "bg-zinc-100 text-zinc-950";
      }
    }

    switch (preset) {
      case "fresh":
        return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
      case "playful":
        return "bg-rose-100 text-rose-600 hover:bg-rose-200";
      case "minimalist":
        return "bg-zinc-800 text-zinc-300 hover:bg-zinc-700";
    }
  };

  if (categories.length <= 1) return null;

  return (
    <div className="sticky top-0 z-30 px-4 py-3" style={{ backgroundColor: "inherit" }}>
      <div
        className={cn(
          "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
          tokens.canvas
        )}
      >
        {categories.map((category) => (
          <Button
            variant="ghost"
            key={category}
            onClick={() => handleTabChange(category)}
            className={cn(
              "shrink-0 px-4 py-2 text-sm font-medium transition-all duration-150 ease-in-out active:scale-95",
              tokens.radius,
              getTabStyles(activeCategory === category)
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
