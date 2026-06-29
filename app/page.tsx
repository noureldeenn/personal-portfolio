"use client";

import { useEffect } from "react";

// Static export has no middleware/server redirect, so the locale entry point
// is reached client-side. Sends "/" to the default locale ("/en/").
const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/en/`;

export default function RootPage() {
  useEffect(() => {
    window.location.replace(target);
  }, []);

  return null;
}
