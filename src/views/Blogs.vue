<template>


<body>
  
  
  <div class = "box">
  <h2>博客天地</h2>


    <div class="blogbox">

       <ul style="margin-left:15px; line-height:40px;" v-for="descrebe in description">
      <span>Blog{{descrebe.id}}:{{descrebe.description}}</span>
      <span>作者:{{descrebe.authorid}}</span>
        
      </ul>
       <div>   
    </div>
    </div>
    
  </div>
  <Pageswitch v-model:modelValue="pagenum"></Pageswitch>
</body>
</template>

<script setup lang="ts">
import { ref, reactive , watch } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import Pageswitch from "@/views/Pageswitch.vue";
let pagenum = ref(1);

let description = reactive(
    [

  {
    id:1,
    description: "1",
    authorid:1
  },
  {
    id:2,
    description: "2",
    authorid:2
  },
  {
    id:3,
    description: "3",
    authorid:3
  },
  {
    id:4,
    description: "4",
    authorid:4
  },
  {
    id:5,
    description: "5",
    authorid:5
  },
  {
    id:6,
    description: "6",
    authorid:6
  },])




interface BlogInfo {
    id:number
    authorid: number
    description: string
    content: string
    status: number
}

interface CodeInfo<T> {
    code:string
    message: string
    data : T
}

let blogget:CodeInfo<BlogInfo>= reactive(
    {
      code: "",
      message: "",
      data: {
        id:0,
        authorid: 0,
        description: "",
        content: "",
        status: 0
      }
    }
)



function event_download(){

  for (let index = 1; index <= 6; index++) {
    let realindex = ((pagenum.value - 1)*6) + index

    api.get("/blog/?id="+realindex).then(response => {
        description[index-1].authorid = response.data.data.authorid
        description[index-1].id = response.data.data.id
        description[index-1].description = response.data.data.description
        popup_message("加载成功", "success")
    }).catch(error => {
        popup_message("加载失败: " + error.message, "error")
    })
    
  }
  
}

event_download();//进入页面即调用

watch(() => pagenum.value, (newValue, oldValue) => {
  event_download();
})







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
    font-size: 60px;
}

.blogbox {

    justify-content: center;
    align-items: center;

    margin: 1em;
}

.blogbox > ul {
    
    margin-top: 40px;
    margin-right: 10px;
    font-size: 40px;
    color: rgba(213, 201, 201, 0.9);

}

span{
position:relative;

margin: 10px;
  
}

.box > button{
    margin: 10px;
    width: 130px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid rgba(123, 2, 24, 0.5);
    background-color: rgba(123, 2, 24, 0.4);
    color: rgba(0,0,0,0.7);
    transition: 1s;
}



</style>