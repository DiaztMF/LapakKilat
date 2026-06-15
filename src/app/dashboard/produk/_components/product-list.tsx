"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/utils";
import { 
  Plus, 
  Package, 
  Pencil, 
  Trash2, 
  Search, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff,
  AlertTriangle
} from "lucide-react";
import { ProductFormDialog } from "./product-form-dialog";
import { 
  deleteProduct, 
  toggleProductAvailability, 
  reorderProducts 
} from "@/app/actions/product";
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Search and Category filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Custom Delete Modal State
  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  // Reordering loading state
  const [sorting, setSorting] = useState(false);

  // Sync state if initialProducts changes (e.g. after Dialog closes or server mutations)
  const [prevInitialProducts, setPrevInitialProducts] = useState<Product[]>(initialProducts);
  if (initialProducts !== prevInitialProducts) {
    setProducts(initialProducts);
    setPrevInitialProducts(initialProducts);
  }

  // Extract unique categories
  const categories = Array.from(
    new Set(initialProducts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProductTarget) return;

    setDeleting(true);
    try {
      const result = await deleteProduct(deleteProductTarget.id);
      if (result.success) {
        toast.success(`Produk "${deleteProductTarget.name}" berhasil dihapus!`);
        setDeleteProductTarget(null);
        router.refresh();
      }
    } catch {
      toast.error("Gagal menghapus produk.");
    } finally {
      setDeleting(false);
    }
  };

  // Toggle ketersediaan langsung di card
  const handleToggleAvailability = async (productId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // Optimistic UI update
    setProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, isAvailable: newStatus } : p)
    );

    try {
      const result = await toggleProductAvailability(productId, newStatus);
      if (result.success) {
        toast.success(
          newStatus 
            ? "Produk sekarang tersedia di storefront." 
            : "Produk ditandai tidak tersedia."
        );
        router.refresh();
      } else {
        // Rollback on failure
        setProducts(initialProducts);
        toast.error("Gagal mengubah ketersediaan.");
      }
    } catch {
      setProducts(initialProducts);
      toast.error("Gagal mengubah ketersediaan.");
    }
  };

  // Move Product Up/Down in Sort Order
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (sorting) return;
    
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= products.length) return;

    setSorting(true);
    const updatedProducts = [...products];
    // Swap items
    const temp = updatedProducts[index];
    updatedProducts[index] = updatedProducts[newIndex];
    updatedProducts[newIndex] = temp;

    // Local update
    setProducts(updatedProducts);

    try {
      const ids = updatedProducts.map(p => p.id);
      const result = await reorderProducts(ids);
      if (result.success) {
        toast.success("Urutan produk berhasil disimpan!");
        router.refresh();
      } else {
        setProducts(initialProducts);
        toast.error("Gagal mengurutkan produk.");
      }
    } catch {
      setProducts(initialProducts);
      toast.error("Gagal mengurutkan produk.");
    } finally {
      setSorting(false);
    }
  };

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top action & metrics bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Badge
          variant="secondary"
          className="w-fit bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-semibold border border-emerald-100/50"
        >
          {initialProducts.length}/{MAX_PRODUCTS} Produk Aktif
        </Badge>
        
        <Button
          onClick={handleCreate}
          disabled={initialProducts.length >= MAX_PRODUCTS}
          className="bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-transform"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Search and Category Filter Card */}
      {initialProducts.length > 0 && (
        <Card className="p-4 border-gray-100 shadow-sm space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari produk berdasarkan nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50/50 border-gray-200"
            />
          </div>

          {/* Category filter pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
                Kategori:
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Product Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-6 py-16 text-center border-dashed border-gray-200">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            <Package className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {initialProducts.length === 0 ? "Belum ada produk" : "Produk tidak ditemukan"}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {initialProducts.length === 0 
              ? "Tambahkan produk pertamamu untuk mulai berjualan di katalog online." 
              : "Coba gunakan kata kunci pencarian atau kategori filter yang lain."}
          </p>
          
          {initialProducts.length === 0 && (
            <Button
              onClick={handleCreate}
              className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk Pertama
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className={`group overflow-hidden transition-all duration-300 border-gray-100 hover:shadow-md hover:border-gray-200/80 ${
                !product.isAvailable && "opacity-80"
              }`}
            >
              {/* Product Image & Overlays */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-16 w-16 text-gray-300" />
                  </div>
                )}
                
                {/* Availability Overlay */}
                {!product.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                    <Badge variant="secondary" className="bg-red-500 text-white border-none text-xs font-semibold px-2.5 py-1">
                      Tidak Tersedia
                    </Badge>
                  </div>
                )}

                {/* Sort Order Action overlay */}
                {searchQuery === "" && !selectedCategory && (
                  <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-lg shadow-sm border border-gray-100 p-1">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0 || sorting}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Geser Ke Atas"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === products.length - 1 || sorting}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Geser Ke Bawah"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Category Badge */}
                {product.category && (
                  <div className="absolute left-2 top-2">
                    <Badge className="bg-white/95 backdrop-blur-md text-gray-800 hover:bg-white border-none shadow-sm text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {product.category}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="truncate font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-base font-extrabold text-emerald-600">
                    {formatRupiah(product.price)}
                  </p>
                  {product.description && (
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Inline Availability Switch */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    {product.isAvailable ? (
                      <>
                        <Eye className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Tampil di Toko</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5 text-gray-400" />
                        <span>Disembunyikan</span>
                      </>
                    )}
                  </div>
                  <Switch
                    checked={product.isAvailable}
                    onCheckedChange={() => handleToggleAvailability(product.id, product.isAvailable)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1 border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-transform text-xs"
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
                    Edit Detail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteProductTarget(product)}
                    className="border-red-100 hover:border-red-200 hover:bg-red-50 hover:text-red-600 text-red-500 active:scale-[0.98] transition-transform"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
      />

      {/* Custom Delete Confirmation Dialog */}
      <Dialog 
        open={!!deleteProductTarget} 
        onOpenChange={(open) => !open && setDeleteProductTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 mb-2">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">Hapus Produk?</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 max-w-[280px]">
              Apakah Anda yakin ingin menghapus produk <strong>&ldquo;{deleteProductTarget?.name}&rdquo;</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteProductTarget(null)}
              disabled={deleting}
              className="flex-1 sm:flex-none"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
