<script setup lang="ts">
import { get_user_information, type User } from '@/utils/user_util';
import token_util from "@/utils/token_util";
import router from '@/router';
import { reactive } from 'vue';
import popup_message from '@/utils/message_popup';
import BlogList from '@/component/BlogList.vue';


function event_logout_click(){
    token_util.set_token(null);
    router.push("/Login")
}

if (!token_util.get_token()) {
    router.replace("/Login")
}

let user: User = reactive({
    id: 0,
    nick_name: '',
    head_image: '',
    status: ''
})

get_user_information().then(
    user_rep => {
        if (user_rep != null) {
            user.id = user_rep.id
            user.nick_name = user_rep.nick_name
            user.status = user.status
            user.head_image = user.head_image
        } else {
            router.replace("/Login")
        }
    }).catch(err => {
        popup_message("后端异常: " + err.message, "error")
        router.replace("/Login")
    })

</script>

<template>

    <body>
        <div class="titlebox">
            <h1>我的主页</h1>
        </div>
        <div class="box">

            <BlogList id="list_continer"></BlogList>

        </div>
        <div class="buttonbox" @click="event_logout_click">
            <button>退出登录</button>
        </div>
    </body>
</template>


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
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 1600px;
    height: 700px;

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 8vh;
    margin-top: 5vh;

    background-color: rgb(250, 171, 34);

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    backdrop-filter: blur(10px);


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

.buttonbox>button:hover {
    border: 1px solid rgba(255, 34, 56, 0.8);
    background-color: rgba(255, 34, 56, 0.838);
}
</style>
