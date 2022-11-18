<script setup lang="ts">
import '@/component/BlogList.vue';

</script>

<template>

    <body>
        <div class="titlebox">
            <h1>我的主页</h1>
        </div>
        <div class="box">

            <BlogList id="list_continer"></BlogList>

        </div>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
    background-size: cover;
    /*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;
}

.box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 1600px;
    height: 700px;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);

    overflow: hidden;
    overflow-y: scroll;
}

.titlebox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 8vh;
    margin-top: 5vh;

    background-color: rgb(250, 171, 34);

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);


}


h1 {
    position: relative;
    top: 1/2vh;
    color: rgb(13, 13, 12);
    font-size: 3vw;
}

#list_continer {
    width: 80vw;
    height: 70%;

    margin-left: 40px;
}
</style>
