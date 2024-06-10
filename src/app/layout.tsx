import type { Metadata } from "next";
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
      <body className="bg-blue-300">{children}</body>
    </html>
  );
}
