<template>
	<div class="CZrecord">
		<div class="recordNav">
			<div @click="timesort" class="time">
				<p>按时间</p>
				<img v-bind:src='"../../assets/images/"+time+".png"'/>
			</div>
			<div @click="moneysort" class="money">
				<p>按金额</p>
				<img v-bind:src='"../../assets/images/"+ money +".png"'/>
			</div>
			<!--<div class="search-record">
				<input type="text" />
				<div class="search"></div>
			</div>-->
		</div>
		<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""'  :bottomPullText='""' :auto-fill="false" ref='loadmore'  :bottomDistance=50>
			<div class="record-list">
				<ul>
					<li v-for="iten in myRecord">
						<h4><span>充值</span><span>+{{iten.money}}</span></h4>
						<p><span>{{iten.add_time}}</span><span>中欣通</span></p>
					</li>

				</ul>
				<a href="#/main">返回</a>
				 <div slot="bottom" class="mint-loadmore-bottom"></div>
			</div>
		</mt-loadmore>

	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import { Loadmore } from 'mint-ui';
	import { MessageBox,Toast } from 'mint-ui';
	const Record ={
	  	name: 'Record',
	  	data () {
	    	return {
				time:'0',
				money:'0',
				myRecord:[],
				sort:"timed",
				page:1
	    	}
	  	},
	  	methods:{
			timesort(){
				if(this.time==0){
					this.time='1'
					this.sort="timea"
				}else{
					this.time='0'
					this.sort="timed"
				}
				this.init()

			},
			moneysort(){
				if(this.money==0){
					this.money='1'
					this.sort="moneya"
				}else{
					this.money='0'
					this.sort="moneyd"
				}
				this.init()
			},
			loadBottom(){
				this.page ++
        var that=this
        var token = localStorage.getItem("token")
        axios.post(BASE_URL+'/index.php?r=user/Rechargerecord',qs.stringify({
          page:this.page,
          sort:this.sort,
          token:token
        })).then(function(res){
          var a=res.data.data
          if(a.err ==10007){
              Toast('没有更多数据了')
          }else{
            for(var i=0;i<a.result.length;i++){
              that.myRecord.push(a.result[i])
            }
          }
          that.$refs.loadmore.onBottomLoaded();
        }).catch(function(err){

        });
			},
			getRecord(){

			},
			init(){
				var token = localStorage.getItem("token")
				var that =this
				axios.post(BASE_URL+'/index.php?r=user/Rechargerecord',qs.stringify({
		  			page:'1',
		  			sort:this.sort,
		  			token:token
		  		})).then(function(res){
		  			var a=res.data.data
		  			that.myRecord=a.result
		  		}).catch(function(err){

		        });
			}
	  	},
	  	mounted(){
	  		document.title = '充值记录'
	  		var token = localStorage.getItem("token")
	  		if(!token){
	  			MessageBox.confirm('您还未登录，现在去登录?').then(action => {
					window.location.href="#/login";
				},
				action => {
					window.location.href="#/main";
				})
	  		}else{
	  			this.init()
	  		}

		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}

	export default Record
</script>



<style scoped lang="scss">
	.CZrecord{
		.recordNav{
			position:fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-around;
			background: #fff;
			font-size: 0.65rem;
			line-height: 2.25rem;
			padding: 0 0.75rem;
			color: #333;
			padding-left:1.5rem;
			z-index:666;
			.time,.money{
				display: flex;
				justify-content: space-between;
				img{
					margin-top: 0.9rem;
					margin-left: 0.25rem;
					width: 0.3rem;
					height: 0.45rem;
				}
			}
			.search-record{
				padding: 0.375rem 0;
				input{
					height: 1.5rem;
					border-top-left-radius: 1rem;
					border-bottom-left-radius:1rem ;
					background: #f3f2f8;
					padding-left: 1rem;
					border: none;
					width: 6.15rem;
				}
				display: flex;
				.search{
					width: 1.5rem;
					height: 1.5rem;
					background: url(../../assets/images/search.png) no-repeat left center #f3f2f8;
					background-size: 80%;
					border-top-right-radius: 1rem;
					border-bottom-right-radius:1rem ;

				}
			}
		}
		.record-list{
			padding-top: 2.25rem;
			border-top: 1px solid #eee;
			ul{
				padding-left: 0.75rem;
				background: #fff;
			}
			li{

				border-bottom: 1px solid #f5f5f5;
				padding: 0.75rem 0;
				padding-right: 0.75rem;

				h4{
					display: flex;
					justify-content: space-between;
					font-size: 0.75rem;
				}
				p{
					display: flex;
					justify-content: space-between;
					font-size: 0.5rem;
					color: #666;
				}

			}
		}
		a{
			display: block;
			width: 17.25rem;
			height: 2.25rem;
			text-align: center;
			line-height: 2.25rem;
			color: #fff;
			background: #FF3737;
			margin: 0 auto;
			margin-top: 0.75rem;
			font-size: 0.75rem;
		}
	}
</style>
