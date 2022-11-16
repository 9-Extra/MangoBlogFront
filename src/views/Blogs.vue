<template>
    <div class="header_tabs">
        <ul>
         <li v-for="site in sites" > 

          </li>
        </ul>
      </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import { useRoute } from 'vue-router'
const route = useRouter();
let sites: [
        { text: 'Google' },
        { text: 'Runoob' },
        { text: 'Taobao' }
      ]
</script>


<style scoped>

</style>