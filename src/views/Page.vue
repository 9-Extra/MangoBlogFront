<template>


    <body>

     <div class = "titlebox">
    <h2 v-if="(auid == myid)">我的主页</h2>
    <h2 v-else>作者主页</h2>
    <h1 v-if="(auid == myid)">我的id:{{auid}}</h1>
    <h1 v-else>作者id:{{auid}}</h1>
    </div> 

      <div class = "box">
      
        <div class="blogbox">
        <table class="imagetable">
            <tr>
                <th class="ids">博客id</th>
                <th class="ids">作者id</th>
                <th class="description">简介</th>
            </tr>
            <tr v-for="blg in blogdatas" :key="blg.id">
                <td class="ids">{{ blg.id }}</td>
                <td class="ids" @click="blog_detail(blg.authorid)">{{ blg.authorid }}</td>
                <td class="description">{{ blg.description }}</td>
            </tr>
        </table>
    </div>
    

        
      </div>
    </body>
</template>
    
    <script setup lang="ts">
    import { ref, reactive } from "vue"
    import api from "../utils/axios_blog";
    import { useRouter } from 'vue-router'
    import popup_message from "../utils/message_popup";
    const router = useRouter();
    let paths = ref(router.currentRoute.value.path)
    let myid = ref(paths.value.split("/",4)[2])
    let auid = ref(paths.value.split("/",4)[3])



    let blogdatas = ref([{
        id:auid,
        authorid:auid,
        status:auid,
        description:auid,
        content:auid
    }])

    function getblog(){
        console.log(blogdatas)
        api.get("/open/blogs/?id="+auid.value).then(response => {
            blogdatas.value = response.data.data
            popup_message("加载成功", "success")
            console.log(blogdatas)
        }).catch(error => {
            popup_message("加载失败: " + error.message, "error")
        })
    }

    getblog();

    function blog_detail(aid){

    }
    </script>
    
    
    <style scoped>
    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height:100vh;
        background: url("@/resources/image/Avg_cc_start.png") no-repeat;
        background-size: cover;/*合在一起写的时候无法识别 */
        background-attachment: fixed;
        background-position: center;
        background-origin: border-box;
    }
    .box{
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

    .titlebox{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        width: 30vw;
        height: 12vh;
        margin-top: 5vh;

        background-color:rgb(250, 171, 34);
    
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    
        backdrop-filter: blur(10px);


    }
    
    h2 {
        position:relative;
        bottom: 10px;
        color: rgb(8, 7, 4);
        font-size: 3vw;
    }

    h1 {
        position:relative;
        bottom: 10px;
        color: rgb(13, 13, 12);
        font-size: 1vw;
    }
    
    .blogbox {
    
        justify-content: center;
        align-items: center;
    
        margin: 1em;
    }
    

    
    .blogbox > ul {
    
    margin-top: 20px;
    margin-right: 10px;
    font-size: 40px;
    color: rgba(213, 201, 201, 0.9);

    }

    span{
    margin-top: 10px;
    
    }
    
    .box > button{
        margin: 10px;
        width: 130px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid rgba(123, 2, 24, 0.5);
        background-color: rgba(123, 2, 24, 0.4);
        color: rgba(0,0,0,0.7);
        transition: 1s;
    }
    
table.imagetable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

table.imagetable th{
    background: rgba(255, 174, 52, 0.724)
}

table.imagetable td{
    background: rgb(255, 245, 106);
    text-align: left;
    
}
.ids {
    border-width: 1px;
    width: 8vw;
    height: 5vh;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}

.description {
    border-width: 1px;
    padding: 8px;
    width: 60vw;
    height: 5vh;
    border-style: solid;
    border-color: #999999;
    font-size: 2vw;
}
    
    </style>