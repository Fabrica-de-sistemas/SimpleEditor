<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

</script>

<template>
  <h1>Simple Editor</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/notfound">404</RouterLink>
  </nav>
  <RouterView/>
  <!--<div id="app">
    <SimpleEditor></SimpleEditor>
  </div>-->
</template>
