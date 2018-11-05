<template>
  <div id="mypic">
	<mt-loadmore :top-method="loadTop" :topPullText='""' :topDropText='""' :topLoadingText='""' :auto-fill="false"  :bottomDistance=50>
	<div id="picdetails">
		<div class="pic">
			<header>
				<span></span>
				<span>图文详情</span>
				<span ><a class="iconfont icon-zhuye" href="#/qustore" ></a></span>
			</header>
			<!--<div class="content">
				<div><span>商品详情</span></div>
				<div><span>规格参数</span></div>
				<div><span>包装售后</span></div>
			</div>-->
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">商品介绍</mt-tab-item>
				<mt-tab-item id="2">规格参数</mt-tab-item>
			</mt-navbar>
		</div>
		<div class="container">
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
				   <div id="introduction" v-html='introduction'>
				   </div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
				    <div id="param" v-html='param'>

				    </div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
	<p id="bottom"></p>
	</mt-loadmore>
  </div>
</template>

<script>
import Vue from "vue";
import { Navbar, TabItem } from "mint-ui";
export default {
  name: "PicDetails",
  props: ["hiddentext", "introduction", "param"],
  data() {
    return {
      selected: "1"
    };
  },
  methods: {
    loadTop() {
      this.hiddentext();
    }
  },
  mounted() {},
  updated() {},
  activated() {},
  components: {}
};
</script>

<style lang="scss">
#mypic {
  transform: scaleY(0.5);
  transform-origin: 0px 0px;
}
#picdetails {
  background: #fff;
  .pic {
    width: 100%;
    height: 10rem;
    transform: scaleY(2);
    transform-origin: 0px 0px;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding: 0 0.75rem;
    background: #fff;
    border-bottom: 1px solid #eee;
    span {
      padding-left: 1rem;
      font-size: 0.85rem;
      line-height: 2.2rem;
      a {
        color: #999;
        font-size: 1rem;
      }
    }
  }
  .is-selected {
    color: red;
    border: none;
  }
  .mint-navbar {
    font-size: 0.65rem;
    .mint-tab-item {
      font-size: 0.65rem;
      .mint-tab-item-label {
        border-right: 1px solid #eee;
        font-size: 0.65rem;
      }
    }
  }
  #introduction {
    transform: scaleX(0.5);
    transform-origin: 0px 0px;
	width: 200%;
	table{
		width: 100%；
	}
	td{
		width: 100%;
	}
	img{
		width: 100%;
	}
	font-size:30px;
  }

  #param {
    width: 200%;
    table {
      transform: scaleX(0.5);
      transform-origin: 0px 0px;
      border-collapse: 2px;
      font-size: 1.2rem;
      color: #666;

      tbody {
        margin: 0 0.75rem;
      }
      th {
        padding: 1rem;
        line-height: 3rem;
      }
      tr,
      td {
        border: 2px solid #eee;
        padding: 1rem;
        height: 3rem;
      }
      .tdTitle {
        text-align: center;
        width: 12rem;
      }
    }
  }
}
#bottom {
  height: 6rem;
}
</style>
