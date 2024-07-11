"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen); // Ambil fungsi onOpen dari Hook useStoreModal()
  const isOpen = useStoreModal((state) => state.isOpen); // Ambil state isOpen dari Hook useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen(); // Jika modal tertutup, buka modal
    }
  }, [isOpen, onOpen]); // Menggunakan useEffect untuk memantau perubahan pada isOpen dan onOpen

  return null;
};

export default SetupPage;
