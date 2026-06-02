import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | BDI Corporate",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <main className="text-center py-20"><h1>404 — Page Not Found</h1></main>;
}