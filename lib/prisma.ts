import { PrismaClient } from "@prisma/client"; // Mengimpor PrismaClient dari @prisma/client

// Mendeklarasikan variabel global untuk PrismaClient agar bisa digunakan di seluruh aplikasi
declare global {
  var prisma: PrismaClient | undefined; // Variabel global prisma bisa berupa PrismaClient atau undefined
}

// Inisialisasi PrismaClient
// Jika globalThis.prisma sudah ada, gunakan yang sudah ada
// Jika tidak, buat instance baru dari PrismaClient
export const prisma = globalThis.prisma || new PrismaClient();

// Jika lingkungan bukan produksi (development), simpan instance PrismaClient ke globalThis
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
