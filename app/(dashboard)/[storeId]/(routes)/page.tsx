import { prisma } from "@/lib/prisma";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  // Mencari store yang sesuai dengan storeId
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>; // Menampilkan nama store yang aktif
};

export default DashboardPage;
