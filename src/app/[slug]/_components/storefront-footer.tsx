'use client';

import Link from 'next/link';
import type { TemplateTokens } from '@/lib/template-presets';
import { cn } from '@/lib/utils';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';

interface StorefrontFooterProps {
  shop: {
    name: string;
    slogan: string | null;
    whatsapp: string | null;
    operationalHours: string | null;
    address: string | null;
    googleMapsUrl: string | null;
    instagramUrl: string | null;
    facebookUrl: string | null;
    tiktokUrl: string | null;
  };
  tokens: TemplateTokens;
}

// Custom Instagram icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

// Custom Facebook icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

// Custom TikTok icon since Lucide doesn't have a direct TikTok icon in some versions
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.02 1.72.01 2.58.02v3.74c-1.29-.01-2.58-.3-3.77-.84-.13-.06-.26-.13-.39-.2-.05 2.86-.02 5.72-.04 8.58-.08 2.36-.91 4.73-2.71 6.27-1.74 1.56-4.22 2.21-6.5 1.77-2.6-.46-4.88-2.3-5.65-4.85-.92-2.92.1-6.27 2.47-8.15 1.63-1.32 3.82-1.84 5.9-1.4v3.83c-1.12-.3-2.33-.1-3.29.54-.97.64-1.54 1.75-1.5 2.92.01 1.25.75 2.41 1.86 2.93.99.47 2.15.42 3.09-.16.63-.4.98-1.09.97-1.84v-13.4c.03-.02.04-.04.05-.05z" />
    </svg>
  );
}


function getShopOpenStatus(operationalHours: string | null): { isOpen: boolean; text: string } | null {
  if (!operationalHours) return null;
  
  try {
    const cleanHours = operationalHours.replace(/\./g, ':').replace(/\s/g, '');
    const timeRegex = /(\d{1,2}):(\d{2})/g;
    const matches = [...cleanHours.matchAll(timeRegex)];
    
    if (matches.length >= 2) {
      const startHour = parseInt(matches[0][1], 10);
      const startMin = parseInt(matches[0][2], 10);
      const endHour = parseInt(matches[1][1], 10);
      const endMin = parseInt(matches[1][2], 10);
      
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      
      const startTimeVal = startHour * 60 + startMin;
      const endTimeVal = endHour * 60 + endMin;
      const currentTimeVal = currentHour * 60 + currentMin;
      
      let isOpen = false;
      if (startTimeVal <= endTimeVal) {
        isOpen = currentTimeVal >= startTimeVal && currentTimeVal <= endTimeVal;
      } else {
        isOpen = currentTimeVal >= startTimeVal || currentTimeVal <= endTimeVal;
      }
      
      const daysInIndonesian = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
      const currentDayName = daysInIndonesian[now.getDay()];
      
      let isOffDay = false;
      const hoursLower = operationalHours.toLowerCase();
      if (hoursLower.includes("senin - sabtu") && currentDayName === "minggu") {
        isOffDay = true;
      } else if (hoursLower.includes("senin - jumat") && (currentDayName === "sabtu" || currentDayName === "minggu")) {
        isOffDay = true;
      } else if (hoursLower.includes("sabtu - minggu") && !["sabtu", "minggu"].includes(currentDayName)) {
        isOffDay = true;
      }
      
      if (isOffDay) {
        return { isOpen: false, text: "Sekarang Tutup (Hari Libur)" };
      }
      
      return {
        isOpen,
        text: isOpen ? "Sekarang Buka" : "Sekarang Tutup"
      };
    }
  } catch (e) {
    console.error("Gagal mem-parse jam operasional:", e);
  }
  
  return { isOpen: true, text: "Sekarang Buka" };
}

