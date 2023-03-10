// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

async function getProducts(skip: number, take: number) {
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  message: string
  items?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take } = req.query

  if (skip === null || take === null) {
    res.status(400).json({ message: "no skip or take" })
  }

  try {
    const products = await getProducts(Number(skip), Number(take))
    res.status(200).json({ items: products, message: "Success" })
  } catch (e) {
    return res.status(400).json({ message: "Failed" })
  }
}
