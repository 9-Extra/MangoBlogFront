<script setup lang="ts">
import { ref, reactive, type Ref, watch, type VNode } from "vue"
import api from "@/utils/axios_blog";
import { get_user_information } from "@/utils/user_util";
import popup_message from "@/utils/message_popup";
import type { CodeInfo } from "@/utils/utils";
import type { ElementNode } from "@vue/compiler-core";

interface Comment {
    id: number,
    blogid: number,
    authorid: number,
    content: string
}

const props = defineProps<{
    blog_id: number
}>()

const comments: Ref<Comment[]> = ref([])
const textareaRef: InstanceType<any> = ref(null);
const content = ref('')

function get_comments() {
    api.get(`/comment/get/${props.blog_id}`).then(
        response => {
            let data: CodeInfo<Comment[]> = response.data;
            if (data.code != 0) {
                popup_message("获取评论失败: " + data.message, "error")
            } else {
                comments.value = data.data
            }
        }
    ).catch(
        err => {
            popup_message("获取评论失败: " + err.message, "error")
        }
    )
}

watch(content, () => {
    if (content.value.length > 255) {
        popup_message("评论最多255个字符", "warn")
        content.value = content.value.substring(0, 255)
    }
}
)

function adjustTextareaSize() {
    // let textarea = textareaRef.value
    // const height = textarea.scrollHeight;

    // if (height) { // 改变textarea高度达到自适应
    //     textarea.style.height = height + "px";
    // }
}

function event_publish_click() {
    if (content.value.length == 0){
        popup_message("评论不能为空", "warn");
        return;
    }

    let comment: Comment = {
        id: 0,//无视
        blogid: props.blog_id,
        authorid: 0,//无视
        content: content.value
    }
    api.post("/comment/add", comment).then(
        response => {
            let data: CodeInfo<boolean> = response.data;
            if (data.code != 0){
                popup_message("发布评论失败:" + data.message, "error")
            } else {
                get_comments()//刷新评论区
                popup_message("发布评论成功", "success")
            }
        }
    ).catch(err => {
        popup_message("发布评论失败:" + err.message, "error")
    })

}

get_comments()//获取所有评论

</script>

<template>
    <div id="main">
        <div class="commentbox">
            <table class="imagetable">
                <tr>
                    <th class="id2">评论人</th>
                    <th class="statuses">内容</th>
                </tr>
                <tr class="blog_line" v-for=" comment in comments">
                    <td class="id2">
                        <a herf="http://c.biancheng.net" target="_blank">{{ comment.authorid }}</a>
                    </td>
                    <td class="statuses">
                        {{ comment.content }}
                    </td>
                </tr>
            </table>
        </div>
        <div id="comment-text-box">
            <textarea id="comment-text" ref="textareaRef" v-model="content" placeholder="发一条友善的评论..." style="" />
            <button id="comment-button" @click.stop="event_publish_click">发布评论</button>
        </div>

    </div>
</template>

<style scoped>
.commentbox {
    margin: 1em auto;
    width: 70%;
}

#comment-text-box {
    margin: 0 auto;
    width: 50%;
}

#comment-text {
    resize: none;
    font-size: 2em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: 100%;
    height: 5em;

    background-color: #e98c15;
    border: 20px solid rgba(233, 140, 21, 100);
    border-radius: 15px;
    outline: none;
    opacity: 0.5;

    transition: 0.3s;

    overflow: hidden;
    overflow-y: scroll;
}

#comment-text:hover,
#comment-text:focus {
    opacity: 1;
}

#comment-button {
    display: block;
    margin-top: 1em;
    margin-left: 20px;
}



.commentbox>ul {

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
    margin: 0 auto;
    width: 100%;

    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

table.imagetable th {
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
    background: rgba(255, 174, 52, 0.724)
}

.id2 > a {
    cursor: pointer;
}

table.imagetable td {
    background: rgb(255, 245, 106);
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

</style>
  