npm run <template>
  <div id="car">
  <!--	<div :class="bianji? 'ing':''">-->
	 	<p class="bianji">	<!--<span @click="bianjistatus">编辑</span>--><b class="iconfont icon-shanchu	" @click="delMyCar(value)"></b></p>
	 		<div class="car-list">
	 			<div class="car-sort" v-if="cargoods[0].carlist.length">
	 				<h3><p class="shopping-store"><!--<b clas="chack-car" class="select-goods"></b>--><img src="../assets/images/JD-log.png"/><span>京东</span></p>
		 				<!--<div class="zhekou">
		 					<div class="youfei"><p v-if="allmoney">还差xxx元免运费</p><div class="youfei"><p>已免邮</p></div> <a href="">去凑单</a></div>
		 					<div class="youhuquan">&nbsp;|&nbsp;<a @click="youhuishow">优惠券</a></div>
		 				</div>-->
		 			</h3>
		 		<!--	<div @click="zengpinshow" class="satisfy"> <img src="../assets/images/satisfy.jpg" alt="" /></div>-->
		 			<div class="car-goods" v-for="(item,index) in cargoods[0].carlist">
				 				<div class="chackid"><mt-checklist align="left" v-model="value"  :options="[item]" ></mt-checklist>
	              </div>
				 				<div class="goods-img">	<a class="my" :href="item.wxgoodshref"><img :src="item.img"/></a> </div>
				 				<div class="goods-name">
				 					<div class="name"><a :href="item.wxgoodshref">{{item.name}}</a></div>
				 					<p class="weight" v-if="item.options">属性：<span>{{item.options}}</span></p>
				 					<div class="goods-tlt">
                    <div class="lastprice">¥<b>{{item.frontPrice}}</b></div>
                    <div class="price" v-if="item.zxtprejiage != '0.00'">¥<b>{{item.zxtprejiage}}</b><span>中欣通专享价</span></div>
				 						<div class="went-number"><span class="minus"><b @click="reduceNumber([0,index,item.number-1])">-</b></span><input class="idnumber" v-model="item.number" type="tel" @blur='oba([0,index,item.number])' /><span class="add"><b @click=addNumber([0,index,(item.number*10+10)/10])>+</b></span></div>
				 					</div>
				 				</div>
			 		</div>
            <!--<div class="car-goods">
              <div class="chackid"><mt-checklist align="left" v-model="value"  :options="['14831']" ></mt-checklist>
              </div>
              <div class="goods-img"><img src="../assets/images/good_03.jpg"/> </div>
              <div class="goods-name">
                <div class="name">普莱斯2016新款眼镜框 商务纯钛眼镜架 男不夹脸超轻眼镜架726 黑色</div>
                <p class="weight">重量：<span>0.03kg</span></p>
                <div class="goods-tlt">
                  <div class="price">¥&nbsp;<b>128.50</b></div>
                  <div class="went-number"><span class="minus"><b @click="reduceNumber([0,1])">-</b></span><input class="idnumber" v-model="cargoods[0].carlist[1].number" type="text"  /><span class="add"><b @click=addNumber([0,1])>+</b></span></div>
                </div>
              </div>
            </div>-->
	 			</div>
        <div class="car-sort" v-if="cargoods[1].carlist.length">
          <h3><p class="shopping-store"><!--<b clas="chack-car" class="select-goods"></b>--><img src="../assets/images/qustore.jpg"/><span>电子卡</span></p>
            <!--<div class="zhekou">
                            <div class="youfei"><p v-if="allmoney">还差xxx元免运费</p><div class="youfei"><p>已免邮</p></div> <a href="">去凑单</a></div>
                            <div class="youhuquan">&nbsp;|&nbsp;<a @click="youhuishow">优惠券</a></div>
                        </div>-->
          </h3>
          <!--	<div @click="zengpinshow" class="satisfy"> <img src="../assets/images/satisfy.jpg" alt="" /></div>-->
          <div class="car-goods" v-for="(item,index) in cargoods[1].carlist">
            <div class="chackid"><mt-checklist align="left" v-model="value"  :options="[item]" ></mt-checklist>
            </div>
            <div class="goods-img">	<a class="my" :href="item.wxgoodshref"><img :src="item.img"/></a> </div>
            <div class="goods-name">
              <div class="name"><a :href="item.wxgoodshref">{{item.name}}</a></div>
              <p class="weight"><span>{{item.options}}</span></p>
              <div class="goods-tlt">
                <div class="lastprice">¥<b>{{item.frontPrice}}</b></div>
                <div class="price" v-if="item.zxtprejiage != '0.00'">¥<b>{{item.zxtprejiage}}</b><span>中欣通专享价</span></div>
                <div class="went-number"><span class="minus"><b @click="reduceNumber([1,index,item.number-1])">-</b></span><input class="idnumber" v-model="item.number" type="tel" @blur='oba([1,index,item.number])'/><span class="add"><b @click=addNumber([1,index,(item.number*10+10)/10])>+</b></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="car-sort" v-if="cargoods[2].carlist.length">
          <h3><p class="shopping-store"><!--<b clas="chack-car" class="select-goods"></b>--><img src="../assets/images/qustore.jpg"/><span>实体卡</span></p>
            <!--<div class="zhekou">
                            <div class="youfei"><p v-if="allmoney">还差xxx元免运费</p><div class="youfei"><p>已免邮</p></div> <a href="">去凑单</a></div>
                            <div class="youhuquan">&nbsp;|&nbsp;<a @click="youhuishow">优惠券</a></div>
                        </div>-->
          </h3>
          <!--	<div @click="zengpinshow" class="satisfy"> <img src="../assets/images/satisfy.jpg" alt="" /></div>-->
          <div class="car-goods" v-for="(item,index) in cargoods[2].carlist">
            <div class="chackid"><mt-checklist align="left" v-model="value"  :options="[item]" ></mt-checklist>
            </div>
            <div class="goods-img">	<a class="my" :href="item.wxgoodshref"><img :src="item.img"/></a> </div>
            <div class="goods-name">
              <div class="name"><a :href="item.wxgoodshref">{{item.name}}</a></div>
              <p class="weight"><span>{{item.options}}</span></p>
              <div class="goods-tlt">
                <div class="lastprice">¥<b>{{item.frontPrice}}</b></div>
                <div class="price" v-if="item.zxtprejiage != '0.00'">¥<b>{{item.zxtprejiage}}</b><span>中欣通专享价</span></div>
                <div class="went-number"><span class="minus"><b @click="reduceNumber([2,index,item.numbers-1])">-</b></span><input class="idnumber" v-model="item.number" type="tel" @blur='oba([2,index,item.number])' /><span class="add"><b @click=addNumber([2,index,(item.number*10-10)/10])>+</b></span></div>

              </div>
            </div>
          </div>
        </div>

	 		</div>
    <!--</div>-->
	 	<!--<p>{{value}}</p>-->
	 		<div class="bottom"></div>
 		<div class="car-tab" >
 				<div class="lookmoney">
 						<p class="allchack"><b class="chack-car" :class="allgoods?'select-goods':''" @click="payall"></b><span>全选</span></p>
 						<div class="allmoney">合计：<b>¥&nbsp;<span>{{allMoney}}</span></b></div>
 				</div>
 				<div class="gopay">
 					<a @click="gopay">去结算（<span>{{allNumber}}</span>）</a>
 				</div>
 		</div>
 		<div v-if="youhui||zengpin" class="zhezhao" @click="allhidden"></div>
 		<car-youhui v-if="youhui" :allhidden='allhidden'></car-youhui>
 		<car-zengpin v-if="zengpin" :allhidden='allhidden'></car-zengpin>

  </div>
