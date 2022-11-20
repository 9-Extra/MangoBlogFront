<script setup lang="ts">
import HeadImageVue from '@/component/HeadImage.vue';
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
                    <a href="/blog_editor.html" target="_blank">发布</a>
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
                <li id="head_image" :class="[isExactActive && 'router-link-exact-active']" @click="navigate">
                    <head-image-vue/>
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
</style>

