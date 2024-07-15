"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname(); // Mendapatkan path saat ini
  const params = useParams(); // Mendapatkan parameter dari URL

  const routes = [
    // Membuat array routes dengan properti href, label, dan active
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {/* Kelas untuk styling navbar */}
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary", // Kelas umum untuk link
            route.active
              ? "text-black dark:text-white" // Kelas untuk link yang aktif
              : "text-muted-foreground", // Kelas untuk link yang tidak aktif
          )}
        >
          {route.label} {/* Menampilkan label dari route */}
        </Link>
      ))}
    </nav>
  );
}
