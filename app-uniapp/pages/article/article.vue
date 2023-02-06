<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		data () {
			return {
				// 只支持app
				src: ''
			}
		},
		
		onLoad (opt) {			
			// #ifdef APP-PLUS
			const { id } = opt
			this.src = `/hybrid/html/index.html?id=${id}`
			// #endif
			
			// #ifdef MP-WEIXIN
			const { id } = opt 
			this.src = `http://localhost:8000/#/detail/${id}`
			// #endif
		}
	}
</script>

<style>
</style>