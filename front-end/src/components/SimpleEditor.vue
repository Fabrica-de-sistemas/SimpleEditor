<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
const contentditableVar = "plaintext-only" // ref("plaintext-only")

const editor = useTemplateRef("editor")
const letters = ref(0)

function change() {
    if (editor.value instanceof HTMLElement) {
        const content = editor.value.textContent
        if (content != null) {
            letters.value = content.length
        }
    }
}

function bolder() {
    const sel = window.getSelection()
    if (sel instanceof Selection) {
        const range = sel.getRangeAt(0)
        const text = range.toString()
        range.deleteContents()
        const span = document.createElement("span")
        span.style.fontWeight = "bolder"
        span.textContent = text
        range.insertNode(span)
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