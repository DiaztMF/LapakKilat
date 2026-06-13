import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  onGetStarted: () => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="border-t border-gray-100 bg-gradient-to-b from-emerald-50/40 to-white py-24 relative overflow-hidden">
      {/* Premium Decorative background gradient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-2xl px-6 text-center relative z-10 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Siap Go Digital?
        </h2>
        <p className="text-gray-650 text-base md:text-md max-w-lg mx-auto leading-relaxed">
          Bergabung dengan ribuan UMKM yang sudah menggunakan LapakKilat untuk membuat katalog online instan.
        </p>
        <div className="pt-2">
          <Button
            size="sm"
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-250 transition-all duration-150 hover:bg-emerald-700 active:scale-95 cursor-pointer"
          >
            Buat Toko Gratis Sekarang
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
