"use client"; // Menandakan bahwa ini adalah komponen client-side

/**
 * Import hooks dan komponen yang diperlukan
 */
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Skema form menggunakan zod untuk validasi
 */
const formSchema = z.object({
  name: z.string().min(1),
});

/**
 * Komponen StoreModal
 * @returns {JSX.Element} - Komponen Modal untuk membuat store
 */
export const StoreModal = () => {
  // State untuk mengelola loading
  const [loading, setLoading] = useState(false);
  // Menggunakan hook useStoreModal untuk mengelola modal
  const storeModal = useStoreModal();

  /**
   * Fungsi yang akan dipanggil saat form disubmit
   * @param {Object} values - Nilai form
   * @returns {Promise<void>}
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // Set loading ke true saat permintaan sedang diproses
      const response = await axios.post("/api/stores", values); // Mengirim permintaan POST ke API untuk membuat store
      console.log(response.data); // Mencetak respons data ke konsol
      toast.success("Berhasil membuat toko"); // Menampilkan toast sukses
    } catch (error) {
      toast.error("Gagal membuat toko"); // Menampilkan toast error
    } finally {
      setLoading(false); // Set loading ke false setelah permintaan selesai
    }
    console.log(values); // Mencetak nilai form ke konsol
  };

  /**
   * Menggunakan useForm dari react-hook-form dengan zod resolver untuk validasi
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", // Nilai default untuk nama store
    },
  });

  return (
    /**
     * Menampilkan modal dengan title, description, isOpen, dan onClose
     * Mengirim isOpen dan onClose ke komponen Modal menggunakan value dari hook useStoreModal
     */
    <Modal
      title="Buat Store"
      description="Tambahkan Store untuk membuat produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Toko"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
