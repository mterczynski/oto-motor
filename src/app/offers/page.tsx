"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { SaleOffer } from "../types/saleOffer";
import { useSearchParams } from "next/navigation";
import { deleteOfferById, getOfferById } from "../actions";

const formatNumber = (price: number) => {
  return price?.toLocaleString();
};

export default function OfferDetails() {
  const searchParams = useSearchParams();
  const [offer, setOffer] = useState<SaleOffer | null>(null);
  const [isLoading, setLoading] = useState(true);
  const onDeleteButtonClick = useCallback(() => {
    if (!offer) {
      return;
    }
    try {
      // todo - redirect to offers, show a notification that offer was deleted successfully
      deleteOfferById(offer.id);
    } catch (error) {
      // todo - show alert with a proper error message
    }
  }, [offer]);

  useEffect(() => {
    const offerId = searchParams.get("offerId");

    getOfferById(Number(offerId)).then((offer) => {
      setOffer(offer);
      setLoading(false);
    });
  }, [searchParams]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : offer ? (
        <div className="flex flex-col bg-neutral-200 text-black p-8 border-4">
          {offer.imageLink && (
            <Image alt="" src={offer.imageLink} width={200} height={200} />
          )}
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

          <button
            onClick={onDeleteButtonClick}
            className="bg-red-900 text-white"
          >
            Usuń ofertę
          </button>
        </div>
      ) : (
        `Offer with id ${searchParams.get("offerId")} not found`
      )}
    </>
  );
}
