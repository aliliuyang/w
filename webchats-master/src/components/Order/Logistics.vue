<template>
	<div id="logistics">
    <mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :auto-fill="false" ref='loadmore' :bottomDistance=150>
      <div>
      <div class="number">
        <p>订单编号:&nbsp;<span>{{order.jdOrderId}}</span></p>
        <!--<p>国内承运人：&nbsp;京东快递</p>-->
      <!--	<p>预计送达：&nbsp;<span>10月16日</span></p>-->
      </div>
      <div class="all">
        <ul>
          <li v-for="item in arr"><div class="line"><i ></i></div><div class="address">{{item.content}}<p>{{item.msgTime}}</p></div></li>
        </ul>
      </div>
      </div>
    </mt-loadmore>
	</div>

</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	const Logistics = {
	  	name: 'Logistics',
	  	data () {
	    	return {
				order:{},
				arr:[]
	    	}
	  	},
	  	methods:{
        loadBottom(){
          this.page++
          this.init()
        },
        init(){
          var that =this
          var token = localStorage.getItem("token")
          var btocorderid=this.$route.params.btocorderid;
          axios.post(BASE_URL +'/index.php?r=user/getDelivery',qs.stringify({
            btocorderid:btocorderid,
            token:token
          })).then(function(data){
            var a = JSON.parse(Base64.decode(data.data))
            that.order=a.data.result
            that.arr =that.order.orderTrack.reverse()

          }).catch(function(err){

          })
        }

	  	},
	  	mounted(){
        this.isgologin()
        this.init()
		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}
	export default Logistics
</script>

<style scoped lang="scss">
#logistics{
	.number{
		background: #fff;
		padding:0 0.75rem;
		padding-bottom: 0.7rem;
		font-size: 0.55rem;
		font-weight: 600;
		color: #333;
		p{
			padding-top: 0.7rem;
		}
	}
	.all{
		margin-top: 0.5rem;
		background: #fff;
		li:nth-of-type(1){
			.line{
				i{
					background: #FF3737;
					box-shadow: 0 0 5px 5px #fed1d1;
				}

			}
			.address{
				color: #333
			}
		}
		ul{
			display: flex;
			flex-direction: column;
			li{
				position: relative;
				font-size: 0.6rem;
				padding-right: 0.75rem;
				color: #999;
				padding-top: 0.25rem;
				line-height: 1.15rem;
				display: flex;
				justify-content: space-between;
				.address{
					flex:1;
					padding-bottom: 0.5rem;
					border-bottom: 1px solid #eee;
					p{
						color: #999;
					}
				}
				.arrive{
					color: #333;
				}
				.line{
					width: 2rem;
					height: 100%;
					position: relative;
					text-align: center;
					i{
						position: absolute;
						left:0.8rem;
						top: 0.4rem;
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background: #999;
						border-radius: 50%;
					}
					.arrive-line{
						background: #FF3737;
						box-shadow: 0 0 5px 5px #fed1d1;
					}
				}


			}
			li::after{
			    content: "\20";
			    display: block;
			    width: 1px;
			    height: 100%;
			    background: #999;
			    position: absolute;
			    top: 1rem;
				left:0.95rem;
			}
			li:last-child::after{
				height: 0;
			}

		}
	}

}


</style>
