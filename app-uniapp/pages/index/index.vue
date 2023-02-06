<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view v-text='name'></view>
		<u-button text="点击" type="primary" @click="change"></u-button>
		<u--input
		    placeholder="请输入内容"
		    border="surround"
		    v-model="hello"
		/>
		<!--  #ifdef APP-PLUS -->
		<view class="notice">
			通知栏
		</view>
		<!--  #endif -->
		<view v-for='(item) in list' :key='item.id'>
			<view v-text='item.title' @click="skipToArticle(item)"></view>
		</view>
		<view class="" v-for='item in goodList' :key='item.id'>
			<view v-text='item.name' @click="skipToArticle(item)">
				
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				hello: '',
				list: [
					{ id: 1, title: '第一篇文章' },
					{ id: 2, title: '第二篇文章' },
					{ id: 3, title: '第三篇文章' },
				],
				goodList: [
					{ id: '62b4340a9f264b0e34021057', name: '千锋水杯' },
					{ id: '628743ed9bd56f5f781eb85c', name: '千锋书包' }
				]
			}
		},
		computed: {
			...mapState('user', ['name'])
		},
		onLoad() {

		},
		
		methods: {
			...mapMutations('user', ['changeName']),
			change () {
				this.changeName('张三')
			},
			skipToArticle (item) {
				uni.navigateTo({
					url: '/pages/article/article?id='+item.id
				})
			}
		},
		onReady () {
			console.log('---ready')
			// console.log('---this name ', this.$store.state.user.name)
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	$c: red;

	.title {
		font-size: 36rpx;
		color: $c;
	}
	
	/* #ifdef APP-PLUS */
	.notice {
		color: red;
	}
	/* #endif */
</style>
