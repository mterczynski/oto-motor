import { NextRequest } from "next/server";
import { MotorcycleSaleOffer } from "../../types/motorcycle";

// todo - consider moving to a separate file
export const mockOffers: MotorcycleSaleOffer[] = [
  {
    id: "133d642b-8871-4c91-a5ae-b2a957a8c5f7",
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
    id: "7df45ec3-e907-4994-8591-33f0ef163c26",
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
    id: "9c43b077-4f40-4a7c-95dd-6a8ac59b14fc",
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
    id: "388f50a6-e808-4e9d-9db9-5a1b7bea560d",
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
    id: "2957817b-ffed-49ce-98da-e6ef4201e1ab",
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
    id: "8407bb54-6ab4-4add-acf8-901979dcbb9b",
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
    id: "4df981c4-40ab-455c-8bbf-2ef1e4b402fd",
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
    id: "823b0543-1890-40e1-a515-1944c14e65a1",
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
            return offer.id === offerIdFromParams
          } else {
            return true
          }
        })
  })
}
