<template>

 		<div class="goodslist">
	 		<div class="listtop">
	 			<search ></search>
	 			<button :class="this.type=='line'?'line-show':'brick-show'" @click='changeType'></button>
	 		</div>
	 		<div class="sort-nav">
	 			<div class="sort-hot" :class="{'sort':saletotal}" @click="sort('saletotal')">销量</div>
	 			<div class="sort-price" :class="{'sort':jiage}" @click="sort('jiage')">价格</div>
	 		</div>
      <div class="my-list">

        <div class="my-type" :class="this.type=='line' ? 'line-list' : 'brick-list'">
          <mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :bottomLoadingText='text.LoadingText' :bottomDropText='text.DropText' :bottomPullText='text.PullText' :bottomDistance=50 ref="loadmore" :bottomAllLoaded="bottomAllLoaded">
          <ul class="clear">
            <li v-for="item in goods" class="goods">
              <a  :href='"#/carddetails/"+transform(item.id)'>
                <div class="goodsImg">
                  <img :src="'http://image.yifuka.com/'+item.imgurl" alt="" />
                </div>
                <div class="goodstext">
                  <p class="goodsName">{{item.name}}</br><span class="economize" v-if="!(item.savem==0)"> 中欣通支付约省{{item.savem}}% </span> </p>
                  <p class="goodsPrice"> <span>¥&nbsp;{{item.jiage}}</span><i v-if="item.isPro==1">¥&nbsp;{{item.prejiage}}</i></p>
                </div>
              </a>
            </li>
          </ul>
          </mt-loadmore>
        </div>
      </div>
 		</div>

</template>

<script>
	import Search from "../../JD/Search"
	import axios from 'axios';
	import qs from 'qs';
	import { Indicator } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	export default {
	  	name: 'CardList',
	  	data () {
	    	return {
          type:'line',
          goods:[],
          jiage:true,
          saletotal:true,
          sorttype:'',
          page:"1",
          kw:'',
          cateid:'',
          show:false,
          imgpath:'',
          text:{LoadingText:'正在加载',DropText:'释放加载更多',PullText:'上拉加载更多'},
          bottomAllLoaded:false,
          allgoods:null
	    	}
	  	},
	  	computed:{

	  	},
	  	methods:{
          changeType () {
            if(this.type=='line'){
              this.type='brick'
            }else{
              this.type="line"
            }
          },
          loadBottom(){
            this.getmore()
          },
          getmore(){
            var that =this
            this.page++
              axios.post(BASE_URL+'/index.php?r=cpsgoods/clist',qs.stringify({
                sort:this.sorttype,
                page:this.page,
                brandid: this.cateid,
                keywords:'',
                goodtype:'1303'
              })).then(function(res){
                  that.$refs.loadmore.onBottomLoaded();
                    var a=res.data.data.list.goodslist
                   a.forEach((value)=>{
                     that.goods.push(value)
                   })
              }).catch(function(err){

              })
          },
          ishave(){
            var allpege=Math.ceil(this.allgoods/10)
            if(allpege=this.page){
              this.bottomAllLoaded=true
            }
          },
          sort(what){
            Indicator.open()
              if(what=='jiage'){
                this.jiage=!this.jiage
                if(this.jiage){
                  this.sorttype='jiage_desc'
                }else{
                  this.sorttype='jiage_asc'
                }
              }else{
                this.saletotal=!this.saletotal
                if(this.saletotal){
                  this.sorttype='saletotal_desc'
                }else{
                  this.sorttype='saletotal_asc'
                }
              }
              this.init()
            },
            transform(str){
              return Base64.encode(str)
            },
            init(){
              var that=this
              axios.post(BASE_URL+'/index.php?r=cpsgoods/clist',qs.stringify({
                  sort:this.sorttype,
                  page:'1',
                  brandid: this.cateid,
                  keywords:'',
                  goodtype:'1303'
              })).then(function(res){
                Indicator.close();
                that.allgoods=res.data.data.list.totalCount
                that.goods=res.data.data.list.goodslist
                that.ishave()
              }).catch(function(err){

              })
            }
      },
      mounted(){
        document.title = '商品列表'
        Indicator.open()
        this.cateid=Base64.decode(this.$route.params.id)
        this.init()
      },
      updated(){

      },
      activated(){

      },

      components:{
            "search":Search,
      }
  }

