<script setup lang="ts">
import { get_user_information } from '@/utils/user_util';
import token_util from "@/utils/token_util";
import popup_message from '@/utils/message_popup';
import BlogList from '@/component/BlogList.vue';
import { ref, reactive, type Ref } from "vue"
import api from "@/utils/axios_blog";
import { useRouter } from 'vue-router'

const route = useRouter();
let paths = ref(route.currentRoute.value.path)
let types = ref(paths.value.split("/",4)[2])
let typenum = 0;
if(types.value == "1"){
    typenum = 1;
}else typenum = 0;

let searchcontent = ref(paths.value.split("/",4)[3])

function backblogs(){
        route.push("/Blogs")   
}

interface Blog {
    
    authorid: number
    content: string
    description: string
    id: number
    status:number
    type:string
    
}

interface Poster{
    _id:string
    _index:string
    _score:number
    _source:Blog
}

interface userses{
    id:number
    nickname:string
    age:number
    privilege:number
}

let blog_list: Ref<Poster[]> = ref([])
let user_list: Ref<userses[]> = ref([])

function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_view.html?id=" + blog_id)
}

function event_searchcontent(){
    api.get("/all/search?keyword="+searchcontent.value).then(response => {
    console.log(response)
    blog_list.value = response.data.hits.hits
    //blog_list = response
  })
}

function event_searchpeople(){
    api.get("/getusers?nickname="+searchcontent.value).then(response => {
    console.log(response)
    user_list.value = response.data.data
    //blog_list = response
  })
}

if(types.value == "0"){
    event_searchcontent()
}else if(types.value == "1"){
    event_searchpeople()
}


function event_toaid(auid:number|undefined){
  if(auid == 0 || !auid){popup_message("不存在的用户" , "error")}
  else route.push({name:"Page",params:{auid:auid}})
}

function level(prev:number):string{
    if(prev == 2) return "网站拥有者"
    else if(prev == 1) return "管理员"
    else return "普通用户"
}

</script>

<template>

    <body>
        <div class="titlebox">
            <button class="returnbox" @click="backblogs">返回</button>
            <h1>搜索结果</h1>
        </div>
        <div class="box">
            <div class="blogbox">
            <table class="imagetable">
            <tr  v-if="(typenum == 0)">
                <th class="id1">博客id</th>
                <th class="id1">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr  v-if="(typenum == 1)">
                <th class="id1">用户id</th>
                <th class="id1">用户昵称</th>
                <th class="levels">用户权限等级</th>
            </tr>
            <tr class="blog_line"  v-for=" blog in blog_list"  v-if="(typenum == 0)">
                <td class="id1">{{ blog._source.id }}</td>
                <td class="id2" @click="event_toaid(blog._source.authorid)">{{ blog._source.authorid }}</td>
                <td class="description" @click="event_open_blog_click(blog._source.id)">{{ blog._source.description }}
                </td>
            </tr>
            <tr class="blog_line"  v-for=" auser in user_list"  v-if="(typenum == 1)">
                <td class="id2" @click="event_toaid(auser.id)">{{ auser.id }}</td>
                <td class="id2" @click="event_toaid(auser.id)">{{ auser.nickname }}</td>
                <td class="levels">{{ level(auser.privilege)}}
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
        margin-right: 28vw;
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

}
.id1 {
border-width: 1px;
width: 12vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 2vw;
text-align: left;
}

.id2 {
border-width: 1px;
width: 12vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 2vw;
text-align: left;
}

.id2:hover{
text-decoration:underline;
cursor: pointer;
}

.description {
border-width: 1px;
padding: 8px;
width: 50vw;
height: 5vh;
border-style: solid;
border-color: #999999;
font-size: 2vw;
text-align: left;
}

.description:hover{
text-decoration:underline;
cursor: pointer;
}

.levels {
border-width: 1px;
padding: 8px;
width: 50vw;
height: 5vh;
border-style: solid;
border-color: #999999;
font-size: 2vw;
text-align: center  ;
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


</style>