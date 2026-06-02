"use client";
import { SITE } from "@/lib/site";

export const metadata = { title: `Error | ${SITE.name}`, robots: { index: false, follow: false } };

export default function ErrorPage() {
  return <main className="text-center py-20"><h1>500 — Server Error</h1></main>;
}
