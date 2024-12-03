import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import './style.css'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'

export default function MarkdownPreview() {
  return (
    <CodeMirror
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