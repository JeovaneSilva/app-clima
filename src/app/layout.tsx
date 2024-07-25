import type { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});
import "./globals.css";

export const metadata: Metadata = {
  title: "App de clima",
  description: "App de clima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-blue-400">{children}</body>
    </html>
  );
}
