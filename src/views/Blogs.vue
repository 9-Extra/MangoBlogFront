<template>


  <body>
    <div class="titlebox">
      <h2>博客天地</h2>

      <select v-model="seris">
        <option value="0">文章</option>
        <option value="1">用户</option>
      </select>

      <input class="" type="text" placeholder="请输入搜索内容" v-model=searchcontent />
      <button class="search" @click="event_search">搜索</button>
      <button class="owner" v-if="(previ == 2)" @click="to_prev2">管理员设置</button>
      <button class="owner" v-if="(previ == 1)" @click="to_prev1">博客审核</button>
    </div>

    <div class="box">






      <!--
      <table class="imagetable">
            <tr>
                <th class="id1">博客id</th>
                <th class="id2t">作者昵称</th>
                <th class="descriptiont">简介</th>
            </tr>
            <tr v-for="descrebe in now_list">
                <td class="id1">{{ descrebe.id }}</td>
                <td class="id2" @click="event_toaid(descrebe.authorid)">{{ descrebe.nickname }}</td>
                <td class="description" @click="event_open_blog_click(descrebe.id)">{{ descrebe.description }}</td>
            </tr>
        </table>
      -->
      <div class="blgs">
        <div class="ablog" v-for="descrebe in now_list">
          <h3 @click="event_open_blog_click(descrebe.id)">{{ descrebe.description }}</h3>
          <h4 @click="event_open_blog_click(descrebe.id)">{{ descrebe.content }}</h4>
          <div class="details">
            <h5 @click="event_toaid(descrebe.authorid)">作者:{{ descrebe.nickname }}</h5>
            <h6>点击量:{{ descrebe.count }}</h6>
            <button @click="collectit(descrebe.id)">⭐</button>
            <h11  v-if="iscollectit(descrebe.id)">已收藏</h11>
          </div>

        </div>
        <div class="swichbox">
          <Pageswitch v-model:modelValue="pagenum" v-model:maxpage="pagemax"></Pageswitch>
          <h1>最大页数:{{ maxtext }}</h1>
        </div>
      </div>


      <div class="hots">
        <div class="title2">
        <h10>热门文章</h10>
      </div>
        <div class="ahot" v-for="hots in hot_list">

          <h7 @click="event_open_blog_click(hots.id)">{{ hots.description }}</h7>
          <div class="details2">
            <h8 @click="event_toaid(hots.authorid)">作者:{{ hots.nickname }}</h8>
            <h9>点击量:{{ hots.count }}</h9>
            <button @click="collectit(hots.id)">⭐</button>
            <h12 v-if="iscollectit(hots.id)">已收藏</h12>
          </div>
        </div>
      </div>





    </div>

  </body>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { ref, reactive, watch, Text, type Ref } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import Pageswitch from "@/views/Pageswitch.vue";
import { get_user_information } from '@/utils/user_util';

let seris = ref(0);//0代表搜文章 1 代表搜id

let pagenum = ref(1);

let searchcontent = ref("");

interface BlogInfo {
  id: number
  authorid: number
  description: string
  content: string
  statusauthor: number
  statusadmin: number
  nickname: string
  count: number
}

let blog_list: Ref<BlogInfo[]> = ref([])

let now_list: Ref<BlogInfo[]> = ref([])
let hot_list: Ref<BlogInfo[]> = ref([])

function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_editor.html?id=" + blog_id)
}

const router = useRouter();
function event_toaid(auid: number | undefined) {
  if (auid == 0 || !auid) { popup_message("不存在的用户", "error") }
  else router.push({ name: "Page", params: { auid: auid } })
}

let availablenum = 0;
let pagemax = ref(0);
let maxtext = "加载中"

async function findav() {
  await api.get("/open/blogs/all").then(response => {
    blog_list.value = response.data.data
    hot_list.value = response.data.data
    hot_list.value = hot_list.value.sort((a, b) => { return b.count - a.count })
    hot_list.value = hot_list.value.slice(0, 10)
    availablenum = blog_list.value.length
  }).catch(error => {
    popup_message("加载失败: " + error.message, "error")
  })

  if (availablenum % 9 == 0) {
    pagemax.value = Math.trunc((availablenum / 9))
  }
  else pagemax.value = Math.trunc((availablenum / 9)) + 1
  maxtext = pagemax.value.toString();


  for (let i = 0; i < 9; i++) {
    await api.get("/user/" + hot_list.value[i].authorid).then(response => {

      hot_list.value[i].nickname = response.data.data.nickname
    }).catch(error => {
      popup_message("获取用户名失败: " + error.message, "error")
    })

    if (hot_list.value[i].description.length > 20) {
      hot_list.value[i].description = hot_list.value[i].description.slice(0, 20) + "..."
    }
  }
}

