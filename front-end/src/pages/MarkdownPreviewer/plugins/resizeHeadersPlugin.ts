/**
 * A MarkdownPreviewer plugin that adjusts the font size for headers based on their level.
 *
 * This plugin identifies ATX-style headers (like #, ##) using the syntax tree. It
 * then calculates an appropriate font size for each header level and applies this
 * styling to enhance the visual hierarchy of headers in the document.
 *
 * @module resizeHeadersPlugin
 */

import { syntaxTree } from "@codemirror/language"
import { Decoration, EditorView, Range } from "@uiw/react-codemirror"
import { DecorationPluginWrapper } from "./commonDecorations"

const headerN = (n: number) => Decoration.mark({
  attributes: {
    style: `font-size: ${2 - (1 / 5) * (n - 1)}em`
  }
})

function resizeHeaders(view: EditorView) {
  const marks: Range<Decoration>[] = []
  for (const { from, to } of view.visibleRanges) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const resizeHeadersPlugin = DecorationPluginWrapper(resizeHeaders, (_update) => true)