</template>

<script>
import NavTab from './NavTab'
import { Checklist } from 'mint-ui';
import caryouhui from './Car/caryouhui'
import zengpin from './Car/zengpin'
import {mapState,mapActions} from 'vuex'
import axios from 'axios';
import qs from 'qs';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  name: 'Car',
  data () {
    return {
    	bianji:false,
    	youhui:false,
    	zengpin:false,
      payCar:[],
      value:[],
      allgoods:false,
    }
  },
  computed:{
  	...mapState({
      cargoods:'cargoods',

  	}),
  	allNumber(){
  		var allnumber=0
      var k=null
        for (var i = 0; i < this.value.length; i++) {
          if(this.value[i].store=='京东') {
            k=0
          }
          if(this.value[i].store=='电子卡') {
            k=1
          }
          if(this.value[i].store=='实体卡') {
            k=2
          }
          for (var j = 0; j < this.cargoods[k].carlist.length; j++) {
            if (this.value[i].sku == this.cargoods[k].carlist[j].sku) {
              allnumber += this.cargoods[k].carlist[j].number/1
            }
          }
        }
  		return allnumber
  	},
  	allMoney(){
	  		var allmoney=0
	  		for(var i=0;i<this.value.length;i++){
	  					allmoney +=this.value[i].number * this.value[i].frontPrice
	  		}
	  		return allmoney.toFixed(2)
  	},
  },
  methods:{
	    bianjistatus(){
	      this.bianji=!this.bianji;
	    },
      youhuishow(){
        this.youhui=true;
      },
      zengpinshow(){
        this.zengpin=true;
      },
      allhidden(){
        this.youhui=false
        this.zengpin=false
      },
      ...mapActions({
        addNumber:'addNumber',
        reduceNumber:'reduceNumber',
        removeCar:'removeCar',
        delCar:'delCar',
        getcar:'getcar',
        oba:'oba'
      }),
     payall(){
     		this.allgoods=!this.allgoods
       var b=[]
     		if(this.allgoods){
     		  for(var a=0;a<this.cargoods.length;a++){
            b=b.concat(this.cargoods[a].carlist)
          }
          this.value=b
     		}else{
     			this.value=[]
     		}
     },
     gopay(){
     	var that= this
     	var token = localStorage.getItem("token");
       if(that.value.length){
         axios.post(BASE_URL+'/index.php?r=shop/Update',qs.stringify({
           skuIds:JSON.stringify(that.value),
           token:token
         })).then(function(res){
           if(res.data.data.err==10002){
             window.location.href='#/submitorder'
           }
           if(res.data.data.err==10007){
             MessageBox.confirm('请你先登录').then(action => {
                 window.location.href='#/login'
               },
               action => {
                 return
               })
           }
         }).catch(function(err){

         });
       }else{
         Toast('未选中商品')
       }

		 },
		 delMyCar(value){
			 this.delCar(value)
			 this.value=[]
       // this.getcar()
		 },
     //jduserid=6K2GFJklvyMDg4ovSw

  },
  mounted(){
  	document.title = '购物车'
  	var that =this
  },
  components:{
		'car-youhui':caryouhui,
		'car-zengpin':zengpin
	}
}
</script>
<style  lang="scss">
#car::-webkit-scrollbar{display:none;}
	#car{
		width:100%;
		height: 100%;
		overflow: scroll;
		.ing{
			width: 90%;
			height: 100%;
			margin: 0 auto;
			margin-top: 0.75rem;
		}

		.chack-car{
			display: inline-block;
	  	border: 1px solid #666;
	  	height: 0.75rem;
	  	width: 0.75rem;
	  	border-radius: 50%;
		}
		.select-goods{
			background: url(../assets/images/select.png);
			background-size: 100%;
			border: none;
		}
		.bianji{
			display: flex;
			justify-content: flex-end;
			padding-right: 0.75rem;
			line-height: 2.2rem;
			background:#fff;
			font-size:0.75rem;
			color:#999;
			span{
				padding-right: 0.75rem;
				color: #333;
			}
		}
		.car-sort{
			background: #fff;
			margin-top: 0.5rem;
			h3{
				  display: flex;
				  justify-content: space-between;
				  font-weight: normal;
				  border-bottom: 1px solid #F5F5F5;
				  height: 2.2rem;
				  line-height: 2.2rem;
				  padding: 0 0.75rem;
				  .shopping-store{
				  	font-size:0.65rem;
				  	color:#333;
				  	display:flex;
				  	align-items: center;
				  	b{
				  		display: inline-block;
					  	border: 1px solid #666;
					  	height: 0.75rem;
					  	width: 0.75rem;
					  	border-radius: 50%;
					  }
					  img{
					  	height: 0.75rem;
					  	margin: 0 0.2rem 0 0.5rem;
					  }
				  	span{
				  		text-align: center;
				  	}
				  }
				  .zhekou{
				  	font-size: 0.55rem;
				  	display: flex;
				  	justify-content: flex-end;
				  	background: url(../assets/images/buzhu.png) no-repeat left center;
				  	background-size: 0.55rem;
				  	padding-left: 0.7rem;
				  	.youfei{
				  		display: flex;
				  		justify-content: flex-end;
				  		color:#999;
				  		a{
				  			color: #FF3737;
				  			margin-left: 0.5rem;
				  		}
				  	}
				  	.youhuquan{
				  		color: #eee;
				  		a{
				  			color: #FF3737;
				  		}
				  	}
				  }
			}
			.satisfy{
				img{
					width: 100%;
				}

			}
			.car-goods{
				display: flex;
				justify-content: space-between;
				padding: 0.5rem 0.75rem;
				border-bottom: 1px solid #f5f5f5;
				.chackid{
					display: flex;
					align-items: center;
				}
        .mint-checkbox-core{
          width: 0.75rem;
          height:0.75rem;
          font-size:0.75rem;
          line-height: 0.75rem;

        }
        .mint-checkbox-input:checked + .mint-checkbox-core{
          background-color:#17c461;
          border-color:#17c461;
        }
        .mint-cell{
          width: 0.75rem;
          .mint-cell-title{
            width: 0.75rem;
            padding: 0;
            margin: 0;
          }
          .mint-cell-wrapper{
            background: none;
            padding: 0;
            margin: 0;
          }
          .mint-checklist-label{
            width: 0.75rem;
            padding: 0;
            margin: 0;
            border: none;
          }
          .mint-cell{
            background: none;
          }
          .mint-cell-left{
            padding: 0;
            margin: 0;
          }

        }
        .mint-cell:last-child{
          background: none;
        }
        .mint-checkbox{
          display: block;
          width: 0.75rem;
          height:0.75rem;
          position: relative;
          .mint-checkbox-core::after{
            position:absolute;
            right: 0px;
            top:0.2rem;
            transform-origin:right top;
            width: 0.30rem;
            height:0.40rem;
          }
        }

        .mint-checkbox-label{
          display: none;
        }
				.goods-img{
					padding: 0 0.5rem;
          height: 5.0rem;
          display: flex;
          align-items: center;
					img{
						width: 4.5rem;

					}
				}
				.goods-name{
					flex: 1;
					font-size: 0.55rem;
					display: flex;
					flex-direction: column;
					.name{
						color: #333;
					}
					.weight{
						padding-top: 0.25rem;
						color: #666;
					}
					.goods-tlt{
						display: flex;
						justify-content: space-between;
						position: relative;
						flex: 1;
           .lastprice{
             position: absolute;
             left: 0;
             bottom: 0.9rem;
             color: #FF3737;
             font-size: 0.6rem;
            }
						.price{
							position: absolute;
							bottom: 0.1rem;
							left: 0;
							color: #333;
							font-size: 0.6rem;
              span{
                font-weight: bold;
                font-size: 0.4rem;
                color: #fff;
                border:1px solid #29218e;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                padding: 1px 1px;
                margin:0 3px;
                background:  #29218e;
              }
						}
						.lookabout{
							position: absolute;
							right: 0;
							bottom: 0;
							color: #333;
							border:1px solid #FF3737;
							a{
								padding: 0.25rem 0.75rem;
								color: #FF3737;
							}
						}

						.went-number{
							position: absolute;
							right: 0;
							bottom: 0;
							color: #333;
							border:1px solid #999;
							.idnumber{
								width:1.7rem;
								height: 1.1rem;
								text-align: center;
								font-size: 0.65rem;
                border:none;
                border-radius: 0;
                border-left: 1px solid #666;
                border-right: 1px solid #666;

							}
							.minus,.add{
								display: inline-block;
								width: 1.1rem;
								text-align: center;
								font-size: 0.65rem;
							}

						}
					}
				}
			}
		}
		.bottom{
			height:3.5rem;
			background: #F5F5F5;
		}
		.car-tab{
			box-shadow: 0 -3px 5px #eee;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 2.5rem;
			background: #fff;
			display: flex;
			justify-content: space-between;
			line-height: 2.5rem;
			.lookmoney{
				flex: 1;
				display: flex;
				justify-content: flex-start;
				padding-left: 0.75rem;
				align-items: center;
				.allchack{
					font-size: 0.55rem;
					color: #333;
					.chack-car{
						display: inline-block;
					  	border: 1px solid #666;
					  	height: 0.75rem;
					  	width: 0.75rem;
					  	border-radius: 50%;
					  	vertical-align: middle;
					}
					span{
						display: inline-block;
						padding-left: 0.65rem;
						line-height: 2.5rem;
					}
				}
				.allmoney{
					color: #333;
					font-size: 0.75rem;
					padding-left: 0.65rem;
					b{
						color: #ff3737;
					}
				}
			}
			.gopay{
				width: 6rem;
				a{
					display: block;
					width: 100%;
					height: 100%;
					background: #FF3737;
					color: #fff;
					font-size: 0.65rem;
					text-align: center;
					line-height: 2.5rem;
				}
			}
		}
		.zhezhao{
			position: absolute;
			background: #333333;
			opacity: 0.6;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
    .mint-cell-wrapper{
      border:none;
    }

	}
</style>
