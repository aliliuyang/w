<template>
  <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :bottomDistance=0 ref="loadmore">
    <div class="goodslist">
          <div class="lasttop">
            <div class="listtop">
              <search></search>
              <button :class="this.type=='line'?'line-show':'brick-show'" @click='changeType'></button>
            </div>
            <div class="sort-nav">
              <div class="sort-hot" :class="{'sort':saletotal}" @click="sort('saletotal')">销量</div>
              <div class="sort-price" :class="{'sort':jiage}" @click="sort('jiage')">价格</div>
            </div>
          </div>
            <div v-show="show" class="allgoods" >
                <div class="nogoods" v-if="!goods.length">
                  <p><b class="iconfont icon-shibai"></b></p>
                  <p>抱歉，没有找到商品额</p>
                </div>
                <list v-if="goods.length" :type='type' :goods=goods :imgpath="imgpath"  :getmore="getmore"></list>
            </div>
    </div>
  </mt-loadmore>
</template>
<script>
  import Search from "./Search"
  import List from "./List"
  import axios from 'axios';
  import qs from 'qs';
  import {Indicator, Loadmore} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: 'GoodsList',
    data() {
      return {
        type: 'line',
        goods: [],
        jiage: true,
        saletotal: true,
        sorttype: '',
        page: "1",
        kw: '',
        cateid: '',
        show: false,
        imgpath: ''
      }
    },
    computed: {

    },
    methods: {
      changeType() {
        if (this.type == 'line') {
          this.type = 'brick'
        } else {
          this.type = "line"
        }
        // var myscoll=document.getElementsByClassName("allgoods")
        // myscoll[0].scrollTop= 50
        // this.$refs.loadmore.onBottomLoaded();
      },
      loadBottom() {
        this.getmore()
      },
      getmore() {
        this.page++;
        var that = this
        var arr = Base64.decode(this.$route.params.id.replace('$','/')).split('&')
        this.kw = arr[0].split('=')[1]
        this.cateid = arr[1].split('=')[1]
        axios.post(BASE_URL + '/index.php?r=jdproduct/list', qs.stringify({
          cateid: Base64.encode(this.cateid),
          keywords: Base64.encode(this.kw),
          page: Base64.encode(this.page),
          sort: Base64.encode(this.sorttype)
        })).then(function (res) {
          Indicator.close();
          var a = Base64.decode(res.data)
          if(JSON.parse(a).data.err==10002){
            var goodsarr = JSON.parse(a).data.product
            for (var k = 0; k < goodsarr.length; k++) {
              that.goods.push(goodsarr[k])
            }
          }else{
            Toast('没有更多数据啦')
          }
          that.$refs.loadmore.onBottomLoaded();
        }).catch(function (err) {
          Indicator.close();
        });
      },
      init() {
        var that = this
        var arr = Base64.decode(this.$route.params.id.replace('$','/')).split('&')
        this.kw = arr[0].split('=')[1]
        this.cateid = arr[1].split('=')[1]
        axios.post(BASE_URL + '/index.php?r=jdproduct/list', qs.stringify({
          cateid: Base64.encode(this.cateid),
          keywords: Base64.encode(this.kw),
          page: Base64.encode(this.page),
          sort: Base64.encode(this.sorttype)
        })).then(function (res) {
          Indicator.close();
          var a = Base64.decode(res.data)
          if(JSON.parse(a).data.err==10002){
            that.goods = JSON.parse(a).data.product;
            that.imgpath = JSON.parse(a).data.imgpath
          }
          if(JSON.parse(a).data.err==10003){
            that.goods=[]
          }
          that.show = true
        }).catch(function (err) {
           Indicator.close();
        });
      },
      sort(what) {
        Indicator.open({spinnerType: 'fading-circle'})
        if (what == 'jiage') {
          this.jiage = !this.jiage
          if (this.jiage) {
            this.sorttype = 'jiage_desc'
          } else {
            this.sorttype = 'jiage_asc'
          }
        } else {
          this.saletotal = !this.saletotal
          if (this.saletotal) {
            this.sorttype = 'saletotal_desc'
          } else {
            this.sorttype = 'saletotal_asc'
          }
        }
        this.init()
      },

    },
    created() {
      this.init()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route":'init'
    },
    mounted() {
      document.title = '商品列表'
      Indicator.open()
      this.init()
    },
    updated() {

    },
    activated() {

    },
    components: {
      "search": Search,
      'list': List
    }
  }

</script>
<style lang="scss" scope >
  .goodslist {
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*overflow: hidden;*/
    /*position: relative;*/
    .lasttop{
      width: 100%;
      height:4.45rem;
      display: flex;
      flex-direction: column;
    }
    .listtop {
      background: #fff;
      height: 2.25rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f3f2f8;
      align-items: center;
      padding: 0 0.75rem;
      button {
        width: 1.25rem;
        height: 1.25rem;
        border: none;
      }
      .line-show {
        margin-left: 0.8rem;
        background: url(../../assets/images/fenlei_03.jpg) no-repeat center;
        background-size: 100%;
      }
      .brick-show {
        background: url(../../assets/images/line_03.jpg) no-repeat center;
        background-size: 100%;
      }
    }
    .sort-nav {
      background: #fff;
      height: 2.2rem;
      width: 100%;
      display: flex;
      border-bottom: 1px solid #f3f2f8;
      justify-content: space-around;
      font-size: 0.65rem;
      line-height: 2.2rem;
      .sort-hot, .sort-price {
        padding-right: 0.6rem;
        background: url(../../assets/images/0.png) no-repeat right center;
        background-size: 0.4rem 0.5rem;
      }
      .sort {
        background: url(../../assets/images/1.png) no-repeat right center;
        background-size: 0.4rem 0.5rem;
      }
    }
    .allgoods{
      /*display: flex;*/
      /*flex: 1;*/
      width: 100%;
     /*overflow:scroll;*/
}

/*.scoll{*/
  /*width: 100%;*/
  /*padding-top: 4.45rem;*/
/*}*/
.nogoods {
  width: 100%;
  margin: 0 auto;
  p {
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    color: #333;
    margin-top: 20px;
  }
  b {
    font-size: 3rem;
    color: #999;
  }
}
}
  .mint-loadmore-content::-webkit-scrollbar{display:none;}
</style>
