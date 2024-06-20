import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Click here
      </Link>
    </div>
  );
}
