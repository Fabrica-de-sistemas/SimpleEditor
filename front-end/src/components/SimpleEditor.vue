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

</script>

<style>
    #SimpleEditor {
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

    .toolbar button {
        margin: 3px;
    }
</style>

<template>
    <span class="toolbar">
        <button>B</button>
        <button>I</button>
        <button>U</button>
    </span>
    <div id="SimpleEditor" :contenteditable="contentditableVar" @input="change()" ref="editor"></div>
    <div>
        <ul>
            <li>caracteres: {{ letters }}</li>
        </ul>
    </div>
</template>