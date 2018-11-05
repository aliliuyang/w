<template>
  <div id="gooddata">
    <div class="without" >
      <mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""'  :bottomPullText='""' :auto-fill="false" ref='loadmore'  :bottomDistance=150>
        <div class="header">
          <div class="nav">
            <a class="active">商 品</a><a @click=showtext>详 情</a>
          </div>
          <span> <a  class="iconfont icon-zhuye" href="#/qustore"></a></span>
        </div>
        <div class="slideshow">
          <div  class="swiper-container5">
            <div class="swiper-wrapper clear">
              <div class="swiper-slide"><img :src="'http://image.yifuka.com/'+goodstit.imgurl"/></div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="goods-name" >
          {{goodstit.name}}
        </div>
        <p class="pianzi">请勿将电子卡卡号、密码泄露给他人，谨防诈骗。</p>
        <p class="economize" v-if="!(selectGoods[0].zxtprejiage==0)"><span>中欣通专享价</span><b>¥{{selectGoods[0].zxtprejiage}} </b><i>更省{{selectGoods[0].savem}}%</i> </p>
        <!--	        <p class="merit">全网通爆低价！5.5英寸移动联通典型4G手机 和漂亮 送保护壳保护膜 两年全国联保</p>-->
        <div class="price"><h5>¥&nbsp;<span>{{selectGoods[0].frontPrice}}</span><i class="chuxiao" v-if="goodstit.isPro==1">¥&nbsp;<span>{{goodstit.prejiage}}</span> </i> </h5><!--<b>降价通知</b>--> </div>
        <!--<div class="promotion">
        	<p><span>促销</span><i>满减</i>满xx元立减xx元，仅限前活动..</p><b @click=showpromotion class="iconfont icon-shenglvehao"></b>
        </div>-->
        <div class="select">
          <p><span>已选</span><i v-if="selectGoods[0].options" v-text="selectGoods[0].options"></i> <i v-else>{{number}}件</i></p>
          <b class="iconfont icon-shenglvehao" @click="showOptions"></b>
        </div>
        <div class="send-to">
          <div>
            <div class="address">
              <span>送至</span>
              <div class="city">
                <p><i class="iconfont icon-dizhi"></i><span class="detailed-address"><b v-for="item in address">{{item.name}}</b></span></p>
                <p v-show="!SstockStateDes"><span class="ishave">{{stockStateDes}}</span>&nbsp;</p>
              </div>
            </div>
            <!--<p class="weight">重量<span>{{goodstit.weight}} kg</span></p>-->
          </div>
          <b class="iconfont icon-shenglvehao" @click=ishave></b>
        </div>

        <div  class="lookmore">
          ＾上拉可看图文详情
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
        </div>
      </mt-loadmore>
    </div>
    <div class="protect" v-if=isaddress||ispromotion||isOptions></div>
    <city v-if=addadress :allhidden=allhidden :setaddress=setaddress></city>
    <transition>
      <!--地址-->
      <details-address v-show=isaddress :setaddress=setaddress :address=address  :allhidden=allhidden :showaddadress=showaddadress></details-address>
    </transition>
    <!--促销-->
    <!--<transition>
        <promotion v-show=ispromotion :allhidden=allhidden></promotion>
    </transition>-->
    <transition>
      <!--商品选择-->
      <card-options v-if=isOptions :changeNum="changeNum"  :number=number   :allhidden=allhidden   :selectGoods="selectGoods" :detaildsinit="detaildsinit"></card-options>
    </transition>
  </div>
</template>

