/**
 * A MarkdownPreviewer plugin that applies monospace font styling to code elements.
 *
 * This plugin identifies fenced code blocks and inline code within the editor content
 * using the syntax tree. Once identified, it applies a monospace font style to these
 * elements to improve code readability.
 *
 * @module codeMonoPlugin
 */

import { syntaxTree } from "@codemirror/language"
import { EditorView, Decoration, Range } from "@uiw/react-codemirror"
import { DecorationPluginWrapper, monoFamily } from "./commonDecorations"

function codeMono(view: EditorView) {
  const marks: Range<Decoration>[] = []
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from, to,
      enter: (node) => {
        if (!['FencedCode', 'CodeText', 'InlineCode'].includes(node.name)) {
          return
        }
        if (node)
          marks.push(monoFamily.range(node.from, node.to))
      },
    })
  }
  return Decoration.set(marks)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const codeMonoPlugin = DecorationPluginWrapper(codeMono, (_update) => true)
