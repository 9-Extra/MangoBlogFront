<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import {ref} from "vue"
import { upload_flie } from "@/utils/file_util";
import popup_message from "@/utils/message_popup";

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
let upload_process = ref(0)
let is_uploading = ref(false)

function event_post_click(){
    let files = (document.getElementById('upload_file_id') as HTMLInputElement | null)?.files as FileList;
    if (files && files.length > 0){
        is_uploading.value = true

        upload_flie(files[0], "/file/upload?id=" + blog_id.value ,upload_process).then(
            response => {
                is_uploading.value = false
            }
        ).catch(
            err => {
                popup_message("文件上传失败", "error");
                is_uploading.value = false
            }
        )

    } else {
        popup_message("文件无效", "error");
    }

}

</script>

<template>
    <div id="main">
        <input class="style_file_content" accept="*" type="file" id="upload_file_id"/>
        <button @click=event_post_click>上传</button>
        <progress v-if=is_uploading :value=upload_process max=1.0></progress>
        <editor.mavonEditor v-model="editor_text"/>

        <button @click=event_post_click>发布</button>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 90vh;
}

</style>
  