</script>

<style  lang="scss" >
.goodslist{
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
	.listtop{
    display: flex;
		background: #fff;
		height: 2.25rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f3f2f8;
		align-items: center;
		padding: 0 0.75rem;
		button{
			width: 1.25rem;
			height: 1.25rem;
			border: none;
		}
		.line-show{
			background: url(../../../assets/images/fenlei_03.jpg) no-repeat center;
			background-size: 100%;
		}
		.brick-show{
			background: url(../../../assets/images/line_03.jpg) no-repeat center;
			background-size: 100%;
		}
	}
	.sort-nav{
    display: flex;
		background: #fff;
		height: 2.2rem;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #f3f2f8;
		justify-content: space-around;
		font-size:0.65rem;
		line-height:2.2rem;
		.sort-hot,.sort-price{
			padding-right: 0.6rem;
			background: url(../../../assets/images/0.png) no-repeat right center;
			background-size: 0.4rem 0.5rem;
		}
		.sort{
			background: url(../../../assets/images/1.png) no-repeat right center;
			background-size: 0.4rem 0.5rem;
		}
	}
  .nogoods{
    width: 100%;
    p{
      width: 100%;
      text-align: center;
      font-size:0.8rem;
      color: #333;
      margin-top: 20px;
    }
    b{
      font-size: 3rem;
      color: #999;
    }
  }
}
.line-list{
  ul{
    width: 100%;
    li{
      width: 100%;
      height: 5rem;
      background: #fff;
      a{
        display: block;
        width: 100%;
        display:flex;
        justify-content: space-between;
        .goodsImg{
          padding-top: 0.25rem;
          width: 4.5rem;
          height: 4.5rem;
          margin: 0 0.5rem;
          img{
            width: 100%;
          }
        }
        .goodstext{
          flex: 1;
          border-bottom: 1px solid #f3f2f8;
          padding:0.45rem 0.75rem 0.55rem 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
          .goodsName{
            font-size: 0.65rem;
            color: #333;
            box-sizing: border-box;
            height: 3.375rem;
            overflow: hidden;
            .economize{
              font-size: 0.5rem;
              color: #29218e;
              border:1px solid #29218e;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
            }
          }
          .goodsPrice{
            color: #ff3b3b;
            font-size:0.45rem;
            span{
              font-size: 0.6rem;
            }
            i{
              font-size: 0.5rem;
              margin-left: 0.6rem;
              color: #666;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
.my-list::-webkit-scrollbar{display:none;}
.my-list{
  display: flex;
  flex: 1;
  width: 100%;
  overflow: scroll;
  .mint-loadmore{
    width: 100%;

  }
  .my-type{
    width: 100%;
  }

}
.brick-list{
  ul{
    width: 110%;
    background: #fff;
    .goods{
      width: 50%;
      margin-top: 0.25rem;
      background: #fff;
      width: 9.25rem;
      float: left;
      margin-right: 0.25rem;
      a{
        display: block;
        width: 100%;
        .goodsImg{
          width: 100%;
          img{
            width: 100%;
            align-items: center;
          }
        }
        .goodstext{
          width: 100%;
          padding: 0.5rem;
          font-size:0.65rem;
          .goodsName{
            width: 100%;
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
            white-space: nowrap;
            .economize{
              font-size: 0.5rem;
              color: #29218e;
              border:1px solid #29218e;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
            }
          }
          .goodsPrice{
            margin-top: 1.1rem;
            font-size: 0.5rem;
            span{
              font-size: 0.65rem;
            }
            i{
              font-size: 0.5rem;
              margin-left: 0.6rem;
              color: #666;
              text-decoration: line-through;
            }
          }
        }

      }
    }
  }
}
/*加载提示*/
.mint-loadmore-bottom{
  .mint-loadmore-text{
    font-size:0.7rem;
    color: #666;
  }
}

</style>
