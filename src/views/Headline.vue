

<script setup lang="ts">
</script>

<template>
    <div class="header">

        <RouterLink to="/" active-class="active">首页</RouterLink>
        <RouterLink to="/BlogSend" active-class="active">发布</RouterLink>
        <RouterLink to="/Register" active-class="active">注册</RouterLink>
        <RouterLink to="/Login" active-class="active">登录</RouterLink>

    </div>

</template>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.header {
    background: #ffd500;
    height: 50px;

    display: flex;
    justify-content: end;
    align-items: center;
}

.header > a {
    text-decoration: none;

    transition: 0.3s;

    color: rgb(1, 15, 18);
    font-size: 20px;
    text-shadow: none;

    margin: auto 30px;
}

.header > a:hover {
    color: green;
}


.header > a.active {
    color: green;
    transition: 0s;
}
</style>

