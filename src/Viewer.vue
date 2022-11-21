<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import { reactive, ref, watch, type Ref } from "vue"
import popup_message from "@/utils/message_popup";
import type { Blog } from "@/utils/utils"
import api from "@/utils/axios_blog";
import CommentAreaVue from "./component/CommentArea.vue";

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
</script>

<template>
    <div id="main">
        <div hidden><editor.mavonEditor/>用一个超级奇怪的办法解决问题</div>
        <h2 id="title">{{blog.description}}</h2>
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
    height: 100vh;
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
.markdown-body video{
    width: 50%;
    height: auto;
}

.comment {
    display: inline;
    margin-top: 2vh;
    margin-bottom: 50px;
}
</style>
  