
import { NextRequest } from "next/server"
import { mockOffers } from "../route"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return Response.json({
    data: mockOffers
      .find(offer => {
        return offer.id === params.id
      })
  })
}
