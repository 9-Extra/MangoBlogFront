

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'
const route = useRouter();
const route1 = useRoute();


interface CodeInfo<T> {
    code:string
    message: string
    data : T
}


// 传递的方法

interface Props {
  registershow?:boolean;
  loginshow?:boolean;
  sendshow?:boolean;
}
let props = withDefaults(defineProps<Props>(), {
  registershow:true,
  loginshow:false,
  sendshow:false
});
const emit = defineEmits<{
  (e: "update:registershow", visible: boolean): boolean;
  (e: "update:loginshow", visible: boolean): boolean;
  (e: "update:sendshow", visible: boolean): boolean;
}>();

function event_jumpto_home() {
    //跳转页面
    route.push({path:'/Page'})
}

function event_jumpto_register() {
    emit("update:registershow", true);
    emit("update:loginshow", false);
    emit("update:sendshow", false);
}

function event_jumpto_BlogSend() {
    emit("update:registershow", false);
    emit("update:loginshow", false);
    emit("update:sendshow", true);
}

function event_jumpto_login() {
    emit("update:registershow", false);
    emit("update:loginshow", true);
    emit("update:sendshow", false);
}






</script>

<template>



  <div class="header">
    
    <ul style="list-style-type:none">
      <div>
      <li><a @click=event_jumpto_home>首页</a></li>
      </div>
      <div>
        <li><a @click=event_jumpto_BlogSend>发布</a></li>
      </div>
      <div>
        <li><a @click=event_jumpto_register>注册</a></li>
      </div>
      <div>
        <li><a @click=event_jumpto_login>登录</a></li>
      </div>
    </ul>


  </div>

</template>

<style scoped>
 .header{
   background: #ffd500;
   height: 50px;
 }

 ul{  

  display: inline;


 }
 li{

    float:right;
    width: 100px;
    margin-right: 50px;
    margin-top: 10px;

 }
 a{
    text-decoration: none;

    color: rgb(1, 15, 18);
    font-size: 20px;
    text-shadow: none;
 }
</style>

