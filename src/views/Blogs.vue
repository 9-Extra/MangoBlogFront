<template>


<body>
  <div class = "titlebox">
    <h2>博客天地</h2>

    </div> 
  
  <div class = "box">



    <div class="blogbox">

      <table class="imagetable">
            <tr>
                <th class="ids">博客id</th>
                <th class="ids">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr v-for="descrebe in descriptions">
                <td class="ids">{{ descrebe.id }}</td>
                <td class="ids" @click="event_toaid(descrebe.authorid)">{{ descrebe.authorid }}</td>
                <td class="description">{{ descrebe.description }}</td>
            </tr>
        </table>

       <div>   
    </div>
    </div>
    
  </div>
  <Pageswitch v-model:modelValue="pagenum"></Pageswitch>
</body>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { ref, reactive , watch } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import Pageswitch from "@/views/Pageswitch.vue";

let pagenum = ref(1);



let descriptions = reactive(
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
  },
  {
    id:7,
    description: "7",
    authorid:7
  },
  {
    id:8,
    description: "8",
    authorid:8
  },
  {
    id:9,
    description: "9",
    authorid:9
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
const router = useRouter();
let paths = ref(router.currentRoute.value.path)
let myid = ref(paths.value.split("/",3)[2])

function event_toaid(auid:number){
  router.push({name:"Page",params:{id:myid.value,auid:auid}})
}


function event_download(){

  for (let index = 1; index <= 9; index++) {
    let realindex = ((pagenum.value - 1)*9) + index

    api.get("/open/blog/?id="+realindex).then(response => {
        
        descriptions[index-1].authorid = response.data.data.authorid
        descriptions[index-1].id = response.data.data.id
        descriptions[index-1].description = response.data.data.description
        if(response.data.code != 2) index--;
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
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        width: 80vw;

        height: 70vh;
    
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    
        backdrop-filter: blur(10px);

        overflow: hidden;
        overflow-y: scroll; 
    } 

    .titlebox{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        width: 30vw;
        height: 8vh;
        margin-top: 5vh;

        background-color:rgb(250, 171, 34);
    
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    
        backdrop-filter: blur(10px);


    }
    
    h2 {
        position:relative;
        bottom: 0.1vh;
        color: rgb(8, 7, 4);
        font-size: 2.5vw;
    }

    h1 {
        position:relative;
        bottom: 10px;
        color: rgb(13, 13, 12);
        font-size: 1vw;
    }
    
    .blogbox {
    
        justify-content: center;
        align-items: center;
    
        margin: 1em;
    }
    

    
    .blogbox > ul {
    
    margin-top: 20px;
    margin-right: 10px;
    font-size: 40px;
    color: rgba(213, 201, 201, 0.9);

    }

    span{
    margin-top: 10px;
    
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
    
table.imagetable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

table.imagetable th{
    background: rgba(255, 174, 52, 0.724)
}

table.imagetable td{
    background: rgb(255, 245, 106);
    text-align: left;
    
}
.ids {
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

.description {
    border-width: 1px;
    padding: 8px;
    width: 60vw;
    height: 5vh;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}
    
</style>