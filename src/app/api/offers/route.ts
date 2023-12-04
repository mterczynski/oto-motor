import { NextRequest } from "next/server";
import { SaleOffer } from "../../types/saleOffer";

// todo - consider moving to a separate file
export const mockOffers: SaleOffer[] = [
  {
    id: 0,
    brand: "Yamaha",
    description: "Witam, mam do sprzedania nowiutką Yamahę",
    mileageInKm: 10000,
    model: "MT-07",
    priceInPLN: 30000,
    imageLink: "/mt07.webp",
    location: "Kraków",
    distanceInKm: 5,
  },
  {
    id: 1,
    brand: "Kawasaki",
    description: "Witam, mam do sprzedania nową Kawę",
    mileageInKm: 20000,
    model: "Versys 600",
    priceInPLN: 34000,
    imageLink: "/versys600.webp",
    location: "Wieliczka",
    distanceInKm: 15,
  },
  {
    id: 2,
    brand: "Piaggio",
    description: "Sprzedam skuter po ojcu, szybki i zwinny",
    mileageInKm: 45000,
    model: "X9 500",
    priceInPLN: 8000,
    imageLink: "/x9_500.jpg",
    location: "Wieliczka",
    distanceInKm: 15,
  },
  {
    id: 3,
    brand: "Yamaha",
    description: "Nowa Yamaha, spełnij swoje marzenia",
    mileageInKm: 0,
    model: "MT-03",
    priceInPLN: 29000,
    imageLink: "/mt-03.jpg",
    location: "Katowice",
    distanceInKm: 80,
  },
  {
    id: 4,
    brand: "Honda",
    description: "Witam, mam do sprzedania nowy motor",
    mileageInKm: 28000,
    model: "CB 500X",
    priceInPLN: 34000,
    imageLink: "/cb_500x.jpg",
    location: "Kraków",
    distanceInKm: 7,
  },
  {
    id: 5,
    brand: "Honda",
    description: "Witam, mam do sprzedania nowy motor",
    mileageInKm: 0,
    model: "Rebel 1100",
    priceInPLN: 80000,
    imageLink: "/rebel_1100.webp",
    location: "Kraków",
    distanceInKm: 3,
  },
  {
    id: 6,
    brand: "Yamaha",
    description: "Nowa Yamaha, spełnij swoje marzenia",
    mileageInKm: 0,
    model: "MT-03",
    priceInPLN: 30000,
    imageLink: "/mt-03.jpg",
    location: "Kraków",
    distanceInKm: 3,
  },
  {
    id: 7,
    brand: "Suzuki",
    description: "Stary, ale jary",
    mileageInKm: 65000,
    model: "GN 125",
    priceInPLN: 3000,
    imageLink: "/gn-125.jpg",
    location: "Kraków",
    distanceInKm: 3,
  },
];

export async function GET(req: NextRequest) {
  return Response.json({
    data:
      [...mockOffers, ...mockOffers, ...mockOffers, ...mockOffers]
        .filter(offer => {
          const offerIdFromParams = req.nextUrl.searchParams.get('offerId')
          if (offerIdFromParams) {
            return offer.id.toString() === offerIdFromParams
          } else {
            return true
          }
        })
  })
}
