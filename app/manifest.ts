import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Replaces the old static `public/manifest.webmanifest` so brand fields come
// from env vars (`NEXT_PUBLIC_BRAND_NAME`, etc.) rather than being hardcoded
// to BDI Corporate.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.brand,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
