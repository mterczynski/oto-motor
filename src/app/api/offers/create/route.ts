
import { NextRequest } from "next/server"
import { mockOffers } from "../route"
import { NextApiRequest } from "next"

export async function POST(req: NextRequest) {
  // todo - create offer, add it to database, return it

  const createdOffer = req.body // todo

  return Response.json({
    data: createdOffer
  })
}
