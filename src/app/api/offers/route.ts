import { MotorcycleSaleOffer } from "../../types/motorcycle";

const mockOffers: MotorcycleSaleOffer[] = [
    {
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
        brand: "Honda",
        description: "Witam, mam do sprzedania nowy motor",
        mileageInKm: 0,
        model: "Rebel 1100",
        priceInPLN: 80000,
        imageLink: "/rebel_1100.webp",
        location: "Kraków",
        distanceInKm: 3,
    },
];

export async function GET() {

    return Response.json({ data: [...mockOffers, ...mockOffers, ...mockOffers, ...mockOffers] })
}