import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import './style.css'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { useCallback, useState } from 'react'

export default function MarkdownPreview() {
  const [value, setValue] = useState("")
  const onChange = useCallback((val: string, _viewUpdate: ViewUpdate) => {
     setValue(val)
   }, [])
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[
        markdown({ base: markdownLanguage }),
        EditorView.lineWrapping,
        EditorView.theme({
          '.cm-scroller': {
            overflow: 'hidden',
            fontFamily: '"Roboto", sans-serif',
          },
          '.cm-lineNumbers': {
            display: 'none',
          },
          '.cm-gutters': {
            display: 'none',
          },
          '.cm-activeLine': {
            backgroundColor: 'unset',
          },
        })
      ]}
      />
  )
}