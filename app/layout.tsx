import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Search from "./components/search";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies",
  description: "Mark C. Movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Search />
        {children}
      </body>
    </html>
  );
}
