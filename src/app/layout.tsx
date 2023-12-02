import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oto Motor",
  description: "Portal do sprzedaży motocykli i skuterów",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-5xl mb-12">
            <a href="/">Oto Motor</a>
          </h1>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