findav()



async function event_download() {
  await api.get("/open/blogs/all").then(response => {
    now_list.value = response.data.data.reverse().slice((pagenum.value - 1) * 9, (pagenum.value) * 9)
  }).catch(error => {
    popup_message("加载失败: " + error.message, "error")
  })

  for (let i = 0; i < 9; i++) {




    await api.get("/user/" + now_list.value[i].authorid).then(response => {

      now_list.value[i].nickname = response.data.data.nickname
    }).catch(error => {
      popup_message("获取用户名失败: " + error.message, "error")
    })

    if (now_list.value[i].description.length > 50) {
      now_list.value[i].description = now_list.value[i].description.slice(0, 50) + "..."
    }

    if (now_list.value[i].content.length > 100) {
      now_list.value[i].content = now_list.value[i].content.slice(0, 100) + "..."
    }
  }
}



event_download();//进入页面即调用

watch(() => pagenum.value, (newValue, oldValue) => {
  event_download();

})

function event_search() {
  router.push({
    name: "Search", params: {
      seris: seris.value,
      searchin: searchcontent.value
    }
  })

}

let previ = ref(0);
async function prevget() {

  let user_rep = await get_user_information()
  if (user_rep?.privilege == "2") {
    popup_message("网站拥有者,欢迎您", "success")
    previ.value = 2;
  }
  else if (user_rep?.privilege == "1") {
    popup_message("管理员,欢迎您", "success")
    previ.value = 1;
  }
}
prevget();

function to_prev2() {
  router.push("/Prev2")
}

function to_prev1() {
  router.push("/Prev1")
}

let names = ref("");



async function likeit(bid){
  await api.post("/collection/add?blogid="+bid).then(response => {
    popup_message("收藏成功", "success")
  }).catch(error => {
    popup_message("操作失败: " + error.message, "error")
  })

  getcollect()
}

async function dislikeit(bid){
  await api.post("/collection/delete?collectionid="+bid).then(response => {
    popup_message("取消收藏成功", "success")
  }).catch(error => {
    popup_message("操作失败: " + error.message, "error")
  })
  getcollect()
}

interface collects {
    blogid:number
    userid:number
}
let collect_list: Ref<collects[]> = ref([])

async function getcollect(){
    await api.get("/collection").then(response => {
            console.log(response.data.data)
            collect_list.value = response.data.data
        }).catch(error => {
            popup_message("加载失败: " + error.message, "error")
        })
}

function iscollectit(bid):boolean{
  let iscollect : boolean = false
  for(let i = 0; i < collect_list.value.length;i++){
    if(collect_list.value[i].blogid == bid){
      iscollect = true
    }
  }
  return iscollect
}
getcollect();

function collectit(bid){
  getcollect();
  let iscollect = ref(false)
  for(let i = 0; i < collect_list.value.length;i++){
    if(collect_list.value[i].blogid == bid){
      iscollect.value = true
    }
  }
  if(!iscollect.value){
    likeit(bid);
  }
  else {
    dislikeit(bid);
  }
}





</script>


<style scoped>

.hots{
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-start;
  width: 20vw;  
  height: 70vh;

  backdrop-filter: blur(10px);

  overflow: hidden;
  overflow-y: scroll;
}

