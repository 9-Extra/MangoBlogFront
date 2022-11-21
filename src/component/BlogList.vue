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


async function flash() {
    await get_user_information().then(
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

    for(let i = 0;i < blog_list.value.length ; i++){
        if(blog_list.value[i].description.length > 40){
            blog_list.value[i].description = blog_list.value[i].description.slice(0,40) + "..."
        }
    }
}

flash();

function statuses(sadmin:number,sauthor:number):string{
    if(sauthor == 0)return "草稿"
    else if(sauthor == 1 && sadmin == -1)return "审核中"
    else if (sauthor == 1 && sadmin == 0)return "审核不通过"
    else if(sauthor == 1 && sadmin == 1)return "已发布"
    else return "空白草稿"
}


function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_view.html?id=" + blog_id)
}

function change_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_editor.html?id=" + blog_id)
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


let wantdelete = ref(0)
let showconfirm = ref(false)


function showconf(thisbid){
    showconfirm.value = true;
    wantdelete.value = thisbid;
}

function yesdelete(thisbid){
    event_deleteblog(thisbid);
    showconfirm.value = false;
}

function nodelete(){
    showconfirm.value = false;
}

</script>

<template>
    <div class="blogbox">
        <div class="fugai" v-show="showconfirm">
            <div class="confirm">
                <c1>确定要删除吗?</c1>
                <div class="bt2s">
                    <button @click="yesdelete(wantdelete)">确定</button>
                    <button @click="nodelete">取消</button>
                </div>

            </div>
        </div>
        <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="description">简介</th>
                <th class="statuses">状态</th>
            </tr>
            <tr class="blog_line"  v-for=" blog in blog_list">
                <td class="id1">{{ blog.id }}</td>
                <td class="description" @click="event_open_blog_click(blog.id)">{{ blog.description }}
                    <button class="delete" @click.stop="showconf(blog.id)">删除</button>
                </td>
                <td class="statuses">{{ statuses(blog.statusadmin,blog.statusauthor) }}
                    <button class="delete" @click.stop="event_fabu(blog.id)" v-if="(blog.statusauthor == 0)">发布</button>
                    <button class="renew" @click.stop="change_click(blog.id)" v-if="(blog.statusauthor == 1 && blog.statusadmin != -1)">修改并重新发布</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.blogbox {

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

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
.fugai{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
}
.confirm{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:20%;
    width: 25vw;
    height: 30vh;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    background-color: rgb(255, 200, 112);
}

.confirm > c1{
    margin-top: 10vh;
    font-size: 2vw;
}

.bt2s{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30vw;
}

.bt2s > button{
    width: 10vw;
    height: 6vh;
    margin: 5vw;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 1vw;
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
    width: 47vw;
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
    width: 22vw;
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
  