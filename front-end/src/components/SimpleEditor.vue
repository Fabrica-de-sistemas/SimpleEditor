<script setup lang="ts">
import { ref } from 'vue';
const contentditableVar = "plaintext-only" // ref("plaintext-only")

function onInp(foo: any) {
    console.log(foo);
}

</script>

<style>
    #SimpleEditor {
        border: 1px solid black;
        border-radius: 14px;
        width: 80vw;
        height: 80vh;
        padding: 6px;
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
    <div id="SimpleEditor" :contenteditable="contentditableVar" :on-change="onInp"></div>
</template>