.title2{
  width: 10vw;
  height: 3vh;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(5, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  margin-left: 4vw;
  background-color: rgb(252, 183, 104);
}
.title2 > h10 {
  border-color: #333333;
  font-size: 1vw;
  word-break: break-all;
  word-wrap: break-word;
  text-align: center;
}

.ahot{
  width: 15vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-start;
  margin-left: 1.5vw;
  margin-top: 1vh;

  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(5, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  background-color: rgb(255, 205, 139);
}

.ahot > h7{
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 1.3vw;
  word-break: break-all;
  word-wrap: break-word;
  text-align: left;
}

.ablog {
  width: 55vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: right;
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


.blgs {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-start;
  width: 60vw;
  height: 70vh;

  backdrop-filter: blur(10px);

  overflow: hidden;
  overflow-y: scroll;
}


.ablog>h3 {
  margin-left: 1vw;
  font-size: 2.1vw;
}

.ablog>h4 {
  margin-left: 1vw;
  margin-right: 1vw;
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

h7:hover {
  text-decoration: underline;
  cursor: pointer;
}

h8:hover {
  text-decoration: underline;
  cursor: pointer;
}


.details {
  margin-left: 1vw;
  margin-top: 2vw;
  width: 50vw;
  height: 4vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;



}

.details > button{
  position: absolute;
  margin-left: 50vw;
  margin-bottom: 1vh;
  font-size: 1vw;

  border-radius: 10px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
}

.details>h5 {
  margin-left: 1vw;
  font-size: 1vw;
}

h5:hover {
  text-decoration: underline;
  cursor: pointer;
}

.details>h6 {
  position: absolute;
  margin-left: 35vw;
  font-size: 1vw;
}

.details > h11 {
  position: absolute;
  margin-left: 49vw;
  margin-bottom: 10vh;
  font-size: 1vw;
}

.details2 {
  margin-left: 1vw;
  margin-top: 2vw;
  width: 10vw;
  height: 4vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.details2 > button{
  position: absolute;
  margin-left: 12vw;
  margin-bottom: 15vh;
  font-size: 0.8vw;

  border-radius: 10px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
}

.details2 > h8{
  margin-left: 0.1vw;
  font-size: 1vw;
}

.details2 > h9{
  position: absolute;
  margin-left: 8vw;
  font-size: 1vw;
}

.details2 > h12{
  position: absolute;
  margin-left: 10vw;
  margin-bottom: 7vh ;
  font-size: 1vw;
}

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
  justify-content: left;
  align-items: center;
  width: 80vw;

  height: 70vh;

  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  backdrop-filter: blur(10px);

}



.swichbox {
  margin-top: 1vh;
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 1vw;
  margin-left: 10vw;
}

.titlebox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 8vh;
  margin-top: 5vh;
}

input {
  margin-left: 1vw;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1vw;
  height: 1.5em;
  width: 12em;
  opacity: 0.5;
  border: 5px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  transition: 1s;
  outline: none;
  padding: 0 10px;
}

.search {
  position: relative;
  margin-left: 1vw;
  width: 4vw;
  height: 4vh;
  border-radius: 20px;
  border: 1px solid rgba(56, 20, 15, 0.5);
  background-color: rgba(251, 189, 5, 0.856);
  color: rgba(2, 2, 0, 0.7);
  transition: 1s;
  font-size: 0.8vw;
}

.owner {
  position: relative;

  margin-left: 5vw;
  width: 6vw;
  height: 5vh;
  border-radius: 20px;
  border: 1px solid rgba(56, 20, 15, 0.5);
  background-color: rgba(255, 226, 139, 0.856);
  color: rgba(2, 2, 0, 0.7);
  transition: 1s;
  font-size: 0.9vw;
}

select {
  margin-left: 50vw;
  width: 6vw;
  height: 4vh;
  border-radius: 20px;
  border: 1px solid rgba(123, 2, 24, 0.5);
  background-color: rgba(241, 120, 142, 0.4);
  color: rgba(12, 14, 1, 0.7);
  transition: 1s;
  text-align: center;
  font-size: 1vw;
}

select:hover {
  border: 1px solid rgba(255, 215, 83, 0.8);
  background-color: rgba(255, 193, 85, 0.838);
}

button:hover {
  border: 1px solid rgba(255, 34, 56, 0.8);
  background-color: rgba(255, 34, 56, 0.838);
  cursor: pointer;
}

h2 {
  position: absolute;
  left: 45%;
  top: 6%;
  color: rgb(8, 7, 4);
  font-size: 2.5vw;
}

h1 {
  position: relative;
  color: rgb(13, 13, 12);
  font-size: 1vw;
  margin-left: 2vw;
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
  font-size: 1.4vw;
}

.id2 {
  border-width: 1px;
  width: 8vw;
  height: 5vh;
  padding: 8px;
  border-style: solid;
  border-color: #999999;
  font-size: 1.4vw;
}

.id2:hover {
  text-decoration: underline;
  cursor: pointer;
}

.id2t {
  border-width: 1px;
  width: 8vw;
  height: 5vh;
  padding: 8px;
  border-style: solid;
  border-color: #999999;
  font-size: 1.4vw;
}

.description {
  border-width: 1px;
  padding: 8px;
  width: 60vw;
  height: 5vh;
  border-style: solid;
  border-color: #999999;
  font-size: 1.6vw;
}

.descriptiont {
  border-width: 1px;
  padding: 8px;
  width: 60vw;
  height: 5vh;
  border-style: solid;
  border-color: #999999;
  font-size: 1.6vw;
}

.description:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>