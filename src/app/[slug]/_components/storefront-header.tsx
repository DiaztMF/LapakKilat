import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TemplateTokens } from "@/lib/template-presets";

interface StorefrontHeaderProps {
  shop: {
    name: string;
    slogan: string | null;
    profileImage: string | null;
    bannerImage: string | null;
  };
  tokens: TemplateTokens;
}

export function StorefrontHeader({ shop, tokens }: StorefrontHeaderProps) {
  return (
    <header className="relative">
      {/* Banner */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-200">
        {shop.bannerImage ? (
          <Image
            src={shop.bannerImage}
            alt={`Banner ${shop.name}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className={cn("h-full w-full", tokens.accent, "opacity-20")} />
        )}
      </div>

      {/* Profile + Info */}
      <div className="relative px-4 pb-4">
        {/* Profile Image */}
        <div className="-mt-10 mb-3 flex justify-center">
          <div
            className={cn(
              "h-20 w-20 overflow-hidden rounded-full border-4 bg-white",
              tokens.canvas === "bg-zinc-950"
                ? "border-zinc-900"
                : "border-white"
            )}
          >
            {shop.profileImage ? (
              <Image
                src={shop.profileImage}
                alt={shop.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center text-2xl font-bold",
                  tokens.accent,
                  tokens.accentText
                )}
              >
                {shop.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Shop Info */}
        <div className="text-center">
          <h1 className={cn("text-xl font-bold", tokens.text)}>
            {shop.name}
          </h1>
          {shop.slogan && (
            <p className={cn("mt-1 text-sm", tokens.muted)}>
              {shop.slogan}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
