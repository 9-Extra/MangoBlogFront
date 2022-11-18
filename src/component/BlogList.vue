<script setup lang="ts">
import 'mavon-editor/dist/css/index.css'
import { ref, reactive, type Ref } from "vue"
import api from "@/utils/axios_blog";
import user_util from "@/utils/user_util";
import popup_message from "@/utils/message_popup";

interface Blog {
    id: number
    authorid: number
    description: string
    content: string
}

let blog_list: Ref<Blog[]> = ref([])

user_util.get_user_information().then(
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

function blog_detail(id) {



}

</script>

<template>
    <div class="blogbox">
        <table class="imagetable">
            <tr>
                <th>博客id</th>
                <th>作者id</th>
                <th>简介</th>
            </tr>
            <tr v-for=" blog in blog_list">
                <td>{{ blog.id }}</td>
                <td @click="blog_detail(blog.authorid)">{{ blog.authorid }}</td>
                <td>{{ blog.description }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.blogbox {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);

    overflow: hidden;
    overflow-y: scroll;
}

.blogbox>ul {

    margin-top: 20px;
    margin-right: 10px;
    font-size: 40px;
    color: rgba(213, 201, 201, 0.9);

}

span {
    position: relative;

    margin: 10px;

}

.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 80vh;
    width: 50vw;
    height: 50vh;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);

    overflow: hidden;
    overflow-y: scroll;



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
    background: white;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}

table.imagetable td {
    background: white;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
}
</style>
  