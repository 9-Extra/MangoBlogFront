<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import { reactive, ref, watch, type Ref } from "vue"
import popup_message from "@/utils/message_popup";
import type { Blog } from "@/utils/utils"
import api from "@/utils/axios_blog";
import CommentAreaVue from "./component/CommentArea.vue";
import { get_user_information } from "@/utils/user_util";
import router from "@/router";
import token_util from '@/utils/token_util';

interface User{
    id: number
    nickname: string
    age: number
    headImageUrl?: string
    privilege: string //权限
}



let meinfo: User = reactive({
    id: 0,
    nickname: '',
    age: 0,
    headImageUrl: '',
    privilege: ''
})

function getme(){
get_user_information().then(
    user_rep => {
        meinfo.id = user_rep.id
        meinfo.nickname = user_rep.nickname
        meinfo.age = user_rep.age
        meinfo.headImageUrl = user_rep.headImageUrl
        meinfo.privilege = user_rep.privilege
    }
)
.catch(err => {
    popup_message("后端异常: " + err.message, "error")
    router.replace("/Login")
})
}


getme()

let authorinfo = {
    id: 0,
    nickname: '',
    age: 0,
    headImageUrl: '',
    privilege: ''
}



let md = editor.markdownIt;//获取mavon-editor中的markdown-it对象

function get_blog_id(): number | null {
    let params = new URLSearchParams(document.location.search.substring(1))
    let str = params.get("id")
    if (!str) return null
    let id: number = parseInt(str)
    if (isNaN(id)) return null
    return id
}

function error_exit(msg: string) {
    popup_message(msg, "error")
    setTimeout(() => {
        location.href = "/#/Me"
    }, 2000);
}

//开始
let blog: Blog = reactive({
    id: 0,
    authorid: 0,
    status: 0,
    description: "",
    content: ""
})


//如果id存在则打开
{
    let id: number | null = get_blog_id()
    if (id == null) {
        error_exit("请输入id")
    } else {
        blog.id = id;
    }
}




api.get(`/open/blog/${blog.id}`).then(
    response => {
        let result = response.data;
        if (result.code != 0) {
            error_exit("博客内容加载失败: " + result.message)
        } else {
            blog.id = result.data.id
            blog.authorid = result.data.authorid
            blog.status = result.data.status
            blog.description = result.data.description
            blog.content = result.data.content

            document.title = blog.description
            
            let main = document.getElementById("markdown-content");
            if (main){
                main.innerHTML = md.render(blog.content)
            }
        }
    }
).catch(err => {
    error_exit("博客内容加载失败: " + err.message)
})


async function getauthor(){
    await api.get(`/open/blog/${blog.id}`).then(
    response => {
        let result = response.data;
        if (result.code != 0) {
            error_exit("博客内容加载失败: " + result.message)
        } else {
            blog.id = result.data.id
            blog.authorid = result.data.authorid
            blog.status = result.data.status
            blog.description = result.data.description
            blog.content = result.data.content

            document.title = blog.description
            
            let main = document.getElementById("markdown-content");
            if (main){
                main.innerHTML = md.render(blog.content)
            }
        }
    }
).catch(err => {
    error_exit("博客内容加载失败: " + err.message)
})
    console.log(blog.authorid)
    api.get("/user/" + blog.authorid).then(response => {
        
        authorinfo = response.data.data;
    })
}

getauthor()

async function likeit(bid) {
    if (token_util.get_token() == null){
        popup_message("请先登录", "warn")
        return
    }
    await api.post("/collection/add?blogid=" + bid).then(response => {
        popup_message("收藏成功", "success")
    }).catch(error => {
        popup_message("操作失败: " + error.message, "error")
    })

    getcollect()
}

async function dislikeit(bid) {
    if (token_util.get_token() == null){
        popup_message("请先登录", "warn")
        return
    }
    await api.post("/collection/delete?collectionid=" + bid).then(response => {
        popup_message("取消收藏成功", "success")
    }).catch(error => {
        popup_message("操作失败: " + error.message, "error")
    })
    getcollect()
}

interface collects {
    blogid: number
    userid: number
}
let collect_list: Ref<collects[]> = ref([])

async function getcollect() {
    if (token_util.get_token() != null) {
        await api.get("/collection").then(response => {
            console.log(response.data.data)
            collect_list.value = response.data.data
        }).catch(error => {
            popup_message("加载失败: " + error.message, "error")
        })
    }
}

function iscollectit(bid): boolean {
    let iscollect: boolean = false
    for (let i = 0; i < collect_list.value.length; i++) {
        if (collect_list.value[i].blogid == bid) {
            iscollect = true
        }
    }
    return iscollect
}
getcollect();

function collectit(bid) {
    getcollect();
    let iscollect = ref(false)
    for (let i = 0; i < collect_list.value.length; i++) {
        if (collect_list.value[i].blogid == bid) {
            iscollect.value = true
        }
    }
    if (!iscollect.value) {
        likeit(bid);
    }
    else {
        dislikeit(bid);
    }
}
</script>

<template>
    <div id="main">
        <div hidden><editor.mavonEditor/>用一个超级奇怪的办法解决问题</div>
        <h2 id="title">{{blog.description}}</h2>
        <button id="collect" @click="collectit(blog.id)">⭐</button>
        <h12 v-if="iscollectit(blog.id)">已收藏</h12>
        <h3 id="author">作者:{{authorinfo.nickname}}</h3>
        
        <div class = "markdown-box">
            <div id="markdown-content" class = "markdown-body">

            </div>
        </div>
        <Suspense>
            <CommentAreaVue class="comment" :blog_id="blog.id"/>
        </Suspense>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
    background-size: cover;/*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;

    text-align: center;

    overflow: hidden;
    overflow-y: scroll;

}

#title {
    font-size: 5em;

    font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
}

.markdown-box{
    width: 70%;
    display:inline-block;
    backdrop-filter: blur(10px);
    border: solid 2px rgba(255, 255, 255, 0.2);

    border-radius: 10px;

    background-color: rgba(255, 255, 255, 0.4);

}

.markdown-body {
    width: 90%;
    display:inline-block;
    margin: 2em auto;

    text-align: left;
}

.comment {
    display: inline;
    margin-top: 2vh;
    padding-bottom: 50px;
}

#collect {
    
    width: 30px;
    height: 30px;
    margin-left: 40vw;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
}

#collect:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);
    cursor: pointer;
}
</style>

<style>
.markdown-body video{
    width: 100%;
    height: auto;
}
</style>

  