import Image from "next/image";
// import { useState } from "react";
import { getOffers } from "../actions";
import { getDictionary } from "../dictionaries";

const formatNumber = (price: number) => {
  return price.toLocaleString();
};

export default async function Home({ params: { lang } }: any) {
  // const [saleOffers, setSaleOffers] = useState<SaleOffer[]>([]);
  const dict = await getDictionary(lang || "en");

  const saleOffers = await getOffers();

  debugger;
  dict;

  return (
    <main>
      <div className="flex max-w-full flex-wrap gap-16">
        {saleOffers.map((offer, key) => (
          <a
            className="flex flex-col bg-neutral-200 text-black p-8 border-4"
            key={key}
            href={`/offers?offerId=${offer.id}`}
          >
            {offer.imageLink && (
              <Image alt="" src={offer.imageLink} width={200} height={200} />
            )}
            <div>Cena: {formatNumber(offer.priceInPLN)} zł</div>
            <div>Marka: {offer.brand}</div>
            <div>Model: {offer.model}</div>
            <div>
              Lokacja: {offer.location}, {offer.distanceInKm}
            </div>
            <div>Przebieg: {formatNumber(offer.mileageInKm)} km</div>
            <div>Utworzono: {offer?.createdAt?.toDateString()}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
