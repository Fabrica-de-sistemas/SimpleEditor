<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
const contentditableVar = "plaintext-only" // ref("plaintext-only")

const editor = useTemplateRef("editor")
const letters = ref(0)
const preview = ref("")

const renderRules: [RegExp, string][] = [
    [/\*\*(.+?)\*\*|__(.+?)__/g,    "<span class=\"bold markdown\">$1$2</span>"         ],  //bold
    [/\*(.+?)\*|_(.+?)_|__(.+?)__/g, "<span class=\"italic markdown\">$1$2$3</span>"    ],  //italic
    [/~~(.+?)~~/g,                  "<span class=\"strike markdown\">$1$2</span>"       ],  //strike
    [/`(.+?)`/g,                    "<span class=\"inlinecode markdown\">`$1`</span>"   ],  //inline code
    [/(\r\n|\r|\n)/g,               "<br>$1"                                            ],  //break line
    [/^(#{1})\s+(.+)$/m,            "<h1 class=\"markdown\">$2</h1>"                    ],  //h1
    [/^(#{2})\s+(.+)$/m,            "<h2 class=\"markdown\">$2</h2>"                    ],  //h2
    [/^(#{3})\s+(.+)$/m,            "<h3 class=\"markdown\">$2</h3>"                    ],  //h3
    [/^(#{4})\s+(.+)$/m,            "<h4 class=\"markdown\">$2</h4>"                    ],  //h4
    [/^(#{5})\s+(.+)$/m,            "<h5 class=\"markdown\">$2</h5>"                    ],  //h5
    [/^(#{6})\s+(.+)$/m,            "<h6 class=\"markdown\">$2</h6>"                    ],  //h6
]

const reverseRules: [RegExp, string][] = [
        [/<span class="bold markdown">(.*?)<\/span>/g,          "**$1**"    ],  //bold
        [/<span class="italic markdown">(.*?)<\/span>/g,        "*$1*"      ],  //italic
        [/<span class="strike markdown">(.*?)<\/span>/g,        "~~$1~~"    ],  //strike
        [/<span class="inlinecode markdown">`(.*?)`<\/span>/g,  "`$1`"      ],  //inline code
        [/<br>/g,                                               "\n"        ],  //break line
        [/<h1 class="markdown">(.*?)<\/h1>/g,                   "# $1"      ],  //h1
        [/<h2 class="markdown">(.*?)<\/h2>/g,                   "## $1"     ],  //h2
        [/<h3 class="markdown">(.*?)<\/h3>/g,                   "### $1"    ],  //h3
        [/<h4 class="markdown">(.*?)<\/h4>/g,                   "#### $1"   ],  //h4
        [/<h5 class="markdown">(.*?)<\/h5>/g,                   "##### $1"  ],  //h5
        [/<h6 class="markdown">(.*?)<\/h6>/g,                   "##### $1"  ],  //h6
]

class Markdown {
    text: string
    constructor(text: string) {
        this.text = text
    }

    render(): string {
        let res = this.text

        for (const [rule, template] of renderRules) {
            res = res.replace(rule, template)
        }

        return res
    }

    reverse(element: HTMLElement): string {
        let mark = element.innerHTML

        for (const [rule, template] of reverseRules) {
            mark = mark.replace(rule, template)
        }

        return mark
    }
}

function change() {
    if (editor.value instanceof HTMLElement) {
        const edit = document.querySelector("#SimpleEditor")
        if (edit instanceof HTMLElement) {
            const mark = new Markdown("")
            mark.text = mark.reverse(edit)
            preview.value = mark.render()
        }
        const content = editor.value.textContent
        if (content != null) {
            letters.value = content.length
        }
    }
}
</script>

<style>
    #SimpleEditor {
        background-color: white;
        border: 1px solid black;
        border-radius: 14px;
        width: 80vw;
        height: 80vh;
        padding: 6px;
        text-overflow: clip;
        overflow-y: scroll;
    }

    .toolbar {
        display: flex;
        flex-direction: row;
        background-color: gray;
        border-radius: 12px;
        padding: 6px;
        height: 32px;
        justify-content: flex-start;
        align-items: center;
        max-width: 80vw;
        border: 1px solid darkgray;
    }

    .EditorContainer {
        background-color: darkgray;
        border-radius: 12px;
        margin: 5px;
    }

    .toolbar button {
        margin: 3px;
    }

    .bolder {
        font-weight: bolder;
    }

    .bold {
        font-weight: bolder;
    }

    .italic {
        font-style: italic;
    }

    .strike {
        text-decoration: line-through;
    }

    .inlinecode {
        font-family: monospace, monospace;
    }
</style>

<template>
    <div class="EditorContainer">
        <span class="toolbar">
            <button><span style="font-weight: bolder;">B</span></button>
            <button><span style="font-style: italic;">I</span></button>
            <button><span style="text-decoration: underline;">U</span></button>
            <button><span style="text-decoration: none;">C</span></button>
            <div>modo visualização<input type="checkbox"></div>
        </span>
        <div id="SimpleEditor" :contenteditable="contentditableVar" @input="change()" ref="editor"></div>
        <div class="preview" v-html="preview"></div>
        <div>
            <ul>
                <li>caracteres: {{ letters }}</li>
            </ul>
        </div>
    </div>
</template>