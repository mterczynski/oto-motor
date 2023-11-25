"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MotorcycleSaleOffer } from "./types/motorcycle";

const formatNumber = (price: number) => {
  return price.toLocaleString();
};

export default function Home() {
  const [saleOffers, setSaleOffers] = useState<MotorcycleSaleOffer[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setSaleOffers(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl mb-12">Oto Motor</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex max-w-full flex-wrap gap-16">
          {saleOffers.map((offer, key) => (
            <div
              className="flex flex-col bg-neutral-200 text-black p-8 border-4"
              key={key}
            >
              <Image alt="" src={offer.imageLink} width={200} height={200} />
              <div>Cena: {formatNumber(offer.priceInPLN)} zł</div>
              <div>Marka: {offer.brand}</div>
              <div>Model: {offer.model}</div>
              <div>
                Lokacja: {offer.location}, {offer.distanceInKm} km
              </div>
              <div>Przebieg: {formatNumber(offer.mileageInKm)} km</div>
              {/* <div>
              Opis:
              <br />
              <p>{offer.description}</p>
            </div> */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
