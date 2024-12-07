import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import './style.css'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { useCallback, useState } from 'react'
import { RegExpCursor } from '@codemirror/search'


const rules = [
  String.raw`\*{2}(.+?)\*{2}|_{2}(.+?)_{2}`, // "Bold"
  String.raw`^(#{1,6})\s+(.+)$`, // "Headers"
  // String.raw`\*{1}(.+?)\*{1}|_{1}(.+?)_{1}`, // "Italic"
  String.raw`~{2}(.+?)~{2}`, // "Strikethrough"
  // "`{1}(.+?)`{1}", // "Inlinecode"
]


export default function MarkdownPreview() {

  const [value, setValue] = useState("")
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setValue(value)
    console.log(viewUpdate.state.selection.main.head)
    for (const rule of rules){
      const cursor = new RegExpCursor(viewUpdate.state.doc, rule)
      for (const c of cursor) {
        console.log(c)
      }
    }
  }, [])
  const onSelect = useCallback(()=>{},[])
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      onSelect={onSelect}
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
        }),
      ]}
      />
  )
}