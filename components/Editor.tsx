import styled from "@emotion/styled"
import { EditorState } from "draft-js"
import dynamic from "next/dynamic"
import React, { Dispatch, SetStateAction } from "react"
import { EditorProps } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Button } from "./Button"

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
)

const Wrapper = styled.div`
  padding: 16px;
`

function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: {
  editorState: EditorState
  readOnly?: boolean
  onSave?: () => void
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ["inline", "list", "textAlign", "link"],
        }}
        localization={{
          locale: "ko",
        }}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

export default CustomEditor
