// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

async function updateProduct(id: number, contents: string) {
  try {
    const response = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        contents,
      },
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
  const { id, contents } = JSON.parse(req.body)

  if (id === null || contents === null) {
    res.status(400).json({ message: "no id or contents" })
    return
  }

  try {
    const products = await updateProduct(Number(id), contents)
    res.status(200).json({ items: products, message: "Success" })
  } catch (e) {
    return res.status(400).json({ message: "Failed" })
  }
}
