"use client";

import { useState } from "react";
import { updateShopProfile } from "@/app/actions/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { presetOptions, type TemplatePreset } from "@/lib/template-presets";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Camera, Loader2, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Shop {
  id: string;
  slug: string;
  name: string;
  slogan: string | null;
  whatsapp: string | null;
  profileImage: string | null;
  bannerImage: string | null;
  templatePreset: "fresh" | "playful" | "minimalist";
  isPublished: boolean;
}

export function ProfilForm({ shop }: { shop: Shop }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [profileImage, setProfileImage] = useState(shop.profileImage || "");
  const [bannerImage, setBannerImage] = useState(shop.bannerImage || "");
  const [selectedPreset, setSelectedPreset] = useState<TemplatePreset>(
    shop.templatePreset
  );

  const handleImageUpload = async (
    file: File,
    type: "profile" | "banner"
  ) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar. Maksimal 2MB.");
      return;
    }

    const setUploading =
      type === "profile" ? setUploadingProfile : setUploadingBanner;
    const setImage = type === "profile" ? setProfileImage : setBannerImage;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImage(data.url);
        toast.success("Foto berhasil diupload!");
      } else {
        toast.error(data.error || "Gagal mengupload foto.");
      }
    } catch {
      toast.error("Gagal mengupload foto. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("profileImage", profileImage);
    formData.set("bannerImage", bannerImage);
    formData.set("templatePreset", selectedPreset);

    try {
      const result = await updateShopProfile(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Profil toko berhasil disimpan!");
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informasi Toko */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Toko</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Toko *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={shop.name}
              placeholder="Contoh: Warung Bu Siti"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slogan">Slogan</Label>
            <Textarea
              id="slogan"
              name="slogan"
              defaultValue={shop.slogan || ""}
              placeholder="Contoh: Masakan rumahan terenak se-RT!"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              defaultValue={shop.whatsapp || ""}
              placeholder="Contoh: 6281234567890"
              type="tel"
            />
            <p className="text-xs text-gray-500">
              Masukkan nomor dengan kode negara (62). Contoh: 6281234567890
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Foto Toko */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Foto Toko</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                {uploadingProfile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>
                )}
              </div>
              <div>
                <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, "profile");
                    }}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">Maks. 2MB</p>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="space-y-2">
            <Label>Banner Toko</Label>
            <div className="relative h-32 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Gambar banner toko
                  </span>
                </div>
              )}
              {uploadingBanner && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
            </div>
            <label className="inline-block cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Pilih Banner
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "banner");
                }}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Pilihan Desain */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pilihan Desain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {presetOptions.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                variant="ghost"
                onClick={() => setSelectedPreset(preset.id)}
                className={cn(
                  "group relative flex flex-col items-start justify-start h-auto w-full overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-150 whitespace-normal",
                  selectedPreset === preset.id
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 hover:bg-emerald-50/50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-transparent"
                )}
              >
                {selectedPreset === preset.id && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                {/* Preview Swatch */}
                <div
                  className={cn(
                    "mb-3 flex h-16 items-end gap-1.5 rounded-lg p-2",
                    preset.previewBg
                  )}
                >
                  <div
                    className={cn(
                      "h-3 w-8 rounded-sm",
                      preset.previewAccent
                    )}
                  />
                  <div
                    className={cn(
                      "h-2 w-12 rounded-sm opacity-30",
                      preset.previewAccent
                    )}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {preset.label}
                </span>
                <span className="mt-0.5 text-xs text-gray-500">
                  {preset.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 py-3 text-base font-semibold text-white hover:bg-emerald-700 active:scale-[0.98]"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan Perubahan"
        )}
      </Button>
    </form>
  );
}
