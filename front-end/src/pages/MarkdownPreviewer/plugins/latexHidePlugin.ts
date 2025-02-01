/**
 * A MarkdownPreviewer plugin that hides LaTeX mathematical expressions from view.
 *
 * This plugin scans the editor content for LaTeX tags such as InlineMathDollar,
 * InlineMathBracket, BlockMathDollar, and BlockMathBracket. For each tag found, it
 * applies a red background decoration to hide the content visually while keeping it in
 * the document structure.
 *
 * @module latexHidePlugin
 */

import { Decoration } from "@codemirror/view"
import { EditorView, Range } from '@uiw/react-codemirror'
import { syntaxTree } from '@codemirror/language'
import { DecorationPluginWrapper, hideRed } from './commonDecorations'

const LATEX_TAGS = ["InlineMathDollar", "InlineMathBracket", "BlockMathDollar", "BlockMathBracket"]

function latexHide(view: EditorView) {
  const marks: Range<Decoration>[] = []
  const cursorPos = view.state.selection.main.head
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter: (node) => {
        if (!LATEX_TAGS.includes(node.type.name)) {
          return
        }
        if ((node.from <= cursorPos && cursorPos <= node.to)) {
          return
        }
        marks.push(
          hideRed.range(node.from, node.to)
        )
      },
    })
  }
  return Decoration.set(marks)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const latexHidePlugin = DecorationPluginWrapper(latexHide, (_update) => true)
