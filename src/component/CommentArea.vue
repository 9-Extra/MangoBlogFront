<script setup lang="ts">
import { ref, reactive, type Ref, watch, type VNode } from "vue"
import api from "@/utils/axios_blog";
import { get_user_information_by_id, type User } from "@/utils/user_util";
import popup_message from "@/utils/message_popup";
import type { CodeInfo } from "@/utils/utils";
import HeadImageVue from "./HeadImage.vue";

interface Comment {
    id: number,
    blogid: number,
    authorid: number,
    content: string,

    author_nick_name?: string,
    author_head_image?: string
}

interface Commentsend {
    blogid: number,
    authorid: number,
    content: string,
}

const props = defineProps<{
    blog_id: number
}>()

const comments: Ref<Comment[]> = ref([])
const textareaRef: InstanceType<any> = ref(null);
const content = ref('')
let complete = ref(false)

async function get_comments() {
    complete.value = false
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
    ).then(async () => {
        for (let comment of comments.value) {
        if (!comment.author_nick_name) {
            await get_user_information_by_id(comment.authorid).then(
                user => {
                    comment.author_nick_name = user.nickname
                    comment.author_head_image = user.headImageUrl
                }
            )
        }
    }
    complete.value = true
    })

}

function deletecomment(cid){
    api.post("/comment/delete?commentid="+cid).then(
        response => {
            if(response.data.code == 0){
                popup_message("删除成功", "success")
                get_comments()
            }
        }).catch(
        err => {
            popup_message("删除失败: " + err.message, "error")
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
    if (content.value.length == 0) {
        popup_message("评论不能为空", "warn");
        return;
    }

    let comment: Commentsend = {
        blogid: props.blog_id,
        authorid: 0,//无视
        content: content.value
    }

    api.post("/comment/add", comment).then(
        response => {
            let data: CodeInfo<boolean> = response.data;
            if (data.code != 0) {
                popup_message("发布评论失败:" + data.message, "error")
            } else {
                popup_message("发布评论成功", "success")
            }
        }

    ).catch(err => {
        popup_message("发布评论失败:" + err.message, "error")
    })
}

await get_comments()//获取所有评论

let user_info_store: Ref<Map<number, User>> = ref(new Map())

</script>

<template>
    <div id="main">

        <div class="box">

            <div class="blgs">
                <div class="ablog" v-if="complete" v-for="comment in comments">
                    <div class="nambox">
                        <HeadImageVue :head_image_url="comment.author_head_image? comment.author_head_image : null"/>
                        <h3>{{ comment.author_nick_name }}</h3>
                    </div>
                    <h4>{{ comment.content }}</h4>

                </div>
            </div>

        </div>




        <div id="comment-text-box">
            <textarea id="comment-text" ref="textareaRef" v-model="content" placeholder="发一条友善的评论..." style="" />
            <button id="comment-button" @click.stop="event_publish_click">发布评论</button>
        </div>

    </div>
</template>

<style scoped>
#main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


}

.head_image {

    margin: 10px;
}

.nambox > button{
    position:relative;
        margin-top: 0vh;
        margin-left:60vw;
        width: 4vw;
        height: 20px;
        border-radius: 20px;
        border: 1px solid rgba(56, 20, 15, 0.5);
        background-color: rgba(251, 189, 5, 0.856);
        color: rgba(2, 2, 0, 0.7);
        transition: 1s;
        font-size: 0.7vw;
        cursor: pointer;    
}

button:hover {
border: 1px solid rgba(255, 34, 56, 0.8);
background-color: rgba(255, 34, 56, 0.838);
}

.nambox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

img {
    border-radius: 50%;
    height: 5vh;
    width: 5vh;
    object-fit: cover;
    object-position: center;
    border: 1px solid wheat;
}

.blgs {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    width: 80vw;
    height: 70vh;

    backdrop-filter: blur(10px);
    overflow: hidden;
    overflow-y: scroll;

}

.ablog {
    width: 75vw;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    margin-left: 1vw;
    margin-top: 1vh;

    border-top: 1px solid rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(5, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: rgb(255, 205, 139);
}





.ablog>h3 {

    margin-left: 4vw;
    font-size: 2vw;
}

.ablog>h4 {

    margin-top: 1vh;
    margin-bottom: 8vh;
    margin-left: 1vw;
    font-size: 1.3vw;
    word-break: break-all;
    word-wrap: break-word;
    text-align: left;
}

h3:hover {
    text-decoration: underline;
    cursor: pointer;
}

h4:hover {
    text-decoration: underline;
    cursor: pointer;
}

.commentbox {
    margin: 1em auto;
    width: 70%;
}

#comment-text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin: 0 auto;
    width: 50%;

    margin-top: 5vh;
}

#comment-text {
    resize: none;
    font-size: 2em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width: 100%;
    height: 5em;

    background-color: #f7a53b;
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
    margin-right: 1vw;
    background-color: rgb(255, 234, 0);
    border: 1px solid #ddd;
    color: #877777;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 5vw;
    height: 3vh;
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

.id2>a {
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
  