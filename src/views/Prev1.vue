<script setup lang="ts">
import { get_user_information } from '@/utils/user_util';
import token_util from "@/utils/token_util";
import popup_message from '@/utils/message_popup';
import BlogList from '@/component/BlogList.vue';
import { ref, reactive, type Ref, watch } from "vue"
import api from "@/utils/axios_blog";
import { useRouter } from 'vue-router'
let seris = ref(0);//0代表拒绝发布 1代表已发布
const route = useRouter();

function backblogs(){
        route.go(-1)   
}

interface ablog {
    id: number
    authorid: number
    description: string
    content: string
    statusauthor: number
    statusadmin: number
}

interface op {
    operation: string
    blog_id: number
}


let posters:op = {
    operation : "",
    blog_id : 0  
}

let blogs_list: Ref<ablog[]> = ref([])


function event_search(tp){
    if(tp == 0){
        api.get("/admin/uninspected").then(response => {
            blogs_list.value = response.data.data;
    })
    }
    else if(tp == 1){
        api.get("/admin/approved").then(response => {
        blogs_list.value = response.data.data;
    })
    }
    else if(tp == 2){
        
        api.get("/admin/disapproved").then(response => {
        blogs_list.value = response.data.data;
    })
    }
}
event_search(seris.value);
watch(() => seris.value, (newValue, oldValue) => {
    event_search(seris.value);
})

function event_toaid(auid:number|undefined){
  if(auid == 0 || !auid){popup_message("不存在的用户" , "error")}
  else route.push({name:"Page",params:{auid:auid}})
}

function level(prev:number):string{
    if(prev == 2) return "网站拥有者"
    else if(prev == 1) return "管理员"
    else return "普通用户"
}

function allowit(tbid){
    posters.blog_id = tbid
    posters.operation = "agree"
    api.post("/post",posters).then(response => {
        
        event_search(seris.value)
    }).catch(error => {
            popup_message("网络错误 " + error.message, "error")

        })
}

function rejectit(tbid){
    posters.blog_id = tbid
    posters.operation = "revoke"
    api.post("/post",posters).then(response => {
        console.log(response)
        event_search(seris.value)
    }).catch(error => {
            popup_message("网络错误 " + error.message, "error")
        })
}

function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_view.html?id=" + blog_id)
}

</script>

<template>

    <body>
        <div class="titlebox">
            <button class="returnbox" @click="backblogs">返回</button>
            <h1>用户列表</h1>

            <select v-model="seris">
            <option value="0">未审核</option>
            <option value="1">已通过</option>
            <option value="2">已拒绝</option>
            </select>
        </div>
        <div class="box">
            <div class="blogbox">
            <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="id1">用户id</th>
                <th class="description">主题</th>
                <th class="controler">操作</th>
            </tr>
            <tr class="blog_line" v-for=" blg in blogs_list">
                <td class="id2">{{ blg.id }}</td>
                <td class="id2" @click="event_toaid(blg.authorid)">{{ blg.authorid }}</td>
                <td class="description2" @click="event_open_blog_click(blg.id)">{{blg.description }}</td>
                <td class="controler">
                    <button class="delete"  @click="allowit(blg.id)" v-if="seris == 0 || seris == 2">通过</button>
                    <button class="delete"  @click="rejectit(blg.id)" v-if="seris == 0 || seris == 1">拒绝</button>
                </td>
                
            </tr>
        </table>

        </div>
        </div>
    </body>
</template>


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

        height: 80vh;
    
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    
        backdrop-filter: blur(10px);

        overflow: hidden;
        overflow-y: scroll; 
    } 
.blogbox {

justify-content: center;
align-items: center;

margin: 1em;
}
.titlebox{
        display: flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        width: 80vw;
        height: 8vh;
        margin-top: 0vh;

    }
.titlebox > h1 {
        position:relative;
        margin-top: 0.1vh;
        margin-right: 23vw;
        color: rgb(8, 7, 4);
        font-size: 2vw;
    }



.titlebox > button{
        position:relative;
        margin-top: 0vh;
        margin-right: 20vw;
        width: 5vw;
        height: 4vh;
        border-radius: 20px;
        border: 1px solid rgba(56, 20, 15, 0.5);
        background-color: rgba(251, 189, 5, 0.856);
        color: rgba(2, 2, 0, 0.7);
        transition: 1s;
        font-size: 0.8vw;
        cursor: pointer;
    }



.box>button {
margin: 10px;
width: 130px;
height: 40px;
border-radius: 20px;
border: 1px solid rgba(123, 2, 24, 0.5);
background-color: rgba(123, 2, 24, 0.4);
color: rgba(0, 0, 0, 0.7);
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

table.imagetable th {
background: rgba(255, 174, 52, 0.724)
}

table.imagetable td {
background: rgb(255, 245, 106);
text-align: left;

}
.controler {
border-width: 1px;
width: 13vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 1.6vw;
}
.id1 {
border-width: 1px;
width: 6vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 1.6vw;
}

.id2 {
border-width: 1px;
width: 6vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 1.6vw;
}

.id2:hover{
text-decoration:underline;
cursor: pointer;
}

.description {
border-width: 1px;
padding: 8px;
width: 45vw;
height: 5vh;
border-style: solid;
border-color: #999999;
font-size: 2vw;
}

.description2 {
border-width: 1px;
padding: 8px;
width: 45vw;
height: 5vh;
border-style: solid;
border-color: #999999;
font-size: 2vw;
}

.description2:hover{
text-decoration:underline;
cursor: pointer;
}

.delete{
cursor: pointer;
float:right;
margin: 10px;
width: 5vw;
height: 4vh;
border-radius: 20px;
border: 1px solid rgba(56, 20, 15, 0.5);
background-color: rgba(251, 189, 5, 0.856);
color: rgba(2, 2, 0, 0.7);
transition: 1s;
font-size: 0.8vw;
}

button:hover {
border: 1px solid rgba(255, 34, 56, 0.8);
background-color: rgba(255, 34, 56, 0.838);
}

select{

        width: 6vw;
        height: 4vh;
        border-radius: 20px;
        border: 1px solid rgba(123, 2, 24, 0.5);
        background-color: rgba(241, 120, 142, 0.4);
        color: rgba(12, 14, 1, 0.7);
        transition: 1s;
        text-align: center;
        font-size: 0.8vw;
    }

    select:hover {
border: 1px solid rgba(255, 235, 108, 0.8);
background-color: rgba(254, 243, 113, 0.838);
}
</style>