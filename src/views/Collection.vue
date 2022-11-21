<template>


  <body>
    <div class="titlebox">
      <button class="returnbox" @click="backblogs">返回</button>
      <h2>收藏夹</h2>
    </div>

    <div class="box">

      <div class="blgs">
        <div class="ablog" v-for="descrebe in blog_list">
          <h3 @click="event_open_blog_click(descrebe.id)">{{ descrebe.description }}</h3>
          <h4 @click="event_open_blog_click(descrebe.id)">{{ descrebe.content }}</h4>
          <div class="details">
            <h5 @click="event_toaid(descrebe.authorid)">作者:{{ descrebe.nickname }}</h5>
            <h6>点击量:{{ descrebe.count }}</h6>
            <button @click="collectit(descrebe.id)">⭐</button>
            <h11 v-if="iscollectit(descrebe.id)">已收藏</h11>
          </div>

        </div>
      </div>

    </div>

  </body>
</template>

<script setup lang="ts">
import { ref, reactive, watch, Text, type Ref } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import { useRouter } from 'vue-router'

interface collects {
  blogid: number
  userid: number
}

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
let collect_list: Ref<collects[]> = ref([])
let blog_list: Ref<BlogInfo[]> = ref([])
const router = useRouter();

function backblogs() {
  router.push("/")
}

function event_open_blog_click(blog_id: number | undefined) {
  if (!blog_id) { }
  else window.open("/blog_editor.html?id=" + blog_id)
}

function event_toaid(auid: number | undefined) {
  if (auid == 0 || !auid) { popup_message("不存在的用户", "error") }
  else router.push({ name: "Page", params: { auid: auid } })
}



async function getcollect() {

  await api.get("/collection").then(response => {
    console.log(response.data.data)
    collect_list.value = response.data.data
  }).catch(error => {
    popup_message("加载失败: " + error.message, "error")
  })
  let index = 0;
  for (let i = 0; i < collect_list.value.length; i++) {
    await api.get("/open/blog/" + collect_list.value[i].blogid).then(response => {
      if (response.data.code == 0) {
        blog_list.value[index] = response.data.data;
        if (blog_list.value[index].description.length > 30) {
          blog_list.value[index].description = blog_list.value[index].description.slice(0, 30) + "..."
        }
        if (blog_list.value[index].content.length > 100) {
          blog_list.value[index].content = blog_list.value[index].content.slice(0, 100) + "..."
        }
        index++;
      }

    })
  }
  blog_list.value = blog_list.value.slice(0,index)

  for (let i = 0; i < blog_list.value.length; i++) {
    await api.get("/user/" + blog_list.value[i].authorid).then(response => {

      blog_list.value[i].nickname = response.data.data.nickname
    }).catch(error => {
      popup_message("获取用户名失败: " + error.message, "error")
    })
  }
}

getcollect();

async function likeit(bid) {
  await api.post("/collection/add?blogid=" + bid).then(response => {
    popup_message("收藏成功", "success")
  }).catch(error => {
    popup_message("操作失败: " + error.message, "error")
  })

  getcollect()
}

async function dislikeit(bid) {
  await api.post("/collection/delete?collectionid=" + bid).then(response => {
    popup_message("取消收藏成功", "success")
  }).catch(error => {
    popup_message("操作失败: " + error.message, "error")
  })
  getcollect()
}

function iscollectit(bid): boolean {
  let iscollect: boolean = false
  for (let i = 0; i < collect_list.value.length; i++) {
    if (collect_list.value[i].blogid == bid) {
      iscollect = true
    }
  }
  return iscollect
}

function collectit(bid) {
  getcollect();
  let iscollect = ref(false)
  for (let i = 0; i < collect_list.value.length; i++) {
    if (collect_list.value[i].blogid == bid) {
      iscollect.value = true
    }
  }
  if (!iscollect.value) {
    likeit(bid);
  }
  else {
    dislikeit(bid);
  }
}

</script>
<style scoped>
.blgs {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-start;
  width: 80vw;
  height: 70vh;

  backdrop-filter: blur(10px);

  overflow: hidden;
  overflow-y: scroll;
}
.ablog {
  width: 75vw;
  height: 15vh;
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
  margin-top: 1vw;
  width: 50vw;
  height: 4vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.details>button {
  position: absolute;
  margin-left: 65vw;
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

.details2>button {
  position: absolute;
  margin-left: 12vw;
  margin-bottom: 15vh;
  font-size: 0.8vw;

  border-radius: 10px;
  border: 1px solid rgba(56, 20, 15, 0.5);
  background-color: rgba(251, 189, 5, 0.856);
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




.titlebox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 8vh;
  margin-top: 5vh;
}

button:hover {
  border: 1px solid rgba(255, 34, 56, 0.8);
  background-color: rgba(255, 34, 56, 0.838);
  cursor: pointer;
}

.titlebox>h2 {
  position: absolute;
  left: 45%;
  top: 14%;
  color: rgb(8, 7, 4);
  font-size: 2.5vw;
}

h1 {
  position: relative;
  color: rgb(13, 13, 12);
  font-size: 1vw;
  margin-left: 2vw;
}

.titlebox>button {
  position: absolute;
  margin-top: 1vh;
  margin-right: 50vw;
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

.details>h11 {
  position: absolute;
  left: 70vw;
  font-size: 1vw;
}
</style>
  