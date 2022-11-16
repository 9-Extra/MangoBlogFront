
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'
import api from "../utils/axios_blog";
import Login from './Login.vue';
import BlogSend from './BlogSend.vue';
import Register from './Register.vue';
import Headline from './Headline.vue'
const route = useRouter();
const route1 = useRoute();


interface CodeInfo<T> {
    code: string
    message: string
    data: T
}

interface sendmsg {
    tokens: string
    ids: string
}

let token: CodeInfo<string> = reactive(
    {
        code: "",
        message: "",
        data: ""
    }
)


// 传递的方法
let registervisible = ref<boolean>(true);
let loginvisible = ref<boolean>(false);
let sendvisible = ref<boolean>(false);
let tokensend = ref<string>("");
let idsend = ref<Number>(0);





</script>

<template>



  <Headline v-model:registershow="registervisible" v-model:loginshow="loginvisible" v-model:sendshow="sendvisible"></Headline>

  <Register v-show="registervisible" v-model:ids="idsend"></Register>
  <Login v-show="loginvisible" v-model="tokensend" v-model:ids="idsend"></Login>
  <BlogSend v-show="sendvisible" v-model:ids="idsend" v-model:modelValue="tokensend"></BlogSend>


</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
