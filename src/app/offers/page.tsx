"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MotorcycleSaleOffer } from "../types/motorcycle";
import { useSearchParams } from "next/navigation";

const formatNumber = (price: number) => {
  return price?.toLocaleString();
};

export default function OfferDetails() {
  const searchParams = useSearchParams();
  const [offer, setOffer] = useState<MotorcycleSaleOffer | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const offerId = searchParams.get("offerId");
    fetch(`/api/offers?offerId=${offerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (Array.isArray(data.data)) {
          setOffer(data.data[0]);
        }
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl mb-12">Oto Motor</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : offer ? (
        <div className="flex flex-col bg-neutral-200 text-black p-8 border-4">
          <Image alt="" src={offer.imageLink} width={200} height={200} />
          <div>Cena: {formatNumber(offer.priceInPLN)} zł</div>
          <div>Marka: {offer.brand}</div>
          <div>Model: {offer.model}</div>
          <div>
            Lokacja: {offer.location}, {offer.distanceInKm} km
          </div>
          <div>Przebieg: {formatNumber(offer.mileageInKm)} km</div>
          <div>
            Opis:
            <br />
            <p>{offer.description}</p>
          </div>
        </div>
      ) : (
        `Offer with id ${searchParams.get("offerId")} not found`
      )}
    </main>
  );
}
