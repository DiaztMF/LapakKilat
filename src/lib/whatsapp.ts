import { formatRupiah } from "./utils";

interface CartItemForMessage {
  name: string;
  quantity: number;
  price: number;
}

/**
 * Compile WhatsApp checkout message dari cart items.
 * Menghasilkan URL deep link wa.me yang siap dibuka.
 */
export function compileWhatsAppCheckout({
  shopName,
  shopWhatsapp,
  buyerName,
  items,
}: {
  shopName: string;
  shopWhatsapp: string;
  buyerName: string;
  items: CartItemForMessage[];
}): string {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} x${item.quantity} — ${formatRupiah(item.price * item.quantity)}`
    )
    .join("\n");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = `Halo *${shopName}*, saya *${buyerName}* mau memesan:

${itemLines}

*Total: ${formatRupiah(total)}*

Terima kasih! 🙏`;

  // Normalize nomor WhatsApp: hapus leading 0, tambahkan 62
  const cleanNumber = shopWhatsapp
    .replace(/\D/g, "")
    .replace(/^0/, "62")
    .replace(/^\+/, "");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
