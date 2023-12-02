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
    fetch(`/api/offers/${offerId}`)
      .then((res) => res.json())
      .then((data) => {
        setOffer(data.data);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <>
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
    </>
  );
}
