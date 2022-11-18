<script setup lang="ts">
import editor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import {ref} from "vue"

let editor_text = ref("")

function event_post_click(){
    console.log(editor_text.value)


}

</script>

<template>
    <div id="main">
        <editor.mavonEditor v-model="editor_text"/>
        <button @click=event_post_click>登录</button>
    </div>
</template>

<style scoped>
@charset "utf-8";

#main {
    height: 100vh;
}

</style>
  