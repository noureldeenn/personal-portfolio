"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={clsx(
          "fixed left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2",
          "max-w-[92vw] max-h-[90vh] bg-[var(--color-surface)] p-4 md:p-6 shadow-2xl",
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = DialogPrimitive.Title;