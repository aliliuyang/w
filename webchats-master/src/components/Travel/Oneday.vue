<template>
  <div class="oneday" style="height:100%;">
    <header>
      <div class="contianer">
        <nav><span>{{day}}</span><span class="checklist" @click="changeshowtype">{{typetext}}
          <b class="iconfont  " :class="showType ?'icon-jiantou1':'icon-jiantou'" ></b>
      <ul class="typelist" v-if="showType">
        <li :class="{sele:type==0}" @click="looktype(0)">全部收入</li>
        <li :class="{sele:type==9}" @click="looktype(9)">微信支付</li>
        <li :class="{sele:type==7}" @click="looktype(7)">信用卡分期</li>
      </ul></span><span></span></nav>
        <h4><b>{{data.money}}</b>元</h4>
        <p>共计<b>{{allnum}}</b>笔</p>
      </div>
    </header>
    <div class="deal">
      <ul>
        <li v-for="item in data.order">
          <div class="title"><p class="number">{{item.orderid}}</p>
            <p class="time">{{item.paytime}}</p></div>
          <div class="dealType">{{changetype(item.paytype)}}</div>
          <div class="money">+{{item.pmoney}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'Oneday',
    data() {
      return {
        token: '',
        data: [],
        allmoney: '',
        allnum: 0,
        day: '',
        type:0,
        showType:false,
        typetext:'全部收入'
      }
    },
    methods: {
      changetype(type){
        if(type==9){
          return '微信支付'
        }
        if(type==7){
          return '银联信用卡分期'
        }
      },
      getorder(){
        var that = this
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetOrderPass', qs.stringify({
          token: this.token,
          paytime: this.day,
          type:this.type
        })).then(function (res) {
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              that.data = a.data.data
              that.allnum = a.data.data.order.length
            } else {
              Toast(a.msg)
            }
          } else {
            Toast(a.info)
          }
        }).catch(function (err) {

        })
      },
      type_cn(){
        if(this.type==0){
          this.typetext= '全部收入'
        }
        if(this.type==9){
          this.typetext='微信支付'
        }
        if(this.type==7){
          this.typetext= '信用卡分期'
        }
      },
      changeshowtype(num){
          this.showType=!this.showType
      },
      looktype(num){
        this.type=num
        this.type_cn()
        this.getorder()
      }
    },
    mounted() {
      document.title='订单记录'
      this.day = this.$route.params.date
      this.token = localStorage.getItem('tenant')
      this.getorder()
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .oneday {
    display: flex;
    flex-flow: column;
    background: #fff;
    overflow: scroll;
    header {
      width: 100%;
      height: 6.25rem;
      background: #efc37d;
      padding: 1rem 0.75rem 0 0.75rem;
      z-index: 999;
    }
    .contianer {
      background: #fff;
      width: 100%;
      height: 7.5rem;
      border-radius: 8px;
      box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
      nav {
        display: flex;
        justify-content: space-between;
        padding-top: 0.75rem;
        .checklist {
          position: relative;
          ul {
            position: absolute;
            top: 1rem;
            left: 0;
            background: #fff;
            border: 1px solid #eee;
            width: 100%;
            text-align: center;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            line-height: 2rem;
          }
        }
        .sele{
          background: #f6f6f8;
        }
        span {
          font-size: 0.7rem;
          color: #666666;
          flex: 1;
          text-align: center;
        }
      }
      h4 {
        font-size: 0.7rem;
        color: #333;
        text-align: center;
        b {
          line-height: 4.4rem;
          font-size: 2rem;
        }
      }
      p {
        text-align: center;
        font-size: 0.7rem;
        color: #666;
        b {
          color: #333333;
          padding: 3px;
        }
      }
    }
    .deal {
      background: #fff;
      ul {
        padding: 0 0.75rem;
        padding-top: 3rem;
        li {
          display: flex;
          font-size: 0.7rem;
          justify-content: space-between;
          border-top: 1px solid #eee;
          height: 3rem;
          .dealType, .money {
            line-height: 3rem;
            font-size: 0.7rem;
            display: flex;
            flex: 1;
            margin-left: 1rem;
          }
          .dealType {
            color: #999;
          }
          .money {
            color: #333333;
          }
          .title {
            display: flex;
            flex-flow: column;
            padding-top: 0.5rem;
            .time {
              color: #999;
            }
          }
        }
      }
    }
  }

</style>