<script>
  import DetailsAddress from '../../JD/Details/DetailsAddress'
  // import Promotion from './Promotion'
  import CardOptions from './CardOptions'
  import { Lazyload } from 'mint-ui';
  import City from '../../Address/City'
  import axios from 'axios';
  import qs from 'qs';
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default{
    name: 'CardData',
    props: ['showtext','tit','carnumber','detaildsinit','selectGoods','canAdd','transmissionid'],
    data () {
      return {
        isaddress:false,
        ispromotion:false,
        isOptions:false,
//		  isOptions:true,
        addadress:false,
        number:1,
        te:'',
        islogin:true,
        address:[{'name':'北京'},{'name':'东城区','pid':'2802'}],
        stockStateDes:'',
        //判断库存
        stocks:null
      }
    },
    computed:{
      SstockStateDes(){
        var that = this
        var pid=this.address[this.address.length - 1].pid
        var id=this.selectGoods[0].sku
        axios.post(BASE_URL+'/index.php?r=shop/checkgoods',qs.stringify({
          cpsgoodsid:id,
        })).then(function(res){
          var a=''

          that.stocks=res.data.stock
          if(res.data.status==1&&res.data.stock!=0){
            a='有货'
            that.canAdd('有货')
          }else{
            a='无货'
            that.canAdd('无货')
          }
          // that.stockStateDes=JSON.parse(Base64.decode(res.data))[0].stockStateDesc
          // that.canAdd(JSON.parse(Base64.decode(res.data))[0].stockStateDesc)
          that.stockStateDes=a
          return a
        }).catch(function(err){

        });
      },
      goodstit(){
        return this.tit
      }
    },
    methods:{
      allhidden(){
        this.isaddress=false
        this.ispromotion=false
        this.isOptions=false
        this.addadress=false
      },
      loadBottom(){
        this.showtext()
        this.$refs.loadmore.onBottomLoaded()
      },
      showpromotion(){
        this.ispromotion=!this.ispromotion
      },
      showOptions(){
        this.isOptions=!this.isOptions
      },
      showaddress(){
        this.isaddress=!this.isaddress
      },
      showaddadress(){
        this.addadress=true
      },
      ishave(){
        if(this.islogin){

          this.showaddress()
        }else{
          this.showaddadress()
        }
      },

      changeNum(type){
        if(type=='add'){
        	if(this.number>=5){
        		Toast('每张电子卡只能添加五张');
        		this.number=5
        	}else if(this.number>=this.stocks){
        		Toast('已达到库存上限');
        		this.number=this.stocks
        	}else{
        		this.number++
          	this.carnumber(this.number)

        	}

        }else{
          if(this.number==1){
            this.number=1

          }else{
            this.number--
          }
          this.carnumber(this.number)
        }
      },
      showimg(){
        var swiper = new Swiper('.swiper-container5', {
          pagination : '.swiper-pagination',
          paginationType : 'fraction',
          loop:false
        });
      },
      setaddress(arr){
        this.address=arr;
      },
    },
    mounted(){
      var that =this;
      var token = localStorage.getItem("token")
      if(!token){
        this.islogin=false
      }
      setTimeout(function(){
        that.showimg();
      },200)

    },
    updated(){

    },
    activated(){

    },
    components:{
      'details-address':DetailsAddress,
      // 'promotion':Promotion,
      'card-options':CardOptions,
      'city':City
    }
  }

</script>

