<template>
<div class="income" style="height:100%;">
<header>
  <div class="contianer">
    <nav><span></span><span @click="changeshowtype"  class="checklist">{{typetext}}<b class="iconfont  " :class="showType ?'icon-jiantou1':'icon-jiantou'" ></b>
    <ul class="typelist" v-if="showType">
      <li :class="{sele:type==0}" @click="looktype(0)">全部收入</li>
      <li :class="{sele:type==9}" @click="looktype(9)">微信支付</li>
      <li :class="{sele:type==7}" @click="looktype(7)">信用卡分期</li>
      </ul>
      </span><span>
        <a href="#/travel/history">历史收入</a></span></nav>
    <h4><b>{{allmoney}}</b>元</h4>
    <p>共计<b>{{data.length}}</b>笔</p>
  </div>
</header>
<div class="deal">
  <ul>
    <li v-for="item in data">
      <div class="title"><p class="number">{{item.orderid}}</p><p class="time">{{item.paytime}}</p></div>
      <div class="dealType">{{changetype(item.paytype)}}</div>
      <div class="money">+{{item.orderprice}}</div>
    </li>
  </ul>
</div>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default{
    name: 'Income',
    data() {
      return {
        data:[],
        allmoney:'0.00',
        type:0,
        typetext:'',
        showType:false
      }
    },
    methods: {
        getallMoney(){
          var money =0
          for(var i=0;i<this.data.length;i++){
              money+=this.data[i].orderprice*100
          }
          money=money/100
          this.allmoney= money
        },
        changeshowtype(){
          this.showType=!this.showType
        },
        changetype(type){
          if(type==9){
            return '微信支付'
          }
          if(type==7){
            return '银联信用卡分期'
          }
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
        looktype(num){
            this.type=num
            this.getdata()
        },
        getdata(){
          var that =this
          var token = localStorage.getItem('tenant')
          this.type_cn()
          axios.post(BASE_URL+'/index.php?r=YinjiaStage/GetMerchatOrder',qs.stringify({
            token:token,
            type:this.type
          })).then(function(res){
              var data =JSON.parse(Base64.decode(res.data))
            if(data.code==10000){
              if(data.data.err==10000){
                that.data=data.data.data
                that.getallMoney()
              }
            }
          }).catch(function(err){

          })
        }
    },
    mounted() {
      document.title='退单详情'
      this.getdata()
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
.income{
  display: flex;
  flex-flow: column;
  background:#fff;
  overflow: scroll;
  header{
    width: 100%;
    height: 6.25rem;
    background: #efc37d;
    padding:1rem 0.75rem 0 0.75rem;
    z-index: 999;
  }
  .contianer{
    background: #fff;
    width: 100%;
    height: 7.5rem;
    border-radius: 8px;
    box-shadow:0px 0px 50px rgba(0,0,0,0.1);
    nav{
      display: flex;
      justify-content: space-between;
      padding-top: 0.75rem;
      .checklist{
        position: relative;
        ul{
          position: absolute;
          top: 1.3rem;
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
        .sele{
          background: #f6f6f8;
        }
      }
      span{
        font-size: 0.7rem;
        color: #666666;
        flex: 1;
        text-align: center;
      }
    }
    h4{
      font-size: 0.7rem;
      color: #333;
      text-align: center;
      b{
        line-height: 4.4rem;
        font-size: 2rem;
      }
    }
    p{
      text-align: center;
      font-size:0.7rem;
      color: #666;
      b{
        color: #333333;
        padding: 3px;
      }
    }
  }
  .deal{
    background: #fff;
    ul{
      padding: 0 0.75rem;
       padding-top: 3rem;
      li{
        display: flex;
        font-size: 0.7rem;
        justify-content: space-between;
        border-top: 1px solid #eee;
        height: 3rem;
        .dealType,.money{
          line-height: 3rem;
          font-size: 0.7rem;
        }
        .dealType{
          color: #999;
          display: flex;
          flex: 1;
          margin-left: 1.5rem;
          text-align: center;
        }
        .money{
          color: #333333;
        }
        .title{
          display: flex;
          flex-flow: column;
          padding-top: 0.5rem;
          .time{
            color: #999;
          }
        }
      }
    }
  }
}

</style>
