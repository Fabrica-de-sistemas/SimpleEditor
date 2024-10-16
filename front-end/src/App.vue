<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

</script>

<template>
  <h1 class="title">Simple Editor</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/notfound">404</RouterLink>
  </nav>
  <RouterView/>
</template>

<style>
  body {
    background-color: aliceblue;
  }
  
</style>