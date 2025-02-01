/**
 * A MarkdownPreviewer plugin that hides pairs of matching syntax markers.
 *
 * This plugin identifies pairs of matching syntax markers (like opening and closing tags)
 * in the editor content. Once identified, it applies different decorations to each pair,
 * typically hiding them with distinct styles (blue for one, red for the other) to indicate
 * their pairing relationship visually.
 *
 * @module hideMarkersPairsPlugin
 */

import { syntaxTree } from "@codemirror/language"
import { EditorView, Decoration, Range } from "@uiw/react-codemirror"
import { DecorationPluginWrapper, hideBlue, hideRed } from "./commonDecorations"

type liteNode = {
  name: string,
  from: number,
  to: number
}

function hideMarkersPairs(view: EditorView) {
  const marks: Range<Decoration>[] = []
  let nodeBefore: liteNode | null = null
  const cursorPos = view.state.selection.main.head
  for (const { from, to } of view.visibleRanges) {
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
        if ((nodeBefore.from <= cursorPos && cursorPos <= node.to)) {
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
        nodeBefore = structuredClone({ name: node.name, from: node.from, to: node.to })
      },
    })
  }
  return Decoration.set(marks)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hideMarkersPairsPlugin = DecorationPluginWrapper(hideMarkersPairs, (_update) => true)
