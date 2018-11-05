
<template>
  <div class="classify">
    <div class="classify-top">
      <search></search>
      <a class="iconfont icon-fenlei" href="#/qustore"></a>
    </div>
    <div class="classify-content" >
      <div  class="classify-menu">
        <div class="alltow" ref="myscroll">
          <div class="tow-tit" >
            <p class="two" ><b>电子卡</b></p>
            <ul class="clear">
              <li v-for=" b in classify">
                <a :href="'#/cardlist/'+transform(b.brandid)">
                  <img :src="'http://image.yifuka.com/'+b.images" alt=""/>
                  <!--<img src="http://image.yifuka.com/lipin/20180104/1515032389IYwE.jpg" alt="">-->
                  <p>{{b.catname}}</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="tow-tit" >
            <p class="two" ><b>实体卡</b></p>
            <ul class="clear">
              <li v-for=" c in card">
                <a :href="'#/carddetails/'+transform(c.id)">
                  <img :src="'http://image.yifuka.com/'+c.imgurl" alt=""/>

                  <p>{{c.name}}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '../../JD/Search'
  import axios from 'axios';
  import qs from 'qs';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'CardClassify',
    data () {
      return {
        classify:[],
        classifyid:'',
        card:[]
      }
    },
    methods:{
      transform(str){
        return Base64.encode(str)
      }
    },
    computed:{

    },
    mounted(){
      Indicator.open()
      document.title = '电子卡分类'
      var that =this
      axios.post(BASE_URL+'/index.php?r=cpsgoods/Cartcount',qs.stringify({

      })).then(function(res){
        Indicator.close();
        that.classify=res.data.data.catgory[0];
        that.card=res.data.data.catgory[2].rows;
      }).catch(function(err){

      })
    },
    updated(){

    },
    activated(){

    },
    components:{
      "search":Search
    }
  }

</script>

<style scoped lang="scss">
  .classify{
    height: 100%;
    width: 100%;
    background: #F5F5F5;
    .classify-top{
      height: 2.25rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #f3f2f8;
      align-items: center;
      padding: 0 0.75rem;
      background:#fff;
      position: fixed;
      top:0rem;
      left:0;
      z-index: 100;
      a{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        border: none;
        border-radius: 50%;
        background: #F5F5F5;
        color:#999;
        text-align: center;
        line-height: 1.4rem;
        color: #999;
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
    .classify-content{
      background:#f3f2f8;
      height: 100%;
      display: flex;
      justify-content: space-between;
      background: #F5F5F5;
      position: relative;
      .classify-nav{
        width: 4rem;
        height: 100%;
        margin-right: 0.6rem;
        overflow: scroll;
        ul{
          margin-top: 2.25rem;
          width: 4rem;
        }
        li{
          width: 4rem;
          height:2.2rem;
          background: #fff;
          text-align: center;
          border-bottom: 1px solid #f3f2f8;
          line-height: 2.2rem;
          font-size:0.6rem;
        }
        .active{
          background: #F5F5F5;
          color: #ff3b3b;
        }

      }
      .classify-nav::-webkit-scrollbar{display:none;}
      .classify-menu{
        background:#f5f5f5;
        display: flex;
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .alltow{
          padding-top: 2.25rem;
          height:100%;
          overflow: scroll;
        }
        .two{

          color: #333;
          font-size: 0.7rem;
          background: #f5f5f5;
          line-height: 1.8rem;
        }
        p{
          padding-left: 0.75rem;
        }
        ul{
          padding:0 0.75rem;
          background: #fff;
          padding-bottom: 0.5rem;
        }
        li{
          width: 33.33%;
          height: 6.25rem;
          float: left;
          text-align: center;
          img{
            width: 3.5rem;
            margin: 0.8rem 0;
            vertical-align: middle;
          }
          p{
            padding: 0 0.2rem;
            font-size: 0.6rem;
          }
        }
      }
      .alltow::-webkit-scrollbar{display:none;}
    }
  }

</style>
