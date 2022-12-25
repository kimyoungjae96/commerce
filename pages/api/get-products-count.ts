// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

async function getProductsCount() {
  try {
    const response = await prisma.products.count()
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
  try {
    const products = await getProductsCount()
    res.status(200).json({ items: products, message: "Success" })
  } catch (e) {
    return res.status(400).json({ message: "Failed" })
  }
}
