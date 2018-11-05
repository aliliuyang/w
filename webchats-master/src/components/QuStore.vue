<template>
  	<div id="store" v-if="ok" >
      <div class="search-i" ref="sea">
        <search></search>
      </div>
        <banner v-if="weixinBanner" :weixinBanner=weixinBanner></banner>
        <div class="activity" v-if="weixinBannerTwo.length">
          <div class="activity-img"><a :href="weixinBannerTwo[0].jumpurl"><img :src="'http://image.yifuka.com/' + weixinBannerTwo[0].path" alt="" /></a></div>
        </div>
		  <nav-banner :weixinService=weixinService></nav-banner>
        <div class="spaecial" v-if="weixinSpecialSale.length">
	        <div class="spaecial-title" :style="{backgroundImage: 'url(http://image.yifuka.com/'+ weixinSpecialSale[0].path +')'}">
	          <div>{{weixinSpecialSale[0].name}} <span>每天早上10点上新</span></div>
	              <div><a :href="weixinSpecialSale[0].jumpurl">更多 <i class="iconfont icon-jiantou-copy"></i></a></div>
	        </div>
	        <div class="spaecial-img" >
	                <a :href="weixinSpecialSale[1].jumpurl"><img class="bg-img" :src="'http://image.yifuka.com/'+weixinSpecialSale[1].path" alt="" /></a>
	          <div class="active-Simg">
	            <a :href="weixinSpecialSale[2].jumpurl"><img :src="'http://image.yifuka.com/'+weixinSpecialSale[2].path" alt="" /></a>
	            <a :href="weixinSpecialSale[3].jumpurl"><img :src="'http://image.yifuka.com/'+weixinSpecialSale[3].path" alt="" /></a>
	          </div>
	        </div>
        </div>
        <div class="vie-for" v-if="hotRob.length">
	        <div class="vie-for-title">
	        	<div class="hotshoping">热抢&nbsp;<span>距离开始时间</span><p><b>{{downtime.hour}}</b>:<b>{{downtime.minute}}</b>:<b>{{downtime.second}}</b></p></div>
                <div><a href="#">好物低价热抢 <i class="iconfont icon-jiantou-copy"></i></a></div>
	        </div>
	        <div class="swiper-container3">
	              <div class="swiper-wrapper clear">
	                  <div class="swiper-slide" v-for="hotjd in hotRob.jdcuxiao"><a :href="'#/details/'+ jump(hotjd.sku)"><img :src="'http://img10.360buyimg.com/n1/'+hotjd.imgurl"/><h3>¥{{hotjd.discount}}</h3><p>¥{{hotjd.frontPrice}}</p></a></div>
	                  <div class="swiper-slide" v-for="hotzx in hotRob.recuxiao"><a :href="'#/details/'+ jump(hotzx.sku)"><img :src="'http://image.yifuka.com/'+hotzx.imgurl"/><h3>¥{{hotzx.discount}}</h3><p>¥{{hotzx.frontPrice}}</p></a></div>
	              </div>
	        </div>
        </div>

        <div class="vie-for"v-html="chip" v-if="chip">
	        <!--<div class="vie-for-title">
	        	<div>金秋大闸蟹特卖 <span>全场三折起</span></div>
	        </div>
	        	<div class="vie-banner">
	        		<img src="../assets/images/vie.jpg" alt="" />
	        	</div>
	        <div class="swiper-container3">
	              <div class="swiper-wrapper clear">
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	                  <div class="swiper-slide"><a href="#/"><img src="../assets/images/vieggods.jpg"/><h3>¥139</h3><p>¥199</p></a></div>
	              </div>
	        </div>-->
        </div>
        <div class="index-goods">
        	<h3><b></b>热销</h3>
        	<ul>
        		<li v-for='good in goods'>
        			<a :href="'#/details/'+jump(good.sku)">
	        			<img :src="'http://img10.360buyimg.com/n1/'+good.imagePath" alt="" />
	        			<div class="name">
	        				<div class="tuijian">{{good.name}}</div>
                  <span v-if="!(good.savem==0)" class="economize"> <b>中欣通支付约省{{good.savem}} </b></span>
	        				<p class="price">¥&nbsp;<b>{{good.frontPrice}}</b><span v-if='good.isPro==1'>¥&nbsp;{{good.prejiage}}</span></p>
	        			</div>
        			</a>
        		</li>
        	</ul>
        </div>
        <back-top v-show='back' :showbacktop=showbacktop></back-top>
        <div class="buttom"></div>
        <nav-tab :istrue=1></nav-tab>
  	</div>
