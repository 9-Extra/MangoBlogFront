<script setup lang="ts">
import Page from './Page.vue';
import "@/component/BlogList.vue";
import BlogList from '@/component/BlogList.vue';


</script>

<template>
    <body>
        个人主页
        <BlogList id="list_continer"></BlogList>
    </body>
</template>


<style scoped>
@charset "utf-8";
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

body {
    padding-top: 50px;

    height:100vh;
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
    background-size: cover;/*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;
}

#list_continer {
    width: 500px;
    height: 70%;

    margin-left: 40px;
}

</style>
