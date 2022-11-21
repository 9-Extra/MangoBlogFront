<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import { reactive, ref, watch, type Ref } from "vue"
import { upload_flie } from "@/utils/file_util";
import popup_message from "@/utils/message_popup";
import { blog_edit, blog_post, blog_new, get_blog_content, type Blog, type CodeInfo } from "@/utils/utils"
import api from "@/utils/axios_blog";

const md = ref(null) as Ref<any>//获取的editor子组件对象
//定义各种函数
async function img_add(pos, file) {
    upload_flie(file, "/file/upload?id=" + blog.id, upload_process).then(
        response => {
            let url = response.data.data;
            md.value.$img2Url(pos, api.getUri() + "/image/download" + url);
        }
    ).catch(err => {
        popup_message("上传图片失败: " + err.message, "error")
        md.value.$img2Url(pos, "");
        md.value.$refs.toolbar_left.$imgDelByFilename(pos)
    });

}

function img_del(pos, file) {
    //什么都不做
}

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

let s_img_dropdown_open = ref(false)
let img_timer: Ref<number | undefined> = ref(undefined)

function $mouseenter_img_dropdown() {
    if (md.value.editable) {
        clearTimeout(img_timer.value)
        s_img_dropdown_open.value = true
    }
}

function $mouseleave_img_dropdown() {
    img_timer.value = setTimeout(function () {
        s_img_dropdown_open.value = false
    }, 200)
}

let toolbars = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true, // 预览
}

//开始
let blog: Blog = reactive({
    id: 0,
    authorid: 0,
    status: 0,
    description: "",
    content: ""
})

watch(() => blog.content, (newValue, oldValue) => {
    let first_line = newValue.split('\n')[0]
    if (first_line.startsWith("#")) {
        let title = first_line.split(' ')[1]
        blog.description = title ? title : "";
    } else {
        blog.description = first_line
    }
})

watch(() => blog.description, (newValue, oldValue) => {
    document.title = blog.description
})


//如果id不存在，认为是新建博客，如果id存在则打开
{
    let id: number | null = get_blog_id()
    if (id == null) {
        await blog_new().then(
            response => {
                if (response.data.code != 0) {
                    error_exit("新建博客失败: " + response.data.message)
                } else {
                    let id = response.data.data;
                    history.replaceState({}, document.title, "?id=" + id)
                    blog.id = id;
                }
            }
        ).catch(
            err => {
                error_exit("新建博客失败: " + err.message)
            }
        )
    } else {
        blog.id = id;
    }
}

await get_blog_content(blog.id).then(
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

            document.title = blog.description
        }
    }
).catch(err => {
    error_exit("博客内容加载失败: " + err.message)
})

let upload_process = ref(0)
let is_uploading = ref(false)

function event_video_upload(event) {
    let files = event.currentTarget.files as FileList;
    if (files && files.length > 0) {
        is_uploading.value = true

        upload_flie(files[0], "/file/upload?id=" + blog.id, upload_process).then(
            response => {
                let url = api.getUri() + "/image/download" + response.data.data;
                console.log("视频上传成功")
                blog.content += `\n<video id=\"video\" controls=\"\" preload=\"none\" poster=\"封面\" controls><source src = \"${url}\" type = \"${files[0].type}\"></videos>`
                is_uploading.value = false
            }
        ).catch(
            err => {
                popup_message("视频上传失败: " + err.message, "error");
                is_uploading.value = false
            }
        )

    } else {
        popup_message("文件无效", "error");
    }

}

function event_edit_click() {
    blog_edit(blog.id, blog.description, blog.content).then(
        response => {
            let result = response.data as CodeInfo<number>
            if (result.code != 0) {
                console.log(blog)
                popup_message("保存出错" + result.message, "error");
            } else {
                popup_message("保存成功", "success");
            }
        }
    ).catch(err => {
        popup_message("保存出错", "error");
    });
}

function event_post_click() {
    event_edit_click()
    blog_post(blog.id).then(
        response => {
            let result = response.data as CodeInfo<number>
            if (result.code != 0) {
                popup_message("发布出错: " + result.message, "error");
            } else {
                popup_message("发布成功", "success");
            }
        }
    ).catch(
        err => {
            popup_message("后端出错: " + err.message, "error");
        }
    );
}

</script>

<template>
    <div id="main">
        <editor.mavonEditor id="editor" ref="md" @imgAdd=img_add @imgDel=img_del @save=event_edit_click
            v-model="blog.content" :toolbars=toolbars>
            <template v-slot:left-toolbar-after>
                <div @mouseleave="$mouseleave_img_dropdown" @mouseenter="$mouseenter_img_dropdown"
                    class="op-icon fa fa-mavon-upload-video dropdown-wrapper" aria-hidden="true" title="上传视频">
                    <transition name="fade">
                        <div class="op-image popup-dropdown" v-show="s_img_dropdown_open"
                            @mouseleave="$mouseleave_img_dropdown" @mouseenter="$mouseenter_img_dropdown">
                            <div class="dropdown-item" style="overflow: hidden">
                                <input type="file" accept="video/*" @change="event_video_upload($event)" multiple />
                                上传视频
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
        </editor.mavonEditor>
        <div id="operation">
            <button @click=event_edit_click>保存</button>
            <button @click=event_post_click>发布</button>
            <input class="style_file_content" accept="*" type="file" id="upload_file_id" />
            <button @click=event_video_upload>上传</button>
            <progress v-if=is_uploading :value=upload_process max=1.0></progress>
        </div>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 100vh;
}

#editor {
    height: 90%;
}

#operation {
    float: right;

}

.dropdown-wrapper {
    position: relative;
    cursor: pointer;
}

.popup-dropdown {
    position: absolute;
    display: block;
    background: #fff;
    top: 32px;
    left: -45px;
    min-width: 130px;
    z-index: 1600;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    cursor: pointer;
}

.dropdown-item {
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #606266;
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    white-space: pre-line;
}

.dropdown-item:hover {
    color: rgb(37, 36, 36);
    background-color: #f0f0f0;
}

input[type=file] {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    overflow: visible;
    cursor: pointer;


}

.fa-mavon-upload-video::before {
    content: url("/video.ico");
}

.markdown-body video {
    width: 50%;
    height: auto;
}
</style>
  