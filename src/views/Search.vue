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
let searchcontent = ref(paths.value.split("/",3)[2])

interface Blog {
    id: number
    authorid: number
    description: string
    content: string
}

let blog_list: Ref<Blog[]> = ref([])

function event_open_blog_click(blog_id: number) {
    window.open("/blog_editor.html?id=" + blog_id)
}

function event_search(){
    api.get("/open/search?keyword="+searchcontent.value).then(response => {
    console.log(response)
    //blog_list = response
  })
}
event_search()

</script>

<template>

    <body>
        <div class="titlebox">
            <h1>我的主页</h1>
        </div>
        <div class="box">

            <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="id1">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr class="blog_line" @click="event_open_blog_click(blog.id)" v-for=" blog in blog_list">
                <td class="id1">{{ blog.id }}</td>
                <td class="id1">{{ blog.authorid }}</td>
                <td class="description">{{ blog.description }}
                </td>
            </tr>
        </table>

        </div>
        <div class="buttonbox">
            <button>退出登录</button>
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
.blogbox {

justify-content: center;
align-items: center;

margin: 1em;
}



.blogbox>ul {

margin-top: 20px;
margin-right: 10px;
font-size: 40px;
color: rgba(213, 201, 201, 0.9);

}

span {
margin-top: 10px;

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

.blog_line {
cursor: pointer;
}
</style>