</template>

<script>
import NavTab from "./NavTab";
import Banner from "./QuStore/Banner";
import NavBanner from "./QuStore/NavBanner";
import BackTop from "./BackTop";
import axios from "axios";
import qs from "qs";
import { mapState, mapActions } from "vuex";
import { Indicator ,MessageBox} from "mint-ui";
import Search from "./JD/Search";
export default {
  name: "QuStore",
  data() {
    return {
      ok: false,
      downtime: { hour: 0, minute: 0, second: 0 },
      back: false,
      weixinBanner: [],
      weixinBannerTwo: [],
      weixinService: [],
      goods: [],
      chipcontent: "",
      weixinSpecialSale: [],
      hotRob: [],
      chip: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      getcar: "getcar"
    }),
    swipercontainer1() {
      var swiper = new Swiper(".swiper-container3", {
        slidesPerView: 4.5,
        slidesPerColumn: 1
      });
    },
    showbacktop(b) {
      this.back = b;
    },
    countDown() {
      var that = this;
      var today = new Date();
      var a = new Date(this.hotRob.starttime);

      var time = a - today;
      if (time > 0) {
        that.downtime.hour = Math.floor(time / 3600000);
        that.downtime.minute = Math.floor(
          (time / 3600000 - Math.floor(time / 3600000)) * 60
        );
        that.downtime.second = Math.floor(
          (time / 60000 - Math.floor(time / 60000)) * 60
        );
        if (that.downtime.minute < 10) {
          that.downtime.minute = "0" + that.downtime.minute;
        }
        if (that.downtime.hour < 10) {
          that.downtime.hour = "0" + that.downtime.hour;
        }
        if (that.downtime.second < 10) {
          that.downtime.second = "0" + that.downtime.second;
        }
        setInterval(function() {
          that.downtime.second--;
          if (that.downtime.second < 10) {
            that.downtime.second = "0" + that.downtime.second;
          }
          if (that.downtime.second == 0) {
            that.downtime.minute--;
            that.downtime.second = 59;
            if (that.downtime.minute < 10) {
              that.downtime.minute = "0" + that.downtime.minute;
            }
          }
          if (that.downtime.minute == 0) {
            that.downtime.hour--;
            that.downtime.minute = 59;
            if (that.downtime.hour < 10) {
              that.downtime.hour = "0" + that.downtime.hour;
            }
          }
          if (
            (that.downtime.hour == 0) &
            (that.downtime.second == 0) &
            (that.downtime.minute == 0)
          ) {
            clearInterval;
          }
        }, 1000);
      } else {
        that.downtime.hour = "0" + "0";
        that.downtime.second = "0" + "0";
        that.downtime.minute = "0" + "0";
      }
    },
    jump(sku) {
      return Base64.encode(sku);
    },
    changeColor() {
      if (window.scrollY > 100) {
        this.$refs.sea.setAttribute("style", "background: #fff;opacity: 0.9;");

      } else {
        this.$refs.sea.setAttribute("style", "");
      }
    }
  },
  mounted() {
    Indicator.open();
    document.title = "趣商城";
    var that = this;
    axios
      .post(BASE_URL + "/index.php?r=site/homePage", qs.stringify({}))
      .then(function(res) {
        var a = Base64.decode(res.data);
        a = JSON.parse(a).data.data;
        Indicator.close();
        that.weixinBanner = a.weixinBanner;
        that.weixinService = a.weixinService;
        that.ok = true;
        that.weixinBannerTwo = a.weixinBannerTwo;
        that.goods = a.goods;
        that.chipcontent = a.chip[0].content;
        that.weixinSpecialSale = a.weixinSpecialSale;
        that.hotRob = a.hotRob;
        if(that.hotRob){
          that.countDown();
        }
        that.chip = a.chip[0].content;
      })
      .catch(function(err) {});
    that.getcar();

  },
  updated() {
    this.swipercontainer1();
    window.addEventListener("scroll", this.changeColor);

  },
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  components: {
    banner: Banner,
    "nav-banner": NavBanner,
    "back-top": BackTop,
    search: Search
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
#store {
  width: 100%;
  background: #f5f5f5;
  overflow: hidden;
  .search-i {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 6666;
    display: flex;
    padding: 0.25rem 0.75rem;
    justify-content: center;
  }
  .activity {
    width: 100%;
    background: #fff;
    .activity-img {
      margin: 0 auto;
      a {
        display: block;
        width: 100%;
        img {
          width: 100%;
          display: block;
          /* box-shadow: 0 0px 15px  #ccc;	   */
        }
      }
    }
  }
  /*特卖*/
  .spaecial {
    width: 100%;
    background: #fff;
    margin-bottom: 0.75rem;
    .spaecial-title {
      height: 1.85rem;
      display: flex;
      justify-content: space-between;
      background-size: 100% 100%;
      div {
        margin: 0 0.75rem;
        font-size: 0.75rem;
        line-height: 1.85rem;
        color: #ff3b3c;
        font-weight: bold;
        span {
          color: #2f2f2f;
          font-size: 0.575rem;
        }
        a {
          font-size: 0.55rem;
          font-weight: normal;
          color: #ff3737;
          i {
            display: inline-block;
            width: 0.75rem;
            height: 0.75rem;
            background: #f00;
            border-radius: 50%;
            vertical-align: middle;
            font-size: 0.575rem;
            color: #fff;
            line-height: 0.75rem;
            text-align: center;
          }
        }
      }
    }
    .spaecial-img {
      height: 7.5rem;
      width: 100%;
      position: relative;
      .bg-img {
        width: 100%;
        height: 7.5rem;
      }
      .active-Simg {
        width: 11rem;
        height: 6rem;
        position: absolute;
        right: 0.25rem;
        top: 0.75rem;
        img {
          margin-right: 0.5rem;
          width: 5rem;
          float: left;
        }
      }
    }
  }
  /*热抢*/
  .vie-for {
    width: 100%;
    background: #ffffff;
    margin-bottom: 0.75rem;
    .vie-for-title {
      background: url(../assets/images/index.png) no-repeat;
      background-size: 100%;
    }
    .hotshoping {
      display: flex;
      justify-content: flex-start;
      p {
        color: #000;
        padding-left: 0.25rem;
        font-weight: normal;
        b {
          background: #000;
          font-size: 0.35rem;
          line-height: 0.55rem;
          color: #fff;
          border-radius: 2px;
          padding: 0 0.175rem;
          font-weight: normal;
        }
      }
    }
    .vie-banner {
      img {
        width: 100%;
      }
    }
    .vie-for-title {
      height: 1.85rem;
      display: flex;
      justify-content: space-between;
      div {
        margin: 0 0.75rem;
        font-size: 0.75rem;
        line-height: 1.85rem;
        color: #ff3b3c;
        font-weight: bold;
        span {
          color: #2f2f2f;
          font-size: 0.575rem;
        }
        a {
          font-size: 0.55rem;
          font-weight: normal;
          color: #ff3737;
          i {
            display: inline-block;
            width: 0.75rem;
            height: 0.75rem;
            background: #f00;
            border-radius: 50%;
            vertical-align: middle;
            font-size: 0.575rem;
            color: #fff;
            line-height: 0.75rem;
            text-align: center;
          }
        }
      }
    }
    .swiper-container3 {
      width: 100%;
      overflow: hidden;
      .swiper-wrapper {
        width: 2000px;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        float: left;
        padding: 0;
        margin: 0;
        height: 6rem;
        float: left;
        flex-direction: column;
        img {
          width: 100%;
        }
        h3 {
          color: #ff3737;
          font-size: 0.45rem;
          padding-top: 0.4rem;
        }
        p {
          color: #666;
          font-size: 0.45rem;
          text-decoration: line-through;
        }
      }
    }
  }
  /*推荐商品*/
  .index-goods {
    background: #fff;
    h3 {
      padding: 0 0.75rem;
      line-height: 1.85rem;
      font-size: 0.70rem;
      color: #333;
      border-bottom: 1px solid #f5f5f5;
    }
    ul {
      padding-left: 0.75rem;
      li {
        padding: 0.5rem 0.75rem 0.5rem 0;
        border-bottom: 1px solid #f5f5f5;
        a {
          display: flex;
          justify-content: space-between;
          img {
            width: 4.5rem;
            height: 4rem;
          }
          .economize {
            line-height: 1.5rem;
            background: #fff;
            font-size: 0.5rem;
            b{
              font-weight: normal;
              font-size: 0.5rem;
              color: #29218e;
              border: 1px solid #29218e;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
              padding: 0 4px;
              margin-right: 5px;
            }
          }
          .name {
            display: flex;
            flex: 1;
            flex-direction: column;
            color: #666;
            font-size: 0.65rem;
            padding-left: 0.5rem;
            .tuijian {
              flex: 1;
              overflow: hidden;
            }
            .price {
              height: 0.7rem;
              color: #ff3737;
              span {
                padding-left: 0.75rem;
                color: #999;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
  .buttom {
    width: 100%;
    height: 3rem;
  }
}
</style>
