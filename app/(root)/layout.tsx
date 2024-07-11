import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth(); // Mendapatkan userId dari auth
  if (!userId) {
    redirect("sign-in"); // Jika tidak ada userId, redirect ke halaman sign-in
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  }); // Mencari store yang sesuai dengan userId

  if (store) {
    redirect(`/${store.id}`); // Jika store ditemukan, redirect ke halaman store
  }

  return <>{children}</>; // Mengembalikan children jika tidak ada store
}
