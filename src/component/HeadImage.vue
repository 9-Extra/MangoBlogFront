<script setup lang="ts">
import { get_user_information } from "@/utils/user_util";
import { ref } from "vue"
import api from "@/utils/axios_blog";

let head_image_url = ref("/default_head_image.jpeg")

get_user_information().then(
    user => {
        console.log(user)
        if (user.headImageUrl != null){
            head_image_url.value = api.getUri() + "/image/download" + user.headImageUrl; 
        }
    }
).catch(err => {
    //获取头像失败，使用默认头像
});
</script>

<template>

    <img :src = "head_image_url"/>
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
  