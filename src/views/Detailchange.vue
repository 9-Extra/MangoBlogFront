<template>

    <body>
        <div class="titlebox">
            <button class="returnbox" @click="backblogs">返回</button>
            <h1>个人资料</h1>
        </div>
        <div class="box">
            <div class="namebox">
                <h2>昵称:</h2>
                <h3>{{user.nickname}}</h3>
                <div class="input-box">
                    <input class="" type="text" placeholder="请输入想要修改的昵称" v-model=nameipas.nickname />
                </div>
                <button @click="sendname">修改</button>
            </div>
            <div class="agebox">
                <h2>年龄:</h2>
                <h3>{{user.age}}</h3>
                <div class="input-box">
                    <input class="" type="text" placeholder="请输入想要修改的年龄" v-model=ageipas.age />
                </div>
                <button @click="sendage">修改</button>
            </div>

            

            <div class="headbox">
                <h2>头像修改:</h2>
                <input accept="image/*" type="file" id="upload_file_id" />
                
                <button @click="event_upload_profile_click">更改头像</button>
            </div>
            <div class="pswbox">
                <h2>密码修改:</h2>

                <div class="newandold">
                <div class="input-box">
                    <label>旧密码:</label>
                    <input class="" type="password" placeholder="请输入旧密码" v-model=sendpas.old_password />
                </div>

                <div class="input-box">
                    <label>新密码:</label>
                    <input class="" type="password" placeholder="请输入新密码" v-model=sendpas.new_password />
                </div>

                </div>
                <button @click="showconf">修改密码</button>
            </div>
            <div class="fugai" v-show="showconfirm">
                    <div class="confirm">
                    <c1>确定要修改密码吗?</c1>
                    <div class="bt2s">
                        <button @click="yesdelete">确定</button>
                        <button @click="nodelete">取消</button>
                    </div>

                    </div>
                    </div>
        </div>
        
            

        <div class="buttonbox">
            <button @click="event_logout_click">退出登录</button>
            
        </div>
    </body>
</template>

<script setup lang="ts">
import { get_user_information, upload_head_image, type User } from '@/utils/user_util';
import token_util from "@/utils/token_util";
import router from '@/router';
import { ref, reactive, type Ref } from "vue"
import popup_message from '@/utils/message_popup';
import BlogList from '@/component/BlogList.vue';
import type { CodeInfo } from '@/utils/utils';
import Collection from './Collection.vue';
import api from '@/utils/axios_blog';

interface nandold{
    old_password:string
    new_password:string
}

let sendpas:nandold = reactive(
    {
        old_password: "",
        new_password: ""
    }
)

interface namei{
    nickname:string
}

interface agei{
    age:string
}

let nameipas:namei = reactive({
    nickname:""
})

let ageipas:agei = reactive({
    age:""
})

function flashpage(){
get_user_information().then(
    user_rep => {
        user.id = user_rep.id
        user.nickname = user_rep.nickname
        user.age = user_rep.age
        user.headImageUrl = user_rep.headImageUrl
        user.privilege = user_rep.privilege
    }
)
.catch(err => {
    popup_message("后端异常: " + err.message, "error")
    router.replace("/Login")
})
}

flashpage()

let showconfirm = ref(false)
function showconf(){
    showconfirm.value = true;
}

function yesdelete(thisbid){
    sendnew();
    showconfirm.value = false;
}

function nodelete(){
    showconfirm.value = false;
}

function sendname(){
    let name_data:namei={
        nickname: nameipas.nickname
    }
    api.post("/nickname/edit",name_data).then(response => {
        if(response.data.code == 0){
        popup_message("修改成功", "success"); 
        router.go(0) }
        else popup_message("修改失败: " + response.data.message, "error")
    }).catch(error => {
        popup_message("修改失败: " + error.message, "error")
    })
}

function sendage(){
    let age_data:agei={
        age: ageipas.age
    }
    api.post("/age/edit",age_data).then(response => {
        if(response.data.code == 0){
        popup_message("修改成功", "success");
        router.go(0); }
        else popup_message("修改失败: " + response.data.message, "error")
    }).catch(error => {
        popup_message("修改失败: " + error.message, "error")
    })
}

function sendnew(){
    let pas_data: nandold = {
        old_password: sendpas.old_password,
        new_password: sendpas.new_password
    }

    api.post("/password/edit",pas_data).then(response => {
        //console.log(response)
        if(response.data.code == 0){
        
        popup_message("修改成功", "success");  
        router.go(0)
    }
        else{popup_message("修改失败: " + response.data.message, "error")}
        
    }).catch(error => {
        popup_message("修改失败: " + error.message, "error")
    })
}


