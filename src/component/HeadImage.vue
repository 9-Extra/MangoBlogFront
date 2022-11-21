<script setup lang="ts">
import type { User } from '@/utils/user_util';

const props = defineProps<{
    user: User | null
}>()

let head_image_url = "./default_head_image.jpeg"
if (props.user && props.user.headImageUrl){
    head_image_url = props.user.headImageUrl
}

</script>

<template>
    <img v-if="user != null" :src="head_image_url" />
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
  