"use client";

import { useState } from "react";
import { updateShopProfile } from "@/app/actions/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { presetOptions, type TemplatePreset } from "@/lib/template-presets";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Camera, Loader2, Check, Trash2, Eye, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { StorefrontPreview } from "./storefront-preview";
import { QrCodeSection } from "./qr-code-section";

interface Shop {
  id: string;
  slug: string;
  name: string;
  slogan: string | null;
  whatsapp: string | null;
  profileImage: string | null;
  bannerImage: string | null;
  templatePreset: "fresh" | "playful" | "minimalist";
  primaryColor: string;
  isPublished: boolean;
  operationalHours?: string | null;
  address?: string | null;
  googleMapsUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  faq?: { question: string; answer: string }[] | null;
}

export function ProfilForm({ shop }: { shop: Shop }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Interactive Live Preview State
  const [name, setName] = useState(shop.name || "");
  const [slogan, setSlogan] = useState(shop.slogan || "");
  const [whatsapp, setWhatsapp] = useState(shop.whatsapp || "");
  const [profileImage, setProfileImage] = useState(shop.profileImage || "");
  const [bannerImage, setBannerImage] = useState(shop.bannerImage || "");
  const [selectedPreset, setSelectedPreset] = useState<TemplatePreset>(
    shop.templatePreset
  );
  const [primaryColor, setPrimaryColor] = useState(shop.primaryColor || "#059669");
  const [operationalHours, setOperationalHours] = useState(shop.operationalHours || "");
  const [address, setAddress] = useState(shop.address || "");
  const [googleMapsUrl, setGoogleMapsUrl] = useState(shop.googleMapsUrl || "");
  const [instagramUrl, setInstagramUrl] = useState(shop.instagramUrl || "");
  const [facebookUrl, setFacebookUrl] = useState(shop.facebookUrl || "");
  const [tiktokUrl, setTiktokUrl] = useState(shop.tiktokUrl || "");
  const [faqList, setFaqList] = useState<{ question: string; answer: string }[]>(shop.faq || []);

  // Sidebar Tabs State
  const [activeSidebarTab, setActiveSidebarTab] = useState<"preview" | "qrcode">("preview");

  const handlePresetSelect = (preset: TemplatePreset) => {
    setSelectedPreset(preset);
    if (preset === "fresh") setPrimaryColor("#059669");
    else if (preset === "playful") setPrimaryColor("#fb7185");
    else if (preset === "minimalist") setPrimaryColor("#18181b");
  };

  const handleImageUpload = async (
    file: File,
    type: "profile" | "banner"
  ) => {
    const setUploading =
      type === "profile" ? setUploadingProfile : setUploadingBanner;
    const setImage = type === "profile" ? setProfileImage : setBannerImage;

    setUploading(true);
    try {
      let fileToUpload = file;
      
      if (file.size > 2 * 1024 * 1024) {
        const { default: imageCompression } = await import('browser-image-compression');
        toast.info("Mengkompresi gambar...", { id: "compress-toast" });
        
        try {
          fileToUpload = await imageCompression(file, {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });
          toast.dismiss("compress-toast");
        } catch (error) {
          toast.dismiss("compress-toast");
          toast.error("Gagal mengkompresi gambar.");
          setUploading(false);
          return;
        }
      }

      if (fileToUpload.size > 2.5 * 1024 * 1024) {
        toast.error("Ukuran file masih terlalu besar. Maksimal 2MB.");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

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

  // Auto-formatter for WhatsApp number
  const formatWhatsAppNumber = (num: string): string => {
    let cleaned = num.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    } else if (cleaned.length > 0 && !cleaned.startsWith("62")) {
      cleaned = "62" + cleaned;
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("profileImage", profileImage);
    formData.set("bannerImage", bannerImage);
    formData.set("templatePreset", selectedPreset);
    formData.set("primaryColor", primaryColor);
    formData.set("whatsapp", whatsapp);
    formData.set("operationalHours", operationalHours);
    formData.set("address", address);
    formData.set("googleMapsUrl", googleMapsUrl);
    formData.set("instagramUrl", instagramUrl);
    formData.set("facebookUrl", facebookUrl);
    formData.set("tiktokUrl", tiktokUrl);
    formData.set("faq", JSON.stringify(faqList));

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
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Form Area */}
      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
        {/* Informasi Toko */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Informasi Toko</CardTitle>
            <CardDescription>
              Ubah rincian dasar dan informasi kontak tokomu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Toko</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Warung Bu Siti"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slogan">Slogan</Label>
              <Textarea
                id="slogan"
                name="slogan"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="Contoh: Masakan rumahan terenak se-RT!"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                onBlur={(e) => setWhatsapp(formatWhatsAppNumber(e.target.value))}
                placeholder="Contoh: 6281234567890"
                type="tel"
              />
            </div>
          </CardContent>
        </Card>

        {/* Foto Toko */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Visual Toko</CardTitle>
            <CardDescription>
              Unggah logo/foto profil dan banner untuk mempercantik storefront tokomu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image */}
            <div className="space-y-3">
              <Label>Foto Profil / Logo</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-6 w-6 text-gray-400" />
                  )}
                  {uploadingProfile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all active:scale-95">
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
                    {profileImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setProfileImage("")}
                        className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-100 h-8 px-2.5 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Hapus
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">Maks. ukuran file 2MB (JPG, PNG, WEBP)</p>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <Label>Banner Toko</Label>
                {bannerImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setBannerImage("")}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 px-2.5 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Hapus Banner
                  </Button>
                )}
              </div>
              <div className="relative h-32 w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">
                      Dimensi rekomendasi: 800x400 piksel
                    </span>
                  </div>
                )}
                {uploadingBanner && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all active:scale-95">
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

        {/* Pengaturan FAQ Toko */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Pertanyaan yang Sering Diajukan (FAQ)</CardTitle>
            <CardDescription>
              Tambahkan pertanyaan dan jawaban khusus yang sering diajukan pembeli tokomu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqList.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <p className="text-sm text-gray-500 font-medium">Belum ada FAQ khusus.</p>
                <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto px-4">
                  Bagian FAQ tidak akan ditampilkan pada halaman katalog Anda jika Anda tidak menambahkan pertanyaan khusus di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqList.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-xl bg-gray-50/30 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Pertanyaan #{index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          const updated = [...faqList];
                          updated.splice(index, 1);
                          setFaqList(updated);
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent h-8 px-2 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Hapus
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Pertanyaan</Label>
                      <Input
                        value={item.question}
                        onChange={(e) => {
                          const updated = [...faqList];
                          updated[index].question = e.target.value;
                          setFaqList(updated);
                        }}
                        placeholder="Contoh: Apakah bisa kirim ke luar kota?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Jawaban</Label>
                      <Textarea
                        value={item.answer}
                        onChange={(e) => {
                          const updated = [...faqList];
                          updated[index].answer = e.target.value;
                          setFaqList(updated);
                        }}
                        placeholder="Contoh: Ya, kami bisa mengirim ke seluruh kota di Indonesia melalui ekspedisi partner."
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFaqList([...faqList, { question: "", answer: "" }]);
              }}
              className="w-full border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 cursor-pointer h-10 text-xs font-semibold"
            >
              + Tambah Pertanyaan Baru
            </Button>
          </CardContent>
        </Card>

        {/* Detail Operasional & Kontak Tambahan */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Operasional, Lokasi & Sosial Media</CardTitle>
            <CardDescription>
              Informasi tambahan untuk pembeli di halaman tokomu (opsional).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="operationalHours">Jam Operasional</Label>
                <Input
                  id="operationalHours"
                  name="operationalHours"
                  value={operationalHours}
                  onChange={(e) => setOperationalHours(e.target.value)}
                  placeholder="Senin - Sabtu, 10.00 - 21.00 WIB"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Singkat</Label>
                <Input
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Banjarsari, Surakarta"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Tautan Google Maps</Label>
              <Input
                id="googleMapsUrl"
                name="googleMapsUrl"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram Username</Label>
                <Input
                  id="instagramUrl"
                  name="instagramUrl"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="username_ig"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook Username</Label>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="username_fb"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktokUrl">TikTok Username</Label>
                <Input
                  id="tiktokUrl"
                  name="tiktokUrl"
                  value={tiktokUrl}
                  onChange={(e) => setTiktokUrl(e.target.value)}
                  placeholder="username_tiktok"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pilihan Desain */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tema & Warna Katalog</CardTitle>
            <CardDescription>
              Sesuaikan identitas visual halaman katalog tokomu agar menarik bagi pembeli.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Grid */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Preset Desain</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {presetOptions.map((preset) => (
                  <Button
                    key={preset.id}
                    type="button"
                    variant="ghost"
                    onClick={() => handlePresetSelect(preset.id)}
                    className={cn(
                      "group relative flex flex-col items-start justify-start h-auto w-full overflow-hidden rounded-xl border-2 p-3.5 text-left transition-all duration-150 whitespace-normal cursor-pointer",
                      selectedPreset === preset.id
                        ? "border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/20 hover:bg-emerald-50/20"
                        : "border-gray-100 hover:border-gray-200 hover:bg-transparent"
                    )}
                  >
                    {selectedPreset === preset.id && (
                      <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-sm animate-in zoom-in-50">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    {/* Preview Swatch */}
                    <div
                      className={cn(
                        "mb-3 flex h-14 items-end gap-1 rounded-lg p-2.5 w-full shadow-inner border border-black/5",
                        preset.previewBg
                      )}
                    >
                      <div
                        className={cn(
                          "h-2.5 w-6 rounded-xs",
                          preset.previewAccent
                        )}
                      />
                      <div
                        className={cn(
                          "h-1.5 w-8 rounded-xs opacity-40",
                          preset.previewAccent
                        )}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-900 leading-tight">
                      {preset.label}
                    </span>
                    <span className="mt-1 text-[10px] text-gray-400 leading-normal line-clamp-2">
                      {preset.description}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Picker Section */}
            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div>
                <Label className="text-sm font-semibold">Warna Aksen Utama</Label>
                <p className="text-xs text-gray-400 mt-0.5">
                  Warna dominan untuk tombol beli, teks link, dan aksen sorotan pada katalog.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { value: "#059669", label: "Hijau" },
                  { value: "#fb7185", label: "Pink" },
                  { value: "#3b82f6", label: "Biru" },
                  { value: "#8b5cf6", label: "Ungu" },
                  { value: "#f59e0b", label: "Jingga" },
                  { value: "#18181b", label: "Hitam" },
                ].map((swatch) => (
                  <button
                    key={swatch.value}
                    type="button"
                    onClick={() => setPrimaryColor(swatch.value)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/80 shadow-xs transition-all active:scale-90 hover:scale-105 cursor-pointer",
                      primaryColor === swatch.value && "ring-2 ring-emerald-500 ring-offset-2"
                    )}
                    style={{ backgroundColor: swatch.value }}
                    title={swatch.label}
                  >
                    {primaryColor === swatch.value && (
                      <Check className={cn(
                        "h-3.5 w-3.5",
                        swatch.value === "#fb7185" || swatch.value === "#f59e0b" ? "text-gray-900" : "text-white"
                      )} />
                    )}
                  </button>
                ))}


                {/* Custom Color Input */}
                <div className="flex items-center gap-2 border-l border-gray-150 pl-3.5 ml-1">
                  <div
                    className="h-8 w-8 rounded-full border border-gray-200/80 shadow-xs relative overflow-hidden flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                    />
                    {!["#059669", "#fb7185", "#3b82f6", "#8b5cf6", "#f59e0b", "#18181b"].includes(primaryColor) && (
                      <Check className="h-3.5 w-3.5 text-white mix-blend-difference" />
                    )}
                  </div>
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-7 w-20 text-[10px] font-mono px-2"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] cursor-pointer h-12"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan Perubahan...
            </>
          ) : (
            "Simpan Profil Toko"
          )}
        </Button>
      </form>

      {/* Sidebar Panel: Live Preview & QR Code */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border border-gray-100 shadow-sm overflow-hidden sticky top-6">
          <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/30">
            {/* Custom Premium Tabs Selector */}
            <div className="flex border border-gray-200/60 p-0.5 rounded-lg bg-gray-100/60">
              <button
                type="button"
                onClick={() => setActiveSidebarTab("preview")}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                  activeSidebarTab === "preview"
                    ? "bg-white text-gray-900 shadow-xs border border-gray-200/30 font-bold"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                Live Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveSidebarTab("qrcode")}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                  activeSidebarTab === "qrcode"
                    ? "bg-white text-gray-900 shadow-xs border border-gray-200/30 font-bold"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <QrCode className="h-3.5 w-3.5" />
                QR Code
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {activeSidebarTab === "preview" ? (
              <StorefrontPreview
                name={name}
                slogan={slogan}
                whatsapp={whatsapp}
                profileImage={profileImage}
                bannerImage={bannerImage}
                preset={selectedPreset}
                primaryColor={primaryColor}
                slug={shop.slug}
                operationalHours={operationalHours}
                address={address}
                googleMapsUrl={googleMapsUrl}
                instagramUrl={instagramUrl}
                facebookUrl={facebookUrl}
                tiktokUrl={tiktokUrl}
                faq={faqList}
              />
            ) : (
              <QrCodeSection slug={shop.slug} isPublished={shop.isPublished} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
