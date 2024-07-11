"use client";

import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

/**
 * Type PopoverTriggerProps yang merupakan properti dari PopoverTrigger
 */
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

/**
 * Interface StoreSwitcherProps yang memperluas PopoverTriggerProps
 * dan menambahkan properti items yang merupakan array dari objek Store
 */
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal(); // Mendapatkan hook useStoreModal
  const params = useParams(); // Mendapatkan parameter dari URL
  const router = useRouter(); // Mendapatkan router

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  })); // Memformat items menjadi array objek dengan label dan value

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  ); // Mencari store saat ini berdasarkan params.storeId

  const [open, setOpen] = useState(false); // State untuk mengatur apakah popover terbuka atau tidak

  /**
   * Fungsi untuk menangani pemilihan store
   * @param {Object} store - Objek store yang dipilih
   * @param {string} store.value - Id store
   * @param {string} store.label - Nama store
   */
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false); // Menutup popover
    router.push(`/${store.value}`); // Navigasi ke store yang dipilih
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Pilih Toko"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Cari Toko" />
            <CommandEmpty>Toko Tidak Ditemukan</CommandEmpty>
            <CommandGroup heading="Toko">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" /> Buat Toko
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
