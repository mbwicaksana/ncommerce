"use client";

import Modal from "../ui/modal";

export const StoreModal = () => {
  return (
    <Modal
      title="Buat Store"
      description="Tambahkan Store untuk membuat produk dan kategori"
      isOpen={false}
      onClose={() => {}}
    >
      Store Form
    </Modal>
  );
};
