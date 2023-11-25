"use client";
import { useState } from "react";
import { MotorcycleSaleOffer } from "./types/motorcycle";
import Image from "next/image";

const mockOffers: MotorcycleSaleOffer[] = [
  {
    brand: "Yamaha",
    description: "Witam, mam do sprzedania nowiutką Yamahę",
    mileageInKm: 10000,
    model: "MT-07",
    priceInPLN: 30000,
    imageLink: "/mt07.webp",
  },
  {
    brand: "Kawasaki",
    description: "Witam, mam do sprzedania nową Kawę",
    mileageInKm: 20000,
    model: "Versys 600",
    priceInPLN: 34000,
    imageLink: "/versys600.webp",
  },
];

export default function Home() {
  const [saleOffers, setSaleOffers] = useState<MotorcycleSaleOffer[]>([
    ...mockOffers,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Oto Motor</h1>

      <div className="flex">
        {saleOffers.map((offer, key) => (
          <div
            className="flex flex-col mr-16 bg-neutral-200 text-black p-8 border-4"
            key={key}
          >
            <div>Cena: {offer.priceInPLN} zł</div>
            <div>Marka: {offer.brand}</div>
            <div>Model: {offer.model}</div>
            <div>Przebieg: {offer.mileageInKm} km</div>
            <div>
              Opis:
              <br />
              <p>{offer.description}</p>
            </div>
            <Image alt="" src={offer.imageLink} width={200} height={200} />
          </div>
        ))}
      </div>
    </main>
  );
}
