<template>


    <body>

        <div class="titlebox">
            <button class="returnbox" @click="backblogs">返回</button>
            <h2 v-if="is_me">我的主页</h2>
            <h2 v-else>{{user_info.nickname}} 的主页</h2>
            <h3>id:{{ user_info.id }}</h3>
        </div>

        <div class="box">

            <div class="blogbox">
                <table class="imagetable">
                    <tr>
                        <th class="ids">博客id</th>
                        <th class="description">简介</th>
                    </tr>
                    <tr v-for="blg in blogdatas" :key="blg.id">
                        <td class="ids">{{ blg.id }}</td>
                        <td class="description" @click="event_open_blog_click(blg.id)">{{ blg.description }}</td>
                    </tr>
                </table>
            </div>



        </div>
    </body>
</template>
    
<script setup lang="ts">
import { get_user_information, get_user_information_by_id, type User } from "@/utils/user_util";
import { ref, reactive, type Ref } from "vue"
import api from "../utils/axios_blog";
import { useRouter } from 'vue-router'
import popup_message from "../utils/message_popup";
const router = useRouter();

function get_user_id(): number | null {
    let paths = router.currentRoute.value.path
    let id = parseInt(paths.split("/",3)[2])
    if (isNaN(id)){
        return null
    } else {
        return id
    }
}

let user_id = get_user_id()
let is_me = user_id == null
console.log(is_me)

let user_info: User = reactive({
    id: 0,
    nickname: "",
    age:0,
    headImageUrl: "",
    privilege: ""
})

if (is_me){
    get_user_information().then(
    user => {
        if (user != null) {
            user_info.id = user.id;
            user_info.nickname = user.nickname;
            user_info.headImageUrl = user.headImageUrl;
            user_info.privilege = user.privilege;
        }
    })
} else {
    get_user_information_by_id(user_id as number).then(
    user => {
        if (user != null) {
            user_info.id = user.id;
            user_info.nickname = user.nickname;
            user_info.headImageUrl = user.headImageUrl;
            user_info.privilege = user.privilege;
        }
    })
}

function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_view.html?id=" + blog_id)
}

interface Blog {
    id: number
    authorid: number
    description: string
    content: string
    statusadmin: number
    statusauthor: number
}

let blogdatas: Ref<Blog[]> = ref([])

function getblog() {
    api.get("/open/blogs/?id=" + user_id).then(response => {
        if (response.data.code == 0) {
            blogdatas.value = response.data.data
        } else {
            blogdatas.value = []
            popup_message("错误" + response.data.message, "error")
        }
    }).catch(error => {
        popup_message("加载失败: " + error.message, "error")
    })
}

getblog();

function blog_detail(aid) {

}

function backblogs() {
    router.go(-1)
}
</script>

    
    
    
<style scoped>
body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
    background-size: cover;
    /*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;
}

.box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 80vw;

    height: 70vh;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);

    overflow: hidden;
    overflow-y: scroll;
}

.titlebox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 8vh;
    margin-top: 4vh;




}

.titlebox>h2 {
    position: relative;
    margin-top: 0.5vh;
    color: rgb(8, 7, 4);
    font-size: 3vw;
}

.titlebox>h3 {
    position: relative;
    margin-top: 5vh;
    margin-left: 15vw;
    color: rgb(13, 13, 12);
    font-size: 1vw;
}

.titlebox>button {
    position: relative;
    margin-top: 1vh;
    margin-right: 15vw;
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

button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);
    cursor: pointer;
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

.description:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>