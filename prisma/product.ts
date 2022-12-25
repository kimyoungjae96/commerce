import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const productData1: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(10)
).map((_, index) => ({
  name: `Category1 ${index + 1}`,
  contents:
    '{"blocks":[{"key":"fea4t","text":"1234","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: 1,
  image_url: "https://picsum.photos/id/4/250/150/",
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

const productData2: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(10)
).map((_, index) => ({
  name: `Category2 ${index + 1}`,
  contents:
    '{"blocks":[{"key":"fea4t","text":"1234","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: 2,
  image_url: "https://picsum.photos/id/3/250/150/",
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

const productData3: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(10)
).map((_, index) => ({
  name: `Category3 ${index + 1}`,
  contents:
    '{"blocks":[{"key":"fea4t","text":"1234","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: 3,
  image_url: "https://picsum.photos/id/1/250/150/",
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

const productData4: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(10)
).map((_, index) => ({
  name: `Category4 ${index + 1}`,
  contents:
    '{"blocks":[{"key":"fea4t","text":"1234","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: 4,
  image_url: "https://picsum.photos/id/2/250/150/",
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

const productData5: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(10)
).map((_, index) => ({
  name: `Category5 ${index + 1}`,
  contents:
    '{"blocks":[{"key":"fea4t","text":"1234","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: 5,
  image_url: "https://picsum.photos/id/5/250/150/",
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

async function main() {
  await prisma.products.deleteMany()

  for (const p of productData1) {
    const product = await prisma.products.create({
      data: p,
    })
  }

  for (const p of productData2) {
    const product = await prisma.products.create({
      data: p,
    })
  }

  for (const p of productData3) {
    const product = await prisma.products.create({
      data: p,
    })
  }

  for (const p of productData4) {
    const product = await prisma.products.create({
      data: p,
    })
  }

  for (const p of productData5) {
    const product = await prisma.products.create({
      data: p,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
