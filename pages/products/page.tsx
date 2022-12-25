import { Pagination } from "@mantine/core"
import { products } from "@prisma/client"
import { CATEGORY_MAP, TAKE } from "constants/product"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"

function Products() {
  const [activePage, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-products-count`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)))

    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items)
      })
  }, [])

  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items)
      })
  }, [activePage])

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
                {CATEGORY_MAP[product.category_id - 1]}
              </span>
            </div>
          )
        })}
      </div>
      <div className="w-full flex mt-5">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  )
}

export default Products
