/**
 * Common decoration utilities for MarkdownPreviewer plugins.
 *
 * This module provides utility functions and decorators that can be used by multiple
 * MarkdownPreviewer plugins. It includes functions to create decorations for hiding
 * content (hideRed, hideBlue) and applying monospace font styles (monoFamily). The
 * DecorationPluginWrapper class simplifies creating decorator plugins by managing the
 * decoration setup and update logic.
 *
 * @module commonDecorations
 */

import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"

export const hideRed = Decoration.mark({
  attributes: {
    style: "background-color: red !important; display: none;"
  }
})

export const hideBlue = Decoration.mark({
  attributes: {
    style: "background-color: blue !important; display: none;"
  }
})

export const monoFamily = Decoration.mark({
  attributes: {
    style: "font-family: monospace, sans-serif !important;"
  }
})

type decFuncView = (view: EditorView) => DecorationSet
type askUpdate = (update: ViewUpdate) => boolean
export function DecorationPluginWrapper(func: decFuncView, canUpdate: askUpdate) {
  return ViewPlugin.fromClass(class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = func(view)
    }

    update(update: ViewUpdate) {
      if (canUpdate(update)) {
        this.decorations = func(update.view)
      }
    }
  },
    {
      decorations: instance => instance.decorations
    });
}
