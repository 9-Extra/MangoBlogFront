<script setup lang="ts">
import { ref, reactive } from "vue"
import api from "./utils/axios_blog";

let warning = ref("")

interface PersonInfo {
    nick_name: string
    age: string
    password: string
}

let person: PersonInfo = reactive(
    {
        nick_name: "",
        age: "",
        password: ""
    }
)

function event_register_click() {
    warning.value = ""
    if (person.nick_name.length < 3) {
        warning.value = "昵称太短"
        return
    }
    let age = parseInt(person.age)
    if (isNaN(age) || age > 150 || age < 5) {
        warning.value = "请输入正确的年龄"
        return
    }
    if (person.password.length < 6) {
        warning.value = "请输入正确的密码"
        return
    }

    let person_data = {
        nick_name: person.nick_name,
        age,
        password: person.password
    }

    api.post("/register", person_data).then(response => {
        warning.value = "已提交"
    }).catch(error => {
        warning.value = "提交失败: " + error.message
    })

}
</script>

<template>
    <header>
        <h1>注册</h1>
    </header>

    <body>
        <p><span>昵称</span><input type="text" placeholder="昵称" v-model=person.nick_name></p>
        <p><span>年龄</span><input type="text" placeholder="年龄" v-model=person.age></p>
        <p><span>密码</span><input type="text" v-model=person.password></p>
        <button @click=event_register_click>注册</button>
        <p><span color="red">{{ warning }}</span></p>
    </body>


</template>


<style scoped>

</style>