<style  lang="scss">
  .mint-loadmore-bottom{

  }
  #gooddata{
    display: flex;
    flex-direction:column;
    height: 100%;
    width: 100%;
    padding-bottom: 2.45rem;
    background: #f5f5f5;
    .header{
      background: #FFF;
      height:2.2rem;
      width:100%;
      display: flex;
      justify-content: space-between;
      padding: 0 0.75rem;
      border-bottom: 1px solid #EEEEEE;
      .nav{
        display: flex;
        justify-content: flex-start;
        a{
          color: #333333;
          display: block;
          font-size: 0.75rem;
          line-height: 2.1rem;
          height:2.2rem;
          margin-right:2.3rem ;
        }
        .active{
          color: #f00;
          border-bottom: 2px solid #ff0000;
        }
      }
      span{
        line-height: 2.2rem;
        a{
          font-size: 1.0rem;
          color: #999;
        }
      }
    }
    .protect{
    	z-index:99!important;
    }
    .mint-loadmore {
      flex: 1;

    }
    .mint-loadmore-content.is-dropped{
      height: 100%;
    }
    .without{
      height: 100%;
      flex: 1;
      overflow: scroll;
    }
    .without::-webkit-scrollbar{display:none;}
    .slideshow{
      background: #FFF;
      width: 100%;
      border-bottom: 1px solid #eee;
      overflow:hidden;
      position: relative;
      .swiper-container5{
        width: 100%;
        .swiper-wrapper{
          width: 20000px;
          .swiper-slide{

            float: left;
            img{
              width: 100%;
              display: block;
            }
          }
        }

      }
      .swiper-pagination.swiper-pagination-fraction{
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
        font-size: 0.6rem;
        background: #999;
        opacity: 0.6;
        color: #fff;
        line-height: 1rem;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
      }
    }

    .goods-name{
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      color: #333333;
      line-height: 1.2rem;
      background: #FFF;
    }
    .economize {
      line-height: 1.5rem;
      background: #fff;
      padding-left: 0.75rem;
      font-size: 0.5rem;
      span {
        font-size: 0.5rem;
        color: #fff;
        border:1px solid #29218e;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        padding: 0 4px;
        margin-right: 5px;
        background: #29218e;
      }
      i {
        color: #666666;
        font-size: 0.4rem;
      }
      b {
        color: #ff3737;
      }
    }
    .merit{
      padding:0 0.75rem;
      color:#ff3b3c;
      font-size:0.6rem;
      line-height:0.9rem;
      background: #FFF;
    }
    .price{
      border-bottom:1px solid #eee;
      display: flex;
      justify-content: space-between;
      padding:1.4rem 0.75rem 0 0.75rem;
      background: #FFF;
      h5{
        color: #ff3b3c;
        font-size: 0.45rem;
        line-height: 1.5rem;
        span{
          font-size:0.7rem;
        }
        .chuxiao{
          color: #666;
          font-size: 0.3rem;
          font-weight: normal;
          margin-left: 0.5rem;
          span{
            text-decoration: line-through;
            font-size: 0.3rem;
             font-weight: normal;
          }
        }
      }
      b{
        display: block;
        border: 1px solid #eee;
        font-size: 0.55rem;
        height: 1rem;
        padding: 0 0.4rem;
        line-height: 0.9rem;
        font-weight: normal;
        color: #333;
        text-align: center;
      }
    }
    .promotion{
      font-size: 0.6rem;
      padding: 0.75rem 0.75rem;
      background: #FFF;
      display: flex;
      justify-content: space-between;
      p{
        color: #333;
      }
      span{
        color: #b5b5b5;
      }
      i{
        display: inline-block;
        border: 1px solid #ff3b3c;
        height: 1rem;
        padding: 0 0.15rem;
        font-size: 0.45rem;
        color: #ff3b3c;
        vertical-align: middle;
        line-height: 0.9rem;
        margin:  0 0 0 0.6rem;
      }
    }
    .select{
      margin-top: 0.5rem;
      background: #FFF;
      padding:  0.75rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.6rem;
      p{
        padding: 0;
        display: flex;
        justify-content: space-between;
        line-height: 0.9rem;
        span{
          color: #b5b5b5;
          width: 1.3rem;
        }
        i{
          margin-left: 0.6rem;
          color: #333;
          padding-right: 0.6rem;
        }
      }

    }
    .send-to{
      padding: 0.75rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.6rem;
      color:#b5b5b5 ;
      margin-top: 0.5rem;
      background: #FFF;
      line-height: 1.0rem;
      b{
        color:#333 ;
      }
      .address{
        display: flex;
        justify-content: space-between;
        .city{
          color: #333;
          margin-left: 0.6rem;
          .iconfont{
            font-size: 0.6rem;
            display: inline-block;
            color: #f00;
            vertical-align: top;
            margin-right: 5px;
          }
          .detailed-address{
            display: inline-block;
            width: 11rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          b{
            font-weight: normal;
          }
          .ishave{
            color: #ff3b3c;
          }
        }
      }
      .weight{
        span{
          margin-left: 0.6rem;
          color: #333;
        }
      }

    }
    .lookmore{
      height: 2.25rem;
      line-height: 2.15rem;
      text-align: center;
      color: #b5b5b5;
      background: #FFFFFF;
      margin-top: 0.5rem;
      font-size: 0.75rem;
    }
    .protect{
      width: 100%;
      height: 100%;
      position:fixed;
      background: #000000;
      opacity: 0.4;
      z-index: 222;
      top: 0;
      left: 0;
    }
    .protect::-webkit-scrollbar{display:none;}
    .pianzi{
      background: #fff;
      font-size: 0.65rem;
      padding-left: 0.75rem;
      color: #ff0000;
    }
  }

</style>
