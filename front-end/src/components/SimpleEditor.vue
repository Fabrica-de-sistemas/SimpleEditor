<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
const contentditableVar = "plaintext-only" // ref("plaintext-only")

const editor = useTemplateRef("editor")
const letters = ref(0)

class Markdown {
    text: string
    constructor(text: string) {
        this.text = text
    }

    render(): string {
        let res = this.text
        const bold = /\*\*(.+?)\*\*|__(.+?)__/g
        const italic = /\*(.+?)\*|_(.+?)___(.+?)__/g
        const strike = /~~(.+?)~~/g
        const inlineCode = /`(.+?)`/g
        const h1 = /^(#{1,1})\s+(.+)$/m
        const h2 = /^(#{2,2})\s+(.+)$/m
        const h3 = /^(#{3,3})\s+(.+)$/m
        const h4 = /^(#{4,4})\s+(.+)$/m
        const h5 = /^(#{5,5})\s+(.+)$/m
        const h6 = /^(#{6,6})\s+(.+)$/m

        res = res.replace(bold, "<span class=\"bold markdown\">$1$2</span>")
        res = res.replace(italic, "<span class=\"italic markdown\">$1$2</span>")
        res = res.replace(strike, "<span class=\"strike markdown\">$1$2</span>")
        res = res.replace(inlineCode, "<span class=\"inlinecode markdown\">`$1`</span>")
        res = res.replace(h1, "<h1 class=\"markdown\">$2</h1>")
        res = res.replace(h2, "<h2 class=\"markdown\">$2</h2>")
        res = res.replace(h3, "<h3 class=\"markdown\">$2</h3>")
        res = res.replace(h4, "<h4 class=\"markdown\">$2</h4>")
        res = res.replace(h5, "<h5 class=\"markdown\">$2</h5>")
        res = res.replace(h6, "<h6 class=\"markdown\">$2</h6>")

        return res
    }

    reverse(element: HTMLElement): string {
        let mark = element.innerHTML

        //const generic = /<[^<]+>(.+?)<\/[^<]+>/g
        //const generic1 = /<(\w+)\s*(.*?)>(.*?)<\/\1>/g
        const bold = /<span class="bold markdown">(.*?)<\/span>/g
        const italic = /<span class="italic markdown">(.*?)<\/span>/g
        const strike = /<span class="strike markdown">(.*?)<\/span>/g
        const inlineCode = /<span class="inlinecode markdown">`(.*?)`<\/span>/g
        const h1 = /<h1 class="markdown">(.*?)<\/h1>/g
        const h2 = /<h2 class="markdown">(.*?)<\/h2>/g
        const h3 = /<h3 class="markdown">(.*?)<\/h3>/g
        const h4 = /<h4 class="markdown">(.*?)<\/h4>/g
        const h5 = /<h5 class="markdown">(.*?)<\/h5>/g
        const h6 = /<h6 class="markdown">(.*?)<\/h6>/g
                
        mark = mark.replace(bold, "**$1**")
        mark = mark.replace(italic, "*$1*")
        mark = mark.replace(strike, "~~$1~~")
        mark = mark.replace(inlineCode, "`$1`")
        mark = mark.replace(h1, "# $1")
        mark = mark.replace(h2, "## $1")
        mark = mark.replace(h3, "### $1")
        mark = mark.replace(h4, "#### $1")
        mark = mark.replace(h5, "##### $1")
        mark = mark.replace(h6, "###### $1")
        //mark = mark.replace(generic, "1$")
        return mark
    }
}

function change() {
    if (editor.value instanceof HTMLElement) {
        const edit = document.querySelector("#SimpleEditor")
        if (edit instanceof HTMLElement) {
            const mark = new Markdown("")
            mark.text = mark.reverse(edit)

            const sel = document.getSelection()
            if (sel instanceof Selection) {
                const range = sel.getRangeAt(0)
                const node = range.startContainer
                edit.innerHTML = mark.render()
                range.setStart(node, 0)
            }



        }
        const content = editor.value.textContent
        if (content != null) {
            letters.value = content.length
        }
    }
}

function unwrap(el: HTMLElement): void {
    const container = el.parentElement
    if (container instanceof HTMLElement) {
        const html = el.innerHTML
        const node = document.createTextNode(html)
        el.after(node)
        el.remove()
    }
}

document.addEventListener("selectionchange", (_event) => {
    const sel = document.getSelection()
    if (sel instanceof Selection) {
        const range = sel.getRangeAt(0)
        const container = range.startContainer.parentElement
        console.log("32");
        
        if (container?.classList.contains("bolder")) {
            container.dispatchEvent(new Event("customFocus"))
            console.log(container.innerHTML);
            
        }
    }
})

function bolder() {
    return;
    const sel = window.getSelection()
    if (sel instanceof Selection) {
        const range = sel?.getRangeAt(0)
        const text = range?.toString()
        range?.deleteContents()
        const span = document.createElement("span")
        span.classList.add("bolder")
        range?.insertNode(span)
        span.innerText = `${text}`

        const blurHandler = () => {
            const node = document.getSelection()?.getRangeAt(0)?.startContainer
            if (node instanceof Node) {
                if (!node.parentElement?.isSameNode(span)) {
                    span.dispatchEvent(new Event("customBlur"))
                }
            }
        }

        span.addEventListener("customFocus", (_event) => {
            // span.classList.remove("bolder")
            const offset = document.getSelection()?.getRangeAt(0).startOffset
            if (!(span.innerText.startsWith("**") && span.innerText.endsWith("**"))) {
                span.innerHTML = `**${span.innerHTML}**`
                if (offset != undefined) {
                    const range = document.getSelection()?.getRangeAt(0)
                    const cont = range?.startContainer
                    if (cont instanceof Node) {
                        range?.setStart(cont, 0)
                        //range?.collapse(true)
                    }
                }

                document.addEventListener("selectionchange", blurHandler)
                console.log("BOLDER ON", offset);
            }
        })

        span.addEventListener("customBlur", (_event) => {
            console.log("customBlur");
            
            if (span.innerText.length >= 4) {
                if (span.innerText.startsWith("**") && span.innerText.endsWith("**")) {
                    if (span.innerHTML.startsWith("**")) {
                        span.innerHTML = span.innerHTML.substring(2)
                    }
                    if (span.innerHTML.endsWith("**")) {
                        span.innerHTML = span.innerHTML.substring(0, span.innerHTML.length - 2)
                    }
                    console.log("BOLDER OFF");
                    
                }
            }
            document.removeEventListener("selectionchange", blurHandler)
        })
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
            <button @click="bolder()"><span style="font-weight: bolder;">B</span></button>
            <button><span style="font-style: italic;">I</span></button>
            <button><span style="text-decoration: underline;">U</span></button>
            <button><span style="text-decoration: none;">C</span></button>
        </span>
        <div id="SimpleEditor" :contenteditable="contentditableVar" @input="change()" ref="editor"></div>
        <div>
            <ul>
                <li>caracteres: {{ letters }}</li>
            </ul>
        </div>
    </div>
</template>