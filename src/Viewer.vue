<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import { reactive, ref, watch, type Ref } from "vue"
import popup_message from "@/utils/message_popup";
import type { Blog } from "@/utils/utils"
import api from "@/utils/axios_blog";


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
        }
    }
).catch(err => {
    error_exit("博客内容加载失败: " + err.message)
})
</script>

<template>
    <div id="main">
        <editor.mavonEditor :editable="false" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" v-model="blog.content"></editor.mavonEditor>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 90vh;
}

.dropdown-wrapper {
    position: relative;
    cursor: pointer;
}

.popup-dropdown {
    position: absolute;
    display: block;
    background: #fff;
    top: 32px;
    left: -45px;
    min-width: 130px;
    z-index: 1600;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    cursor: pointer;
}

.dropdown-item {
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #606266;
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    white-space: pre-line;
}

.dropdown-item:hover {
    color: rgb(37, 36, 36);
    background-color: #f0f0f0;
}

input[type=file] {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    overflow: visible;
    cursor: pointer;

    
}

.fa-mavon-upload-video::before {
    content: url("/video.ico");
}

.markdown-body video{
    width: 50%;
    height: auto;
}
</style>
  