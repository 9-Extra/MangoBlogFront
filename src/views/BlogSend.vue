<script setup lang="ts">
import { ref, reactive } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { parseStringStyle } from "@vue/shared";
import Login from "./Login.vue";
const route = useRouter();
const route1 = useRoute();

interface BlogInfo {
    author_id: string
    description: string
    content: string
}

interface Props {
  modelValue?: string;
  ids?: Number;
}
let props = withDefaults(defineProps<Props>(), {
  modelValue: "" ,// v-model绑定的属性值
  ids: undefined
});

let blog: BlogInfo = reactive(
    {
        author_id: "",
        description: "",
        content: ""
    }
)

function event_blog_send(){
    let blog_data = {
        author_id: props.ids,
        description: blog.description,
        content: blog.content
    }
    
    api.post("/post", blog_data).then(response => {
        popup_message("发布成功", "success")
    }).catch(error => {
        popup_message("发布失败: " + error.message, "error")
    })
}


</script>

<template>
    <body>
        
        <div class="input-box">
            <label>描述</label>
            <input class="" type="text" placeholder="请输入文本描述" v-model=blog.description />
        </div>
        <div class="input-box">
            <label>内容</label>
            <input class="" type="text" placeholder="请输入文本内容" v-model=blog.content />
        </div>
        <div>
            <button @click=event_blog_send>发布</button>
        </div>

        <div class="login">
            {{modelValue}}
        </div>
        <div class="login">
            {{ids}}
        </div>

    </body>



</template>

<style scoped>
body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;

    background-size: cover;/*合在一起写的时候无法识别 */
    background-attachment: fixed;
    background-position: center;
    background-origin: border-box;
}

.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 400px;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);
} 

.input-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin: 1em;
}

.input-box > label {
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.9);
    font-size: 15px;
}

.input-box > input {
    color: rgba(0, 0, 0, 0.9);
    font-size: 15px;
    height: 1.5em;
    width: 12em;
    opacity: 0.5;
    border: 5px solid rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    transition: 1s;
    outline: none;
    padding: 0 10px;
}
.input-box > input:focus,
.input-box > input:hover {
    color: rgba(0, 0, 0, 0.9);
    opacity: 0.7;
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

.box > button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.4);
}
</style>