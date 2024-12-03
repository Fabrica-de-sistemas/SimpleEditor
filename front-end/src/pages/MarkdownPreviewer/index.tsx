import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'

export default function MarkdownPreview() {
  return (
    <CodeMirror
      extensions={[
        markdown({ base:markdownLanguage }),
        EditorView.lineWrapping,
      ]}
      />
  )
}