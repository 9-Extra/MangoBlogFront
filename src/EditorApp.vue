<script setup lang="ts">
import EditorVue from './component/Editor.vue';
</script>

<template>
    <Suspense>
        <EditorVue/>
    </Suspense>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
}
</style>

