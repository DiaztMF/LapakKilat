"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { Plus, Package, Pencil, Trash2 } from "lucide-react";
import { ProductFormDialog } from "./product-form-dialog";
import { deleteProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image: string | null;
  isAvailable: boolean;
}

const MAX_PRODUCTS = 20;

export function ProductList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    setDeleting(productId);
    try {
      const result = await deleteProduct(productId);
      if (result.success) {
        toast.success("Produk berhasil dihapus!");
        router.refresh();
      }
    } catch {
      toast.error("Gagal menghapus produk.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-700"
        >
          {initialProducts.length}/{MAX_PRODUCTS} Produk
        </Badge>
        <Button
          onClick={handleCreate}
          disabled={initialProducts.length >= MAX_PRODUCTS}
          className="bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Product Grid */}
      {initialProducts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Belum ada produk
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Tambahkan produk pertamamu untuk mulai berjualan di katalog online.
          </p>
          <Button
            onClick={handleCreate}
            className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk Pertama
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initialProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all duration-150 hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                {!product.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Badge variant="secondary" className="bg-white text-gray-700">
                      Tidak Tersedia
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    {product.category && (
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-gray-100 text-xs text-gray-600"
                      >
                        {product.category}
                      </Badge>
                    )}
                  </div>
                  <span className="shrink-0 text-base font-bold text-emerald-600">
                    {formatRupiah(product.price)}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    <Pencil className="mr-1.5 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
      />
    </div>
  );
}
