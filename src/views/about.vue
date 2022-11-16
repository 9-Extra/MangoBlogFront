<template>
	<div>About- {{ id }}</div>
</template>
 
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
 
export default defineComponent({
	name: "About",
	setup(props) {
        // useRoute 相当于vue2的this.$route。用于获取页面传递的参数
		const route = useRoute();
		let { id } = route.query;
 
		return { id };
	},
});
</script>
 
<style scoped>
</style>