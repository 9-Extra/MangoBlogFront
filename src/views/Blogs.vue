<template>


<body>
  <div class = "titlebox">
    <h2>博客天地</h2>

    </div> 
  
  <div class = "box">



    <div class="blogbox">

      <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="id2">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr v-for="descrebe in descriptions">
                <td class="id1">{{ descrebe.id }}</td>
                <td class="id2" @click="event_toaid(descrebe.authorid)">{{ descrebe.authorid }}</td>
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
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
  },
  {
    id:0,
    description: "",
    authorid:0
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
function event_toaid(auid:number){
  if(auid == 0){popup_message("不存在的用户" , "error")}
  else router.push({name:"Page",params:{auid:auid}})
}




async function event_download(){
let findnum = 0;
let realnum = 1;

for(let i = 1; i<=pagenum.value;i++){
  if(i!=pagenum.value)popup_message("加载中,请稍后... " , "success")

  for (let index = 1; index <= 1000; index++) {

    await api.get("/open/blog/?id="+realnum).then(response => {
        if(response.data.code == 0){
        descriptions[findnum].authorid = response.data.data.authorid
        descriptions[findnum].id = response.data.data.id
        descriptions[findnum].description = response.data.data.description
        findnum++;
        }
    }).catch(error => {
        popup_message("加载失败: " + error.message, "error")
    })

    realnum++;
    //console.log(realnum)
    if(findnum > 8){
      break;
    }
    
  }
  findnum = 0
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
.id1 {
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

.id2 {
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

.id2:hover{
  text-decoration:underline;
  cursor: pointer;
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

.description:hover{
  text-decoration:underline;
  cursor: pointer;
}
    
</style>