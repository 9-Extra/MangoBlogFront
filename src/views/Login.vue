<script setup lang="ts">
import { ref, reactive } from "vue"
import api from "@/utils/axios_blog";
import popup_message from "@/utils/message_popup";
import "@/utils/token_util"
import token_util from "@/utils/token_util";
import { useRouter } from 'vue-router'
const router = useRouter();

interface PersonInfo {
    id: string
    password: string
}

interface CodeInfo<T> {
    code:string
    message: string
    data : T
}

let person: PersonInfo = reactive(
    {
        id: "",
        password: ""
    }
)

// 传递的方法
const emit = defineEmits<{
}>();

function event_login_click(){
    let person_data: PersonInfo = {
        id: person.id,
        password: person.password
    }

    api.post("/login", person_data).then(response => {
        let data = response.data;
        if (data.code != 0){
            popup_message("登录失败: " + data.message, "error")
        } else {
            let info: CodeInfo<string> = response.data;
            
            token_util.set_token(info.data)

            popup_message("登录成功", "success");
            router.push('/Blogs')
            
        }
    }).catch(error => {
        popup_message("登录失败: " + error.message, "error")

    })
    

}

</script>

<template>
    <body>
            <div class="box">
            <h2>登录</h2>
            <div>
                <div class="input-box">
                    <label>账号:</label>
                    <input class="" type="text" placeholder="账号" v-model=person.id />
                </div>
                <div class="input-box">
                    <label>密码:</label>
                    <input class="" type="text" placeholder="密码" v-model=person.password />
                </div>
                </div>
                    <button @click=event_login_click>登录</button>
                </div>
                
                
    </body>


</template>


<style scoped>
@charset "utf-8";
* {
    margin: 0px;
    padding: 0px;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;
    background: url("@/resources/image/Avg_cc_start.png") no-repeat;
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
    width: 60vw;
    height: 70vh;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);
} 

.box > h2 {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 10px;
    font-size: 2.5vw;
}
.input-box {
    width: 50vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin: 1em;
}

.input-box > label {
    margin-right: 10px;
    color: rgba(77, 48, 0, 0.9);
    font-size: 2vw;
}

.input-box > input {
    color: rgba(0, 0, 0, 0.9);
    font-size: 2vw;
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
    width: 15vw;
    height: 8vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 1.5vw;
}

.box > button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);
    cursor: pointer;
}
</style>
