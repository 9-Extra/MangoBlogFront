<script setup lang="ts">
import Blogs from "@/views/Blogs.vue";
import Pageswitch from "@/views/Pageswitch.vue";
import { ref, reactive } from "vue"
let pagenum = ref(0);
</script>

<template>
    <Blogs v-model:modelValue="pagenum"></Blogs>
    <Pageswitch v-model:modelValue="pagenum"></Pageswitch>
</template>

<style>

</style>

