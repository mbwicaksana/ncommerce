import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth(); // Mendapatkan userId dari auth

  if (!userId) {
    redirect("sign-in"); // Jika tidak ada userId, redirect ke halaman sign-in
  }

  const store = await prisma.store.findFirst({
    // Mencari store yang sesuai dengan storeId dan userId
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/"); // Jika store tidak ditemukan, redirect ke halaman utama
  }

  return (
    <>
      <Navbar /> {/* Mengembalikan layout dengan Navbar */}
      {children} {/* dan children */}
    </>
  );
}
