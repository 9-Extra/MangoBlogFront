<template>



<body>
  <div class = "box">
  <h2>博客天地</h2>


    <div class="blogbox">
       <ul style="margin-left:15px; line-height:40px;" v-for="descrebe in description">Blog:{{descrebe.description}}---------------作者:{{descrebe.author}}</ul>
    </div>
  </div>
</body>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'
const route = useRouter();

let description = 
    [{
    id:"1",
    description: "1",
    author:"1"
  },
  {
    id:"2",
    description: "2",
    author:"2"
  },
  {
    id:"3",
    description: "3",
    author:"3"
  },
  {
    id:"4",
    description: "4",
    author:"4"
  },
  {
    id:"5",
    description: "5",
    author:"5"
  },
  {
    id:"6",
    description: "6",
    author:"6"
  },]




interface BlogInfomation {
    id: string
}


</script>


<style scoped>
body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
    background-size: cover;/*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1200px;
    height: 600px;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);
} 

.box > h2 {
    color: rgb(225, 221, 212);
    margin-bottom: 10px;
    font-size: 60px;
}

.blogbox {

    justify-content: center;
    align-items: center;

    margin: 1em;
}

.blogbox > ul {
    float: top;
    margin-top: 40px;

    margin-right: 10px;
    font-size: 40px;
    color: rgba(213, 201, 201, 0.9);

}
</style>