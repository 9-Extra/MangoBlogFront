<template>
	<div>
		<router-link to='/'> Home</router-link>
		<button @click="toAbout(1)">toAbout</button>
		<button @click="toAbout(2)">toAbout2</button>
 
	</div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'
 
export default defineComponent({
	name: "Home",
	setup() {
        // useRouter相当于vue2的this.$router
        const router = useRouter();
 
        // ts语法，要先声明参数类型，不然会报错
        const toAbout = (ids:number) => {
            router.push({
                path:'/',
                query:{
                    id:ids
                }
            })
        }
 
        return { toAbout } // 要记得return该方法出去 
    },
});
</script>
 
<style scoped>
</style>