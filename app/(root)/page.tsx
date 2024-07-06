"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    // Pengaturan ModalProvider di layout.tsx diatur disini
    // Jika Modal tertutup, maka buka modalnya
    // Kondisi ini menyebabkan modal tidak bisa tertutup karena user wajib membuat store baru
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4">Root Page</div>;
};

export default SetupPage;
