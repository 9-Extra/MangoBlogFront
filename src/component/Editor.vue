<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import { reactive, ref } from "vue"
import { upload_flie } from "@/utils/file_util";
import popup_message from "@/utils/message_popup";
import { blog_edit, blog_new, get_blog_content, type Blog, type CodeInfo } from "@/utils/utils"

function get_blog_id(): number | null {
    let params = new URLSearchParams(document.location.search.substring(1))
    let str = params.get("id")
    if (!str) return null
    let id: number = parseInt(str)
    if (isNaN(id)) return null
    return id
}

async function error_exit(msg: string) {
    popup_message(msg, "error")
    await setTimeout(() => {
        location.href = "/#/Me"
    }, 2000);
}

//开始
let blog: Blog = reactive({
    id: 0,
    authorid: 0,
    status: 0,
    description: "",
    content: ""
})

let id: number | null = get_blog_id()
if (id == null) {
    //如果id不存在，认为是新建博客
    await blog_new().then(
        response => {
            if (response.data.code != 0) {
                error_exit("新建博客失败: " + response.data.message)
            } else {
                blog.id = response.data.data;
            }
        }
    ).catch(
        err => {
            error_exit("新建博客失败: " + err.message)
        }
    )
}

await get_blog_content(blog.id as number).then(
    response => {
        let result = response.data;
        if (result.code != 0) {
            error_exit("博客内容加载失败: " + result.message)
        } else {
            blog.id = result.data.id
            blog.authorid = result.data.authorid
            blog.status = result.data.status
            blog.description = result.data.description
            blog.content = result.data.content
        }
    }
).catch(err => {
    error_exit("博客内容加载失败: " + err.message)
})

let upload_process = ref(0)
let is_uploading = ref(false)

function event_file_upload_click() {
    let files = (document.getElementById('upload_file_id') as HTMLInputElement | null)?.files as FileList;
    if (files && files.length > 0) {
        is_uploading.value = true

        upload_flie(files[0], "/file/upload?id=" + blog.id, upload_process).then(
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

function event_post_click() {
    blog_edit(blog.id, "默认描述", blog.content).then(
        response => {
            let result = response.data as CodeInfo<number>
            if (result.code != 0) {
                popup_message("提交出错" + result.message, "error");
            } else {
                popup_message("提交成功", "success");
            }
        }
    ).catch(err => {
        popup_message("提交出错", "error");
    });

}

</script>

<template>
    <div id="main">
        <input class="style_file_content" accept="*" type="file" id="upload_file_id" />
        <button @click=event_file_upload_click>上传</button>
        <progress v-if=is_uploading :value=upload_process max=1.0></progress>
        <editor.mavonEditor v-model="blog.content"/>
        <button @click=event_post_click>发布</button>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 90vh;
}
</style>
  