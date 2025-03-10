import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudySync",
  description: "Calhacks 2024 StudySync Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">{children}</body>
    </html>
  );
}