export function StorefrontFooter({ shop, tokens }: StorefrontFooterProps) {
  const statusInfo = getShopOpenStatus(shop.operationalHours);
  const showSocials = !!(shop.instagramUrl || shop.facebookUrl || shop.tiktokUrl);

  return (
    <footer className={cn(
      "mt-12 border-t pt-10 pb-24 md:pb-12 px-6 md:px-8 w-full transition-colors duration-200",
      tokens.canvas === "bg-zinc-950" 
        ? "border-zinc-800 bg-zinc-950 text-zinc-400" 
        : tokens.canvas === "bg-rose-50"
        ? "border-rose-100 bg-rose-50 text-slate-600"
        : "border-gray-150 bg-white text-gray-600"
    )}>
      <div className="mx-auto max-w-6xl w-full">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
          
          {/* Column 1: Shop Identity & Social Links */}
          <div className="flex flex-col justify-start">
            <h2 className={cn("text-xl font-bold tracking-tight", tokens.text)}>
              {shop.name}
            </h2>
            {shop.slogan && (
              <p className={cn("mt-2.5 max-w-xs text-sm leading-relaxed text-balance", tokens.muted)}>
                {shop.slogan}
              </p>
            )}
            
            {/* Social Media Links */}
            {showSocials && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {shop.instagramUrl && (
                  <Link 
                    href={`https://instagram.com/${shop.instagramUrl.replace('@', '')}`}
                    target="_blank"
                    className={cn(
                      "flex size-9 rounded-full border items-center justify-center transition-all duration-200 hover:scale-105",
                      tokens.canvas === "bg-zinc-950" 
                        ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100" 
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-500 hover:text-gray-900"
                    )}
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="size-4" />
                  </Link>
                )}

                {shop.facebookUrl && (
                  <Link 
                    href={`https://facebook.com/${shop.facebookUrl}`}
                    target="_blank"
                    className={cn(
                      "flex size-9 rounded-full border items-center justify-center transition-all duration-200 hover:scale-105",
                      tokens.canvas === "bg-zinc-950" 
                        ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100" 
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-500 hover:text-gray-900"
                    )}
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="size-4" />
                  </Link>
                )}

                {shop.tiktokUrl && (
                  <Link 
                    href={`https://tiktok.com/@${shop.tiktokUrl.replace('@', '')}`}
                    target="_blank"
                    className={cn(
                      "flex size-9 rounded-full border items-center justify-center transition-all duration-200 hover:scale-105",
                      tokens.canvas === "bg-zinc-950" 
                        ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100" 
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-500 hover:text-gray-900"
                    )}
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="size-4" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Jam Operasional */}
          <div className="flex flex-col justify-start">
            {shop.operationalHours && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5 font-semibold">
                  <Clock className={cn("h-4.5 w-4.5 shrink-0 opacity-80", tokens.text)} />
                  <span className={cn("text-xs font-bold tracking-wider uppercase opacity-85", tokens.text)}>
                    Jam Operasional
                  </span>
                </div>
                <p className={cn("text-sm leading-relaxed", tokens.muted)}>
                  {shop.operationalHours}
                </p>
                {statusInfo && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      statusInfo.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                    )} />
                    <span className={cn(
                      "font-semibold text-xs",
                      statusInfo.isOpen 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-rose-600 dark:text-rose-400"
                    )}>
                      {statusInfo.text}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 3: Lokasi & Kontak */}
          <div className="flex flex-col justify-start">
            {(shop.address || shop.whatsapp) && (
              <div className="space-y-4">
                {shop.address && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 font-semibold">
                      <MapPin className={cn("h-4.5 w-4.5 shrink-0 opacity-80", tokens.text)} />
                      <span className={cn("text-xs font-bold tracking-wider uppercase opacity-85", tokens.text)}>
                        Lokasi Toko
                      </span>
                    </div>
                    <p className={cn("text-sm leading-relaxed", tokens.muted)}>
                      {shop.address}
                    </p>
                    {shop.googleMapsUrl && (
                      <Link 
                        href={shop.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-bold hover:underline group transition-colors",
                          tokens.canvas === "bg-zinc-950" 
                            ? "text-zinc-200 hover:text-white" 
                            : "text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                        )}
                      >
                        <span>Petunjuk Arah (Maps)</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                )}

                {shop.whatsapp && (
                  <div className={cn(
                    "flex items-center gap-2.5 text-sm pt-3 border-t border-dashed",
                    tokens.canvas === "bg-zinc-950" ? "border-zinc-800" : "border-gray-150"
                  )}>
                    <Phone className={cn("h-4 w-4 shrink-0 opacity-70", tokens.text)} />
                    <span className={cn("font-medium", tokens.text)}>WhatsApp:</span>
                    <Link 
                      href={`https://wa.me/${shop.whatsapp}`} 
                      target="_blank"
                      className={cn(
                        "font-semibold hover:underline transition-colors",
                        tokens.canvas === "bg-zinc-950" 
                          ? "text-zinc-200 hover:text-white" 
                          : "text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                      )}
                    >
                      +{shop.whatsapp}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Section: Copyright & LapakKilat Branding */}
        <div className={cn(
          "border-t mt-12 md:mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-center md:text-left",
          tokens.canvas === "bg-zinc-950" ? "border-zinc-900" : "border-gray-150/60"
        )}>
          <p className={tokens.muted}>
            &copy; {new Date().getFullYear()} {shop.name}. Hak Cipta Dilindungi.
          </p>
          
          <p className={cn("flex flex-wrap items-center justify-center gap-1 md:gap-1.5", tokens.muted)}>
            <span>Diberdayakan oleh</span>
            <Link 
              href="/"
              className={cn(
                "font-semibold hover:underline",
                tokens.canvas === "bg-zinc-950" ? "text-zinc-200" : "text-emerald-700 dark:text-emerald-400"
              )}
            >
              LapakKilat
            </Link>
            <span className="hidden md:inline">&mdash;</span>
            <Link 
              href="/" 
              className="hover:underline text-[10px] text-emerald-600 dark:text-emerald-400 font-medium"
            >
              Bikin Katalog Tokomu Gratis Sekarang
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
