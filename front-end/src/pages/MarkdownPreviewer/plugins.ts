import { Decoration, DecorationSet, Range, ViewPlugin, ViewUpdate } from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import { syntaxTree } from '@codemirror/language'

const hideRed = Decoration.mark({
  attributes: {
    style: "background-color: red !important; display: none;"
  }
})

const hideBlue = Decoration.mark({
  attributes: {
    style: "background-color: blue !important; display: none;"
  }
})

const headerN = (n: number) => Decoration.mark({
  attributes: {
    style: `font-size: ${3 - (2/5)*(n - 1)}em`
  }
})

type liteNode = {
  name: string,
  from: number,
  to: number
}

function resizeHeaders(view: EditorView) {
  const marks: Range<Decoration>[] = []
  for (const {from, to} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter(node) {
        if (!node.name.startsWith("ATXHeading")) {
          return
        }
        const temp = node.name.match(/\d{1}/)?.[0]
        let n = 6

        if (typeof temp === 'string') {
          n = parseInt(temp)
        }

        marks.push(
          headerN(n).range(node.from, node.to)
        )
      },
    })
  }
  return Decoration.set(marks)
}

function hideEmphasisMarkers(view: EditorView) {
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
        nodeBefore = structuredClone({name: node.name, from: node.from, to: node.to})
      },
    })
  }
  return Decoration.set(marks)
}

export const hidePlugin = ViewPlugin.fromClass(class {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = hideEmphasisMarkers(view)
  }

  update(update: ViewUpdate) {
    this.decorations = hideEmphasisMarkers(update.view)
  }

}, {
  decorations: instance => instance.decorations
})

export const resizeHeadersPlugin = ViewPlugin.fromClass(class {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = resizeHeaders(view)
  }

  update(update: ViewUpdate) {
    this.decorations = resizeHeaders(update.view)
  }

}, {
  decorations: instance => instance.decorations
})