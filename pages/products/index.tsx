import { products } from "@prisma/client"
import { TAKE } from "constants/product"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"

function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items)
      })
  }, [])

  const getProducts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
        setSkip(next)
      })
  }, [skip, products])

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="grid grid-cols-3 gap-5">
        {products?.map((product) => {
          return (
            <div key={product.id}>
              <Image
                className="rounded"
                key={product.id}
                src={product.image_url ?? ""}
                width={300}
                height={300}
                alt=""
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8X8VQDwAF8wH6Xswr3gAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{product.name}</span>
                <span className="ml-auto">
                  {product.price.toLocaleString("ko-KR")}원
                </span>
              </div>
              <span className="text-zinc-400">
                {product.category_id === 1 && "의류"}
              </span>
            </div>
          )
        })}
      </div>
      <button
        className="w-full rounded mt-20 bg-zinc-400 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  )
}

export default Products