function event_logout_click(){
    token_util.set_token(null);
    router.push("/Login")
}

function backblogs(){
        router.push("/Me") 
    }

function event_upload_profile_click(){
    let files = (document.getElementById('upload_file_id') as HTMLInputElement | null)?.files as FileList;
    if (files && files.length > 0){
        upload_head_image(files[0]).then(
            response => {
                let result: CodeInfo<null> = response.data
                if (result.code != 0){
                    popup_message("上传头像失败: " + result.message, "error")
                } else {
                    router.go(0)//刷新页面
                }
            }
        ).catch(err => {
            popup_message("上传头像失败: " + err.message, "error")
        })
    } else {
        popup_message("文件无效", "error")
    }
}

if (!token_util.get_token()) {
    router.replace("/Login")
}

let user: User = reactive({
    id: 0,
    nickname: '',
    age: 0,
    headImageUrl: '',
    privilege: ''
})




</script>

<style scoped>
@charset "utf-8";

* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
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
    flex-direction: column;
    justify-content: right;
    align-items: center;
    width: 35vw;
    height: 80vh;
    margin-top: 1vh;

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    background-color: rgb(250, 223, 170);

    backdrop-filter: blur(10px);


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
.namebox{
    margin-top: 6vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.namebox > h2{
    position: absolute;
    font-size: 2vw;
    left: 2vw;
    top: 1vh;
}

.namebox > h3{
    position: absolute;
    font-size: 2vw;
    top: 1vh;
}

.namebox > button{
    position: absolute;
    font-size: 1vw;
    top: 8vh;

    margin: 10px;
    width: 5vw;
    height: 4vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 0.8vw;

    right: 2vw;
}
.agebox{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 10vh;
}

.agebox > h2{
    position: absolute;
    font-size: 2vw;
    left: 2vw;
    top: 20vh;
}

.agebox > h3{
    position: absolute;
    font-size: 2vw;
    top: 20vh;
}

.agebox > button{
    position: absolute;
    font-size: 1vw;
    top: 28vh;

    margin: 10px;
    width: 5vw;
    height: 4vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 0.8vw;

    right: 2vw;
}


.headbox{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    margin-top:4vh;
    height: 35vh;
    width: 33vw;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    background-color: rgb(218, 211, 198);
}

.headbox > h2{
    position: absolute;
    font-size: 2vw;
    left: 2vw;
    top: 43vh;
}
.headbox > input{

    position: absolute;
    left: 15vw;
    top: 45vh;  
}

.headbox > button{
    position: absolute;
    font-size: 1vw;
    top: 44vh;

    margin: 10px;
    width: 4vw;
    height: 3vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 0.6vw;
    right: 5vw;
}

.pswbox{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;


}

.newandold{
    position: absolute;
    font-size: 2vw;
    left: 2vw;
    top: 56vh;
}

.pswbox > h2{
    position: absolute;
    font-size: 2vw;
    left: 2vw;
    top: 51vh;
}

.pswbox > button{
    position: absolute;
    font-size: 2vw;
    top: 68vh;

    margin: 10px;
    width: 5vw;
    height: 4vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 0.6vw;
    right: 1vw;
}


.titlebox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 8vh;
    margin-top: 8vh;

    background-color: rgb(250, 171, 34);

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);


}

.titlebox > button{
    margin: 10px;
    width: 5vw;
    height: 4vh;
    border-radius: 20px;
    border: 1px solid rgba(56, 20, 15, 0.5);
    background-color: rgba(251, 189, 5, 0.856);
    color: rgba(2, 2, 0, 0.7);
    transition: 1s;
    font-size: 0.8vw;

    position: absolute;
    margin-right: 60vw;
}


h1 {
    position: relative;
    top: 1/2vh;
    color: rgb(13, 13, 12);
    font-size: 3vw;
}

#list_continer {
    width: 80vw;
    height: 70%;

    margin-left: 40px;
}

.buttonbox>button {
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

button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);

    cursor: pointer;
}

.input-box {
    width: 30vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

}

.input-box > label {
    margin-right: 10px;
    color: rgba(77, 48, 0, 0.9);
    font-size: 1vw;
}

.input-box > input {
    color: rgba(0, 0, 0, 0.9);
    font-size: 1vw;
    height: 4vh;
    width: 15vw;
    opacity: 0.5;
    border: 5px solid rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    transition: 1s;
    outline: none;
    padding: 0 10px;
}


</style>