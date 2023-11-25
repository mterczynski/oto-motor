import { MotorcycleSaleOffer } from "../../types/motorcycle";

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET() {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const data = await res.json()

    // return Response.json({ data })

    const data: MotorcycleSaleOffer[] = [
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
    ];

    return Response.json({ data })
}