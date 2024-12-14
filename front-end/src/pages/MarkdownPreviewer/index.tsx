import CodeMirror, { Decoration, Range, ViewUpdate } from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import './style.css'

import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { useCallback, useState } from 'react'
import { syntaxTree } from '@codemirror/language'
import { SyntaxNodeRef } from '@lezer/common'

const hideMark = Decoration.mark({
  attributes: {
    style: "color: red"
  }
})


function hide(view: EditorView) {
  const marks: Range<Decoration>[] = []
  let nodeBefore: SyntaxNodeRef | null = null
  for (const {from, to} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter: (node) => {
        //console.log(node, node.name)
        const pos = view.state.selection.main.head
        /*console.log(node.type, node.name, node.node, view.state.doc.sliceString(node.from, node.to), 'TREE: ', node.tree, pos)
        if (node.name == "StrongEmphasis" || node.name == "Emphasis") {
          if (pos <= node.to && node.from <= pos) {
            //console.log(`i'm here! pos: ${pos}; from: ${node.from}; to: ${node.to}`, node.name, node.tree)
          } else {
            marks.push(hideMark.range(node.from, node.to))
          }
          //console.log(node.type, view.state.doc.sliceString(node.from, node.to), node.tree)
          }*/
        if (!node.name.endsWith("Mark")) {
          nodeBefore = node
          return
        }
        if (nodeBefore == null) {
          nodeBefore = node
          return
        }
        if (nodeBefore.name !== node.name) {
          nodeBefore = node
          return
        }
        if (nodeBefore.from <= pos && pos <= node.to) {
          nodeBefore = node
          return
        }
        marks.push(
          hideMark.range(nodeBefore.from, nodeBefore.to),
          hideMark.range(node.from, node.to)
        )
        nodeBefore = node
      },
    })
  }
  return marks
}
/*
const addDecor = StateEffect.define<{from: number, to: number}>({
  map: ({from, to}, change) => ({
    from: change.mapPos(from), to: change.mapPos(to)
  })
})*/

export default function MarkdownPreview() {

  const [value, setValue] = useState("")
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setValue(value)
    console.log(viewUpdate.state.selection.main.head)
    hide(viewUpdate.view)
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