<script setup lang="ts">
import HeadImageVue from '@/component/HeadImage.vue';
import popup_message from '@/utils/message_popup';
import token_util from '@/utils/token_util';
import { get_user_information, type User } from '@/utils/user_util';
import { ref, type Ref } from 'vue';

let user_info: Ref<User | null> = ref(null)

if (token_util.get_token() != null) {
    get_user_information().then(
        user => {
            user_info.value = user
        }
    ).catch(err => {
        //认为是未登录
    });
}

function event_new_blog_click(){
    if (user_info.value == null){
        popup_message("请先登录", "warn")
        return
    }

    window.open("/blog_editor.html")

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
                    <a href="javascript:void(0);" @click="event_new_blog_click">新建博客</a>
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
            <div class="my">
            <router-link to="/Me" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li id="head_image" :class="[isExactActive && 'router-link-exact-active']" @click="navigate">
                    <head-image-vue v-if="user_info" :head_image_url="user_info.headImageUrl" />
                    <b v-if="user_info">{{user_info.nickname}}</b>
                    <b v-else>未登录</b>
                </li>
                
            </router-link>
            </div>
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
    cursor: pointer;

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

#head_image {
    padding-top: 0px;
    float: left
}
#head_image:hover {
    background-color: inherit;
}

.my{
    flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

b{
    position: absolute;
    margin-top: 1.5vh;
}
</style>

