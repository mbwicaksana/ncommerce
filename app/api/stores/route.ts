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
    const { userId } = auth(); // Mendapatkan userId dari otentikasi pengguna
    const body = await req.json(); // Mengambil dan mengurai body JSON dari permintaan
    const { name } = body; // Mendestrukturisasi body untuk mendapatkan nama toko

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Jika userId tidak ditemukan, kirim respon "Unauthorized" dengan status 401
    }

    if (!name) {
      return new NextResponse("Store Name Required", { status: 400 }); // Jika nama toko tidak ditemukan di body, kirim respon "Store Name Required" dengan status 400
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

    return NextResponse.json(store); // Mengirim respon JSON berisi data toko yang baru dibuat
  } catch (error) {
    console.log("[STORES_POST]", error); // Jika terjadi error, cetak log error
    return new NextResponse("Internal Error", { status: 500 }); // Kirim respon "Internal Error" dengan status 500
  }
}
