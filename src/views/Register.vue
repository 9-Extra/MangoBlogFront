<script setup lang="ts">
import { ref, reactive } from "vue"
import api from "../utils/axios_blog";
import popup_message from "../utils/message_popup";
import { useRouter } from 'vue-router'
import token_util from "@/utils/token_util";

interface PersonInfo {
    nick_name: string
    age: string
    password: string
}

interface CodeInfo<T> {
    code:string
    message: string
    data : T
}

interface LoginResponseData {
    user_id: number
    token: string,
}

interface PersonInfoL {
    id: string
    password: string
}

let person: PersonInfo = reactive(
    {
        nick_name: "",
        age: "",
        password: ""
    }
)

let personL: PersonInfoL = reactive(
    {
        id: "",
        password: ""
    }
)


const router = useRouter();
function event_register_click() {


    if (person.nick_name.length < 3) {
        popup_message("昵称太短", "warn")
        return
    }
    let age = parseInt(person.age)
    if (isNaN(age) || age > 150 || age < 5) {
        popup_message("请输入正确的年龄", "error")
        return
    }
    if (person.password.length < 6) {
        popup_message("请输入正确的密码", "error")
        return
    }

    let person_data = {
        nick_name: person.nick_name,
        age,
        password: person.password
    }

    let person_dataL = {
        id: personL.id,
        password: person.password
    }

    

    api.post("/register", person_data).then(response => {
        let data = response.data;
        if (data.code != 0){
            popup_message("注册失败: " + data.message, "error")
        } else {
            popup_message("注册成功 id:" + data.data, "success")
            popup_message("正在登录", "success")
            person_dataL.id = data.data

        api.post("/login", person_dataL).then(response => {
        let data = response.data;
        if (data.code != 0){
            popup_message("登录失败: " + data.message, "error")
        } else {
            let info: CodeInfo<LoginResponseData> = response.data;
            
            token_util.set_token(info.data.token)

            popup_message("登录成功", "success");
            router.push({name:"Blogs",params:{id:person_dataL.id}})
            
        }
        }).catch(error => {
            popup_message("登录失败: " + error.message, "error")

        })
        }

    }).catch(error => {
        popup_message("注册失败: " + error.message, "error")
    })
}



</script>

<template>
    <body>
            <div class="box">
            <h2>注册</h2>
            <div>
                <div class="input-box">
                    <label>昵称</label>
                    <input class="" type="text" placeholder="昵称" v-model=person.nick_name />
                </div>
                <div class="input-box">
                    <label>年龄</label>
                    <input class="" type="text" placeholder="年龄" v-model=person.age />
                </div>
                <div class="input-box">
                    <label>密码</label>
                    <input class="" type="text" v-model=person.password />
                </div>
                </div>
                    <button @click=event_register_click>注册</button>
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
    width: 500px;
    height: 400px;

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
    font-size: 40px;
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
    color: rgba(241, 233, 233, 0.9);
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
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
}

.box > button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);
}
</style>
