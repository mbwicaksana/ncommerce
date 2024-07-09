/**
 * Import modul auth dari paket @clerk/nextjs untuk otentikasi pengguna
 * Import NextResponse dari paket next/server untuk mengirim respon HTTP
 * Import prisma dari library prisma lokal
 */
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Fungsi async yang menangani permintaan POST
 * @param {Request} req - Objek permintaan
 * @returns {NextResponse} - Respon HTTP
 */
export async function POST(req: Request) {
  try {
    // Mendapatkan userId dari otentikasi pengguna
    const { userId } = auth();
    // Mengambil dan mengurai body JSON dari permintaan
    const body = await req.json();
    // Mendestrukturisasi body untuk mendapatkan nama toko
    const { name } = body;

    // Jika userId tidak ditemukan, kirim respon "Unauthorized" dengan status 401
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Jika nama toko tidak ditemukan di body, kirim respon "Store Name Required" dengan status 400

    if (!name) {
      return new NextResponse("Store Name Required", { status: 400 });
    }

    /**
     * Membuat entri baru untuk toko di database menggunakan prisma
     * @param {Object} data - Data toko yang akan dibuat
     * @param {string} data.name - Nama toko
     * @param {string} data.userId - Id pengguna
     * @returns {Object} store - Data toko yang baru dibuat
     */
    const store = await prisma.store.create({
      data: {
        name, // Nama toko
        userId, // Id pengguna
      },
    });

    // Mengirim respon JSON berisi data toko yang baru dibuat
    return NextResponse.json(store);
  } catch (error) {
    // Jika terjadi error, cetak log error dan kirim respon "Internal Error" dengan status 500
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
