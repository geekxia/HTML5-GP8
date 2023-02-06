<template>
	<view class="">
		<view class="">
			登录页面（只在App中显示）
		</view>
		<button @click="submit(1)">一键登录</button>
		<button @click="submit(2)">微信登录</button>
		<button @click="submit(3)">QQ登录</button>
		<button @click="submit(4)">微博登录</button>		
	</view>
</template>

<script>
	export default {
		methods: {
			submit (flag) {				
				// if (flag === 1) {
				// 	// 一键登录
				// 	uni.login({
				// 		provider: 'univerify',
				// 		univerifyStyle: { 
				// 			fullScreen: true
				// 		},
				// 		success (res) {}
				// 	})
				// } else {
				// 	// 其它的oAuth2登录
				// 	uni.login({
				// 		success (res) {}
				// 	})
				// }
				
			}
		}
	}
</script>

<style>
</style>