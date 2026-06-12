import { getShopByUser } from "@/app/actions/shop";
import { ProfilForm } from "./_components/profil-form";
import { QrCodeSection } from "./_components/qr-code-section";

export default async function ProfilPage() {
  const shop = await getShopByUser();

  if (!shop) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Toko tidak ditemukan. Silakan login ulang.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil Toko</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola informasi toko dan pilih tampilan desain katalogmu.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfilForm shop={shop} />
        </div>
        <div>
          <QrCodeSection slug={shop.slug} isPublished={shop.isPublished} />
        </div>
      </div>
    </div>
  );
}
