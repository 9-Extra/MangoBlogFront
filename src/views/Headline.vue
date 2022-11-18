

<script setup lang="ts">

</script>

<template>
    <div class="header">
        <ul>
            <router-link to="/Blogs/0" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
                    <a :href="href" @click="navigate">首页</a>
                </li>
            </router-link>
            <router-link to="/BlogSend" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
                    <a :href="href" @click="navigate">发布</a>
                </li>
            </router-link>
            <router-link to="/Register" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
                    <a :href="href" @click="navigate">注册</a>
                </li>
            </router-link>
            <router-link to="/Login" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
                    <a :href="href" @click="navigate">登录</a>
                </li>
            </router-link>
            <router-link to="/Me" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isActive && 'active', isExactActive && 'router-link-exact-active']">
                    <a :href="href" @click="navigate">个人主页</a>
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
    height: 50px;
}

.header>ul {
    display: inline;
    list-style: none;
}

.header>ul>li {
    float: right;
    height: 50px;

    transition: 0.3s;

    padding-top: 10px;
    border-radius: 0px;

}

.header>ul>li.active{
    transition: 0s;
    border-radius: 10px;
    background-color: blue;
}

.header>ul>li:hover {
    border-radius: 10px;
    background-color: blue;
}

.header>ul>li>a {
    text-decoration: none;

    color: rgb(1, 15, 18);
    font-size: 20px;
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

