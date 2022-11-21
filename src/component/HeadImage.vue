<script setup lang="ts">
import api from '@/utils/axios_blog';

const props = defineProps<{
    head_image_url: string | undefined
}>()

let head_image_url = props.head_image_url? api.getUri() + "/image/download" + props.head_image_url : "./default_head_image.jpeg"

</script>

<template>
    <img :src="head_image_url" />
</template>

<style scoped>
img {
    border-radius: 50%;
    height: 5vh;
    width: 5vh;
    object-fit: cover;
    object-position: center;
    border: 1px solid wheat;
}
</style>
  