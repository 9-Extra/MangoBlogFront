<script setup lang="ts">
import { ref, reactive, type Ref } from "vue"
import api from "@/utils/axios_blog";
import { get_user_information } from "@/utils/user_util";
import popup_message from "@/utils/message_popup";

interface Blog {
    id: number
    authorid: number
    description: string
    content: string
    statusadmin: number
    statusauthor: number
}

interface idandaid {
    blog_id: number
    operation: string
}

let blog_list: Ref<Blog[]> = ref([])

let postid: idandaid = reactive({
    blog_id: 0,
    operation: "delete"
})


function flash() {
    get_user_information().then(
        user => {
            if (user != null) {
                api.get("/private/blogs").then(response => {
                    blog_list.value = response.data.data
                }).catch(error => {
                    popup_message("加载失败: " + error.message, "error")
                })
            }
        }
    );
}

flash();

function statuses(sadmin:number,sauthor:number):string{
    if(sauthor == 0)return "草稿"
    else if(sauthor == 1 && sadmin == -1)return "审核中"
    else if (sauthor == 1 && sadmin == 0)return "审核不通过"
    else if(sauthor == 1 && sadmin == 1)return "已发布"
    else return "空白草稿"
}

function blog_detail(id) {



}

function event_open_blog_click(blog_id: number) {
    window.open("/blog_editor.html?id=" + blog_id)
}

function event_deleteblog(bid) {
    postid.blog_id = bid;
    postid.operation = "delete";
    api.post("/post", postid).then(response => {
        popup_message("删除成功", "success")
        flash();
    }).catch(error => {
        popup_message("删除失败: " + error.message, "error")
    })

}

function event_fabu(bid){
    postid.blog_id = bid;
    postid.operation = "post";
    api.post("/post",postid).then(response => {
        popup_message("发布成功", "success")
        flash();
    }).catch(error => {
        popup_message("发布失败: " + error.message, "error")
    })
}

function event_exchange(bid){
    
}

</script>

<template>
    <div class="blogbox">
        <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="id1">作者id</th>
                <th class="description">简介</th>
                <th class="statuses">状态</th>
            </tr>
            <tr class="blog_line" @click="event_open_blog_click(blog.id)" v-for=" blog in blog_list">
                <td class="id1">{{ blog.id }}</td>
                <td class="id1" @click="blog_detail(blog.authorid)">{{ blog.authorid }}</td>
                <td class="description">{{ blog.description }}
                    <button class="delete" @click.stop="event_deleteblog(blog.id)">删除</button>
                </td>
                <td class="statuses" @click="blog_detail(blog.authorid)">{{ statuses(blog.statusadmin,blog.statusauthor) }}
                    <button class="delete" @click.stop="event_fabu(blog.id)" v-if="(blog.statusauthor == 0)">发布</button>
                    <button class="renew" @click.stop="event_exchange(blog.id)" v-if="(blog.statusauthor == 1 && blog.statusadmin != -1)">修改并重新发布</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
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
    width: 40vw;
    height: 5vh;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

.description:hover{
  text-decoration:underline;
  cursor: pointer;
}

.statuses {
    border-width: 1px;
    padding: 8px;
    width: 20vw;
    height: 5vh;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
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

.renew{
    cursor: pointer;
    float:right;
    margin: 10px;
    width: 7vw;
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
  