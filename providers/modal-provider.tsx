"use client"; // Direktif ini menunjukkan bahwa kode ini dijalankan di sisi klien (browser).

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // set isMounted menjadi true jika ModalProvider dipanggil di client component
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Jika ModalProvider dipanggil di server component, maka return null
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
