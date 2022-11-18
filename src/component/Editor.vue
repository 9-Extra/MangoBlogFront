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
  