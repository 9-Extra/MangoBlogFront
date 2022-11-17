

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();




interface CodeInfo<T> {
    code:string
    message: string
    data : T
}
</script>

<template>



  <div class="header">
    
    <ul style="list-style-type:none">
      <div>
      <li><RouterLink to="/">首页</RouterLink></li>
      </div>
      <div>
        <li><RouterLink to="/BlogSend">发布</RouterLink></li>
      </div>
      <div>
        <li><RouterLink to="/Register">注册</RouterLink></li>
      </div>
      <div>
        <li><RouterLink to="/Login">登录</RouterLink></li>
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

