"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
      {images.map((src) => (
        <Dialog key={src}>
          <DialogTrigger asChild>
            <button
              type="button"
              onClick={() => setActive(src)}
              className="relative aspect-[16/10] overflow-hidden border border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              <Image
                src={asset(src)}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Gallery image</DialogTitle>
            {active && (
              <Image
                src={asset(active)}
                alt=""
                width={1600}
                height={1000}
                className="object-contain w-auto h-auto max-w-[88vw] max-h-[85vh]"
              />
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}