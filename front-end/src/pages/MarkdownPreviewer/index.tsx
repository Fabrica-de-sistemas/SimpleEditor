import CodeMirror, { Decoration, DecorationSet, Range, ViewPlugin, ViewUpdate } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { EditorView } from '@uiw/react-codemirror'
import { syntaxTree } from '@codemirror/language'
import { useCallback, useState } from 'react'
//import { SyntaxNodeRef } from '@lezer/common'
import './style.css'

const hideRed = Decoration.mark({
  attributes: {
    style: "background-color: red !important;"
  }
})

const hideBlue = Decoration.mark({
  attributes: {
    style: "background-color: blue !important;"
  }
})
type liteNode = {
  name: string,
  from: number,
  to: number
}

function hideMarkers(view: EditorView) {
  const marks: Range<Decoration>[] = []
  let nodeBefore: liteNode | null = null
  const pos = view.state.selection.main.head
  for (const {from, to} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter: (node) => {
        if (!node.name.endsWith("Mark")) {
          return
        }
        if (nodeBefore == null) {
          return
        }
        if (nodeBefore.name !== node.name) {
          return
        }
        if ((nodeBefore.from <= pos && pos <= node.to)) {
          return
        }
        if (nodeBefore.from == node.to) {
          return
        }

        marks.push(
          hideBlue.range(nodeBefore.from, nodeBefore.to),
          hideRed.range(node.from, node.to)
        )
      },
      leave(node) {
        if (!node.name.endsWith("Mark")) {
          return
        }
        if (nodeBefore !== null) {
          if (node.from === nodeBefore.from) {
            return
          }
        }
        console.log(nodeBefore, nodeBefore?.from, {name:node.name, from:node.from, to:node.to}, node.from == nodeBefore?.from, 'leave')
        nodeBefore = structuredClone({name: node.name, from: node.from, to: node.to})
      },
    })
  }
  return Decoration.set(marks)
}

const hidePlugin = ViewPlugin.fromClass(class {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = hideMarkers(view)
  }

  update(update: ViewUpdate) {
    this.decorations = hideMarkers(update.view)
  }

}, {
  decorations: instance => instance.decorations
})

export default function MarkdownPreview() {

  const [value, setValue] = useState("")
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setValue(value)
    hideMarkers(viewUpdate.view)
  }, [])
  const onSelect = useCallback(()=>{},[])
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      extensions={[
        markdown({ base: markdownLanguage }),
        hidePlugin,
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