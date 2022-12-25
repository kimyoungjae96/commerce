import CustomEditor from "@components/Editor"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ImageGallery from "react-image-gallery"

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
]

function Products() {
  const router = useRouter()
  const { id: productId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )

  useEffect(() => {
    if (productId !== undefined) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [router.query])

  return (
    <>
      <ImageGallery items={images} />
      {editorState !== undefined && (
        <CustomEditor editorState={editorState} readOnly />
      )}
    </>
  )
}

export default Products
