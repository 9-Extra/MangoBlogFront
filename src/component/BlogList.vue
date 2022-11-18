<script setup lang="ts">
import { ref, reactive, type Ref } from "vue"
import api from "@/utils/axios_blog";
import {get_user_information} from "@/utils/user_util";
import popup_message from "@/utils/message_popup";

interface Blog {
    id: number
    authorid: number
    description: string
    content: string
}

interface idandaid {
    blog_id: number
    operation: string
}

let blog_list: Ref<Blog[]> = ref([])

let postid:idandaid = reactive({
    blog_id: 0,
    operation: "delete"
})


function flash(){
get_user_information().then(
    user => {
        if (user != null) {
            api.get("/open/blogs/?id=" + user.id).then(response => {
                blog_list.value = response.data.data
                popup_message("加载成功", "success")
            }).catch(error => {
                popup_message("加载失败: " + error.message, "error")
            })
        }
    }
);
}

flash();

function blog_detail(id) {



}

function event_deleteblog(bid){
    postid.blog_id = bid;
    api.post("/post",postid).then(response => {
        if(response.data.code != 200)popup_message("删除失败: " + response.data.message, "error")
        else flash();
    }).catch(error => {
        popup_message("加载失败: " + error.message, "error")
    })

}

</script>

<template>
    <div class="blogbox">
        <table class="imagetable">
            <tr>
                <th class="ids">博客id</th>
                <th class="ids">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr v-for=" blog in blog_list">
                <td class="ids">{{ blog.id }}</td>
                <td class="ids" @click="blog_detail(blog.authorid)">{{ blog.authorid }}</td>
                <td class="description">{{ blog.description }}
                <button class="delete" @click="event_deleteblog(blog.id)">删除</button>
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
.ids {
border-width: 1px;
width: 8vw;
height: 5vh;
padding: 8px;
border-style: solid;
border-color: #999999;
font-size: 2vw;
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

.delete{
    float:right;
    margin: 10px;
    width: 5vw;
    height: 4vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 1.5vh;
}
</style>
  