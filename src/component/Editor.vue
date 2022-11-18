<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import {ref} from "vue"

function get_blog_id(): number | null {
    let params = new URLSearchParams(document.location.search.substring(1))
    let str = params.get("id")
    if (!str) return null
    let id: number = parseInt(str)
    if (isNaN(id)) return null
    return id
}

let blog_id = ref(get_blog_id())
if (blog_id.value == null){
    window.location.href = "/#/Me"//如果id错误就跳转回个人主页
}

let editor_text = ref("")

function event_post_click(){
    console.log(editor_text.value)


}

</script>

<template>
    <div id="main">
        <button @click=event_post_click>上传</button>
        <editor.mavonEditor v-model="editor_text"/>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 90vh;
}

</style>
  