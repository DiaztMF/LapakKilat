"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut, Store, Package, Zap, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

const navItems = [
  {
    href: "/dashboard",
    label: "Ringkasan",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/profil",
    label: "Profil Toko",
    icon: Store,
  },
  {
    href: "/dashboard/produk",
    label: "Produk",
    icon: Package,
  },
];

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">
            Lapak<span className="text-emerald-600">Kilat</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out",
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <span className="max-w-[120px] truncate text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-150 ease-in-out hover:bg-red-50 hover:text-red-600 active:scale-95"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
