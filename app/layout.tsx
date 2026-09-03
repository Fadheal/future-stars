import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pengumuman Kandidat | Future Stars",
  description: "Cek hasil seleksi kandidat Future Stars.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
