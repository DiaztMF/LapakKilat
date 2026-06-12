export type TemplatePreset = "fresh" | "playful" | "minimalist";

export interface TemplateTokens {
  canvas: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  accentHover: string;
  radius: string;
  cardBorder: string;
  shadow: string;
  badgeBg: string;
  badgeText: string;
  inputBorder: string;
  inputFocus: string;
}

const presets: Record<TemplatePreset, TemplateTokens> = {
  fresh: {
    canvas: "bg-white",
    text: "text-emerald-950",
    muted: "text-gray-600",
    accent: "bg-emerald-600",
    accentText: "text-white",
    accentHover: "hover:bg-emerald-700",
    radius: "rounded-lg",
    cardBorder: "border border-gray-200",
    shadow: "shadow-sm",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    inputBorder: "border-gray-300",
    inputFocus: "focus:ring-emerald-500 focus:border-emerald-500",
  },
  playful: {
    canvas: "bg-rose-50",
    text: "text-slate-800",
    muted: "text-slate-500",
    accent: "bg-rose-400",
    accentText: "text-white",
    accentHover: "hover:bg-rose-500",
    radius: "rounded-2xl",
    cardBorder: "border-0",
    shadow: "shadow-md shadow-rose-100",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-600",
    inputBorder: "border-rose-200",
    inputFocus: "focus:ring-rose-400 focus:border-rose-400",
  },
  minimalist: {
    canvas: "bg-zinc-950",
    text: "text-zinc-50",
    muted: "text-zinc-400",
    accent: "bg-zinc-100",
    accentText: "text-zinc-950",
    accentHover: "hover:bg-zinc-200",
    radius: "rounded-none",
    cardBorder: "border border-zinc-800",
    shadow: "shadow-none",
    badgeBg: "bg-zinc-800",
    badgeText: "text-zinc-300",
    inputBorder: "border-zinc-700",
    inputFocus: "focus:ring-zinc-400 focus:border-zinc-400",
  },
};

export function getTemplateTokens(preset: TemplatePreset): TemplateTokens {
  return presets[preset];
}

export const presetOptions = [
  {
    id: "fresh" as const,
    label: "Fresh & Clean",
    description: "Tampilan bersih dengan nuansa hijau segar",
    previewBg: "bg-white",
    previewAccent: "bg-emerald-600",
    previewText: "text-emerald-950",
  },
  {
    id: "playful" as const,
    label: "Playful & Warm",
    description: "Tampilan ceria dengan nuansa merah muda hangat",
    previewBg: "bg-rose-50",
    previewAccent: "bg-rose-400",
    previewText: "text-slate-800",
  },
  {
    id: "minimalist" as const,
    label: "Bold & Minimalist",
    description: "Tampilan gelap dan modern dengan garis tegas",
    previewBg: "bg-zinc-950",
    previewAccent: "bg-zinc-100",
    previewText: "text-zinc-50",
  },
] as const;
