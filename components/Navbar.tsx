import { auth, UserButton } from "@clerk/nextjs";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    // Batas bawah untuk navbar
    <div className="border-b">
      {/* Container flex dengan tinggi 16 dan padding horizontal 4 */}
      <div className="flex h-16 items-center px-4">
        {/* Komponen untuk mengganti toko */}
        <StoreSwitcher items={stores} />
        {/* Komponen navigasi utama dengan margin horizontal 6 */}
        <MainNav className="mx-6" />
        {/* Container flex untuk user button dengan margin kiri otomatis dan spasi horizontal 4 */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Tombol user yang mengarahkan ke halaman utama setelah sign out */}{" "}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
