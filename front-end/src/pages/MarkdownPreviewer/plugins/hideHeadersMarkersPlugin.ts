/**
 * A MarkdownPreviewer plugin that hides header markers in the editor content.
 *
 * This plugin identifies header marks (such as those preceding headers) using the syntax
 * tree. Once identified, it applies a decoration to hide these markers from view while
 * keeping them part of the document structure.
 *
 * @module hideHeadersMarkersPlugin
 */

import { syntaxTree } from '@codemirror/language'
import { Decoration, EditorView, Range } from '@uiw/react-codemirror'
import { DecorationPluginWrapper, hideBlue } from './commonDecorations'

function hideHeadersMarkers(view: EditorView) {
  const marks: Range<Decoration>[] = []
  const dont: (number | undefined)[] = []
  const cursorPos = view.state.selection.main.head

  const node = syntaxTree(view.state).resolve(cursorPos, 1)
  const ATXHorMark = (node.name.startsWith("ATXHeading") || node.name == "HeaderMark") ?
    node : null

  if (ATXHorMark !== null) {
    const mark = (ATXHorMark.name.startsWith("ATXHeading")) ?
      ATXHorMark.getChild("HeaderMark") : ATXHorMark
    dont.push(mark?.from)
  }

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter(node) {
        if (node.name == "HeaderMark" && !dont.includes(node.from)) {
          marks.push(hideBlue.range(node.from, node.to + 1))
        }
      },
    })
  }

  return Decoration.set(marks)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hideHeadersMarkersPlugin = DecorationPluginWrapper(hideHeadersMarkers, (_update) => true)
