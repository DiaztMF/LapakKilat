"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createProduct, updateProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image: string | null;
  isAvailable: boolean;
}

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: ProductFormDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [isAvailable, setIsAvailable] = useState(product?.isAvailable ?? true);

  const isEditing = !!product;

  // Sinkronisasi state ketika dialog dibuka atau produk yang dipilih berubah
  useEffect(() => {
    if (open) {
      setImageUrl(product?.image || "");
      setIsAvailable(product?.isAvailable ?? true);
    } else {
      // Optional: reset when closing
      if (!product) {
        setImageUrl("");
        setIsAvailable(true);
      }
    }
  }, [open, product]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  const handleImageUpload = async (file: File) => {
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
        setImageUrl(data.url);
        toast.success("Foto produk berhasil diupload!");
      } else {
        toast.error(data.error || "Gagal mengupload foto.");
      }
    } catch {
      toast.error("Gagal mengupload foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl);
    formData.set("isAvailable", String(isAvailable));

    if (isEditing) {
      formData.set("productId", product.id);
    }

    try {
      const result = isEditing
        ? await updateProduct(formData)
        : await createProduct(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          isEditing
            ? "Produk berhasil diperbarui!"
            : "Produk berhasil ditambahkan!"
        );
        onOpenChange(false);
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Produk" : "Tambah Produk"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto Produk */}
          <div className="space-y-2">
            <Label>Foto Produk</Label>
            <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Produk"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Foto produk (1:1)
                  </span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
            </div>
            <label className="mx-auto block w-fit cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Pilih Foto
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </label>
          </div>

          {/* Nama Produk */}
          <div className="space-y-2">
            <Label htmlFor="product-name">Nama Produk *</Label>
            <Input
              id="product-name"
              name="name"
              defaultValue={product?.name || ""}
              placeholder="Contoh: Nasi Goreng Spesial"
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="product-description">Deskripsi</Label>
            <Textarea
              id="product-description"
              name="description"
              defaultValue={product?.description || ""}
              placeholder="Contoh: Nasi goreng dengan topping telur dan ayam"
              rows={2}
            />
          </div>

          {/* Harga */}
          <div className="space-y-2">
            <Label htmlFor="product-price">Harga (Rp) *</Label>
            <Input
              id="product-price"
              name="price"
              type="number"
              min="0"
              defaultValue={product?.price || ""}
              placeholder="Contoh: 15000"
              required
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label htmlFor="product-category">Kategori</Label>
            <Input
              id="product-category"
              name="category"
              defaultValue={product?.category || ""}
              placeholder="Contoh: Makanan Berat"
            />
            <p className="text-xs text-gray-500">
              Ketik nama kategori bebas. Akan muncul sebagai tab filter di
              katalog.
            </p>
          </div>

          {/* Tersedia */}
          {isEditing && (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <Label htmlFor="product-available" className="cursor-pointer">
                Produk Tersedia
              </Label>
              <Switch
                id="product-available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : isEditing ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Produk"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
