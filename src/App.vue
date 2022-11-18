<script setup lang="ts">
import Headline from "@/views/Headline.vue";
</script>

<template>
    <Headline />
    <Suspense>
        <router-view />
        <template #fallback>

            Loading...

        </template>
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

