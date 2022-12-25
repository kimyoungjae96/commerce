// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

async function getProducts() {
  try {
    const response = await prisma.products.findMany()
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
    const products = await getProducts()
    res.status(200).json({ items: products, message: "Success" })
  } catch (e) {
    return res.status(400).json({ message: "Failed" })
  }
}
