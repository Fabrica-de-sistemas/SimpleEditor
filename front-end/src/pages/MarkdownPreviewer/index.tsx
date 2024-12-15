import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { useCallback, useState } from 'react'
import { hidePlugin, resizeHeadersPlugin } from './plugins'
import './style.css'

export default function MarkdownPreview() {

  const [value, setValue] = useState("")
  const onChange = useCallback((value: string, _viewUpdate: ViewUpdate) => {
    setValue(value)
  }, [])
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[
        markdown({ base: markdownLanguage }),
        hidePlugin,
        resizeHeadersPlugin,
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