import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oto Motor",
  description: "Portal do sprzedaży motocykli i skuterów",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <h1 className="text-5xl mb-12">
              <a href="/">Oto Motor</a>
            </h1>

            {session && (
              <button className="bg-green-500 p-4 mb-4">
                <a href="/offers/create">Utwórz ofertę +</a>
              </button>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Zalogowany jako {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Wyloguj się" : "Zaloguj się"}
            </Link>
          </div>

          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
