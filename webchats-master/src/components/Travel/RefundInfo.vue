<template>
  <div class="refund_info" v-if="order">
    <div class="input_box">
      <p><b>退款单号:</b><span>{{order.tdorderid}}</span></p>
      <p><b>申请时间:</b><span>{{order.addtime}}</span></p>
    </div>
    <div class="order_contaner">
      <div class="order_img">
        <img :src="order.pdpicture" alt="">
      </div>
      <div class="order_text">
        <p>{{order.pname}}</p>
        <div class="order_msg">
          {{order.pintro}}
        </div>
        <div class="order_money">
          ￥<b>{{order.tdorderprice}}</b>
        </div>
      </div>
    </div>
    <div class="plan">
      <p>退款进度</p>
      <div class="pian_line">
        <!--<img v-if='order.singlestatus==6' src="../../assets/images/travel/images/plan5.jpg" alt="">-->
        <img :src='"../../assets/images/travel/images/plan"+ order.tstatus +".jpg"' alt=""/>
      </div>
    </div>
    <div class="cause_box">
      <p>退款原因</p>
      <div class="cause_text">{{order.content}}</div>
    </div>
    <div class="money">退款金额 <span>￥{{order.tdorderprice}}</span></div>
    <div class="img">
      <p>退款凭证</p>
      <ul class="clear">
        <li v-for="item in urla">
          <img :src='item' alt="">
        </li>
      </ul>
    </div>
    <div class="oldorder">
      <p class="title">退款订单记录</p>
      <div class="text">
        <p><span>原交易订单号：</span><b>{{order.orderid}}</b></p>
        <!-- <p><span>退款完成时间：</span><b>2018-03-03 12:12:12</b></p> -->
      </div>
    </div>
    <div class="oldrecode" v-if="oldinfo">
      <p class="title">审核未通过记录</p>
      <div class="text" v-for="item in oldinfo">
        <p><span>申请时间：</span><b>{{item.applyTime}}</b></p>
        <p><span>处理结果：</span><b>{{item.content}}</b></p>
        <p><span>处理时间：</span><b>{{item.date}}</b></p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Toast, MessageBox, Indicator} from 'mint-ui'

  export default {
    name: 'RefundInfo',
    data() {
      return {
        ordergoods: '',
        urla: [],
        money: '',
        orderid: '',
        token: '',
        order: '',
        oldinfo: ''
      }
    },
    methods: {},
    mounted() {
      document.title='退单详情'
      this.orderid = this.$route.params.id
      this.token = localStorage.getItem('tenant')
      var that = this
      axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchatSingleRefundOrders', qs.stringify({
        token: this.token,
        orderid: this.orderid
      })).then(function (res) {
        var a = JSON.parse(Base64.decode(res.data))
        if (a.code == 10000) {
          if (a.data.err == 10000) {
            that.order = a.data.data
            that.urla = JSON.parse(a.data.data.urla)
            that.oldinfo = JSON.parse(a.data.data.operate_content)
          } else {
            Toast(a.msg)
          }
        } else {
          Toast(a.info)
        }
      }).catch(function (err) {

      })
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .refund_info {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f4f5f6;
    .input_box {
      display: flex;
      align-items: center;
      height: 2.25rem;
      color: #666666;
      border-bottom: 1px solid #eee;
      background: #f5f6f7;
      padding: 0 0.75rem;
      display: flex;
      justify-content: space-between;
      p {
        b {
          font-size: 0.6rem;
          font-weight: 800;
          margin-right: 0.4rem;
          font-weight: normal;
        }
        span {
          border: none;
          font-size: 0.6rem;
        }
      }

    }
    .order_contaner {
      display: flex;
      justify-content: space-around;
      padding: 0.75rem;
      overflow: hidden;
      height: 5.5rem;
      background: #fff;
      .order_img {
        width: 4rem;
        img {
          width: 100%;
        }
      }
      .order_text {
        display: flex;
        flex: 1;
        flex-flow: column;
        padding-left: 0.5rem;
        p {
          font-size: 0.65rem;
          color: #333;
          font-weight: bold;
          height: 1.05rem;
        }
        .order_msg {
          font-size: 0.55rem;
          color: #999;
          display: flex;
          flex: 1;
        }
        .order_money {
          height: 0.9rem;
          font-size: 0.6rem;
          font-weight: bold;
          color: #ff3636;
          b {
            font-size: 0.85rem;
          }
        }
      }
    }
    .plan {
      background: #ffffff;
      margin-top: 0.75rem;
      padding: 0 0.75rem;

      p {
        font-weight: bold;
        font-size: 0.7rem;
        line-height: 2.25rem;
        border-bottom: 1px solid #eee;
        color: #333;
      }
      .pian_line {
        width: 100%;
        padding: 0.75rem 0;
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .cause_box {
      background: #ffffff;
      padding: 0 0.75rem;
      margin-top: 0.75rem;
      p {
        font-weight: bold;
        font-size: 0.7rem;
        line-height: 2.25rem;
        border-bottom: 1px solid #eee;
        color: #333;
      }
      .cause_text {
        border: none;
        width: 100%;
        border: none;
        color: #666666;
        font-size: 0.6rem;
        padding: 0.75rem 0;
        box-sizing: border-box;
        padding-bottom: 1.5rem;
      }
    }
    .money {
      font-weight: bold;
      font-size: 0.7rem;
      line-height: 2.25rem;
      padding-left: 0.75rem;
      background: #fff;
      margin-top: 0.75rem;
      span {
        margin-left: 0.75rem;
        color: #ff3f3f;
      }
    }
    .img {
      margin-top: 0.75rem;
      background: #fff;
      padding: 0 0.75rem;
      overflow: hidden;
      p {
        font-weight: bold;
        font-size: 0.7rem;
        line-height: 2.25rem;
        border-bottom: 1px solid #eee;
        color: #333;
      }
      ul {
        width: 110%;
        padding-top: 0.75rem;
        li {
          width: 4rem;
          height: 4rem;
          float: left;
          margin-right: 0.4rem;
          margin-bottom: 0.4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        ul::after {
          content: '';
          height: 0;
          clear: both;
          overflow: hidden;
        }
      }
    }
    .oldorder {
      margin-top: 0.75rem;
      background: #fff;
      padding: 0 0.75rem;
      .title {
        font-size: 0.7rem;
        line-height: 2.25rem;
        border-bottom: 1px solid #eee;
        color: #333;
        font-weight: bold;
      }
      .text {
        font-size: 0.6rem;
        color: #666;
        padding: 0.75rem 0rem 1rem 0rem;
        p {
          line-height: 1rem;
        }
      }
    }
    .oldrecode {
      margin-top: 0.75rem;
      background: #fff;
      padding: 0 0.75rem;
      .title {
        font-size: 0.7rem;
        line-height: 2.25rem;
        border-bottom: 1px solid #eee;
        color: #333;
        font-weight: bold;
      }
      .text {
        font-size: 0.6rem;
        color: #666;
        padding: 0.75rem 0rem 1rem 0rem;
        p {
          line-height: 1rem;
          b {
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
