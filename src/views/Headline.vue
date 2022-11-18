

<script setup lang="ts">
import router from '@/router';
import popup_message from '@/utils/message_popup';
import { get_user_information } from '@/utils/user_util';
import {blog_operation, BLOG_OPERATION, type CodeInfo} from "@/utils/utils"

async function event_post_click(){
    let user = await get_user_information();
    if (user != null){
        let data = await (await blog_operation(0, BLOG_OPERATION.NEW, undefined)).data as CodeInfo<number>;
        if (data.code != 0){
            popup_message("粗错啦" + data.message, "error");
            return;
        } else {
            window.open("/blog_editor.html?id=" + data.data);
        }
    } else {
        router.push("/Login");
    }

}
</script>

<template>
    <div class="header">
        <ul>
            <router-link to="/Blogs" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']" @click="navigate">
                    <a :href="href">首页</a>
                </li>
            </router-link>
                <li>
                    <a @click="event_post_click">发布</a>
                </li>
            <router-link to="/Register" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']" @click="navigate">
                    <a :href="href">注册</a>
                </li>
            </router-link>
            <router-link to="/Login" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']" @click="navigate">
                    <a :href="href">登录</a>
                </li>
            </router-link>
            <router-link to="/Me" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']" @click="navigate">
                    <a :href="href">个人主页</a>
                </li>
            </router-link>
        </ul>
    </div>

</template>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.header {
    position: fixed;
    width: 100vw;
    background: #ffd500;
    height: 5vh;
}

.header>ul {
    display: inline;
    list-style: none;
}

.header>ul>li {
    float: right;
    height: 5vh;

    transition: 0.3s;

    padding-top: 1vh;
    border-radius: 0px;

}

.header>ul>li.active{
    transition: 0s;
    border-radius: 1vh;
    background-color: blue;
}

.header>ul>li:hover {
    border-radius: 1vh;
    background-color: blue;
}

.header>ul>li>a {
    display: block;
    text-decoration: none;

    color: rgb(1, 15, 18);
    font-size: 2vh;
    text-shadow: none;

    margin: auto 30px;
}

.header>ul>li.active>a {
    color: white;
}

.header>ul>li:hover>a {
    color: white;
}
</style>

