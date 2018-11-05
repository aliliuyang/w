<template>
  <div class="successful_trade">
    <div class="money">
      <p>{{order.orderprice}}</p>
      <span>总交易(元)</span>
      <div class="graphical"></div>
      <div class="transaction_content">
        <div>
          <label>交易订单号</label>
          <span>{{orderid}}</span>
        </div>
        <div>
          <label>商品名称</label>
          <span>{{order.pname}}</span>
        </div>
        <div>
          <label>支付方式</label>
          <span>{{order.payType_cn}}</span>
        </div>
        <div>
          <label>分期期数</label>
          <span>{{order.stageType_cn}}</span>
        </div>
        <div>
          <label>交易金额</label>
          <span>{{order.orderprice}}</span>
        </div>
        <div class=" time" style="border: none;">
          <label>交易时间</label>
          <span>{{order.paytime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  import {Toast,Indicator} from "mint-ui";

  export default {
    name: 'Sccessful',
    data() {
      return {
        order: '',
        orderid: ""
      }
    },
    mounted() {
      Indicator.open()
      var that = this
      this.orderid = this.$route.params.orderid
      this.token = (this.$route.params.token).replace(/@/g,'/')
      var that = this
      setTimeout(function(){
        axios.post(BASE_URL+'/index.php?r=YinjiaStageShare/OrderInfo',qs.stringify({
          token:that.token,
          orderid:that.orderid,
        })).then(function(res){
          Indicator.close()
          var a = Base64.decode(res.data)
          a=JSON.parse(a)
          if(a.code==10000){
            if(a.data.err==10000){
              that.order=a.data.data.res
            }else{
              Toast({
                message: a.data.msg,
                duration: 5000
              })
            }
          }else{
            Toast({
              message: a.info,
              duration: 5000
            })
          }
        }).catch(function(err){
          Indicator.close()
          Toast('网络故障，请稍后再试')
        })
      },5000)
    }
  }
</script>

<style scoped>
  div.successful_trade {
  }

  div.successful_trade div.money {
    width: 100%;
    padding: 2.675rem 0px 0.925rem 0px;
    background-color: #36c65f;
    position: relative;
  }

  div.successful_trade div.money p {
    text-align: center;
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  div.successful_trade div.money span {
    text-align: center;
    color: #fffefe;
    font-size: 0.65rem;
    display: block;
  }

  div.successful_trade div.money div.graphical {
    width: 18rem;
    height: 0.75rem;
    background-color: #248940;
    border-radius: 0.875rem;
    margin: 1.125rem auto 0 auto;
  }

  div.successful_trade div.money div.transaction_content {
    width: 17.25rem;
    background-image: url(../../assets/images/j-pay-img/transaction_content.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 83%;
    left: 50%;
    margin-left: -8.625rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

  div.successful_trade div.money div.transaction_content:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  div.successful_trade div.money div.transaction_content div {
    margin: 0rem 0.75rem;
    padding: 0.75rem 0.75rem;
    zoom: 1;
    border-bottom: 1px dashed #dddddd;
  }

  div.successful_trade div.money div.transaction_content div:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  div.successful_trade div.money div.transaction_content div label {
    float: left;
    font-size: 0.7rem;
    color: #999999;
  }

  div.successful_trade div.money div.transaction_content div span {
    float: right;
    font-size: 0.7rem;
    color: #333333;
  }

  div.successful_trade div.money div.transaction_content div label.clr {
    color: #34c45d;
  }

  div.successful_trade div.money div.transaction_content div span.clr {
    color: #999999;
  }
</style>
