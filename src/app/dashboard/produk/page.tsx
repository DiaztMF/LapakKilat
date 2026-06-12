import { getProducts } from "@/app/actions/product";
import { ProductList } from "./_components/product-list";

export default async function ProdukPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola produk yang ditampilkan di katalog tokomu. Maksimal 20 produk.
        </p>
      </div>

      <ProductList initialProducts={products} />
    </div>
  );
}
