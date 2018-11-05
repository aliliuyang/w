<template>
  <div class="refund_record">
    <ul>
      <li v-for="item,index in data">
        <div class="orderid"><span>退款单号：<b>{{item.tdorderid}}</b></span>
          <div class="btn">
            <button v-if="item.tstatus==2||item.tstatus==4" @click="quxiao(item.tdorderid,index)">取消退款</button>
            <a v-if="item.tstatus==6" :href='"#/travel/backmoney/" + item.orderid '>修改</a></div>
        </div>
        <div class="order_contaner">
          <div class="order_img">
            <img :src="item.pdpicture" alt="">
          </div>
          <div class="order_text">
            <p>{{item.pname}}</p>
            <div class="order_msg">
              {{item.pintro}}
            </div>
            <div class="order_money">
              ￥<b>{{item.tdorderprice}}</b>
            </div>
          </div>
        </div>
        <a :href='"#/travel/refundinfo/"+item.orderid'>
          <div class="refund_status">
            <div class="status_img">
              <img src="../../assets/images/travel/repulse.png" alt="" v-if="item.tstatus==6">
              <img v-else src="../../assets/images/travel/ok.png" alt="">
              <i>{{item.tstatus_cn}}</i>
            </div>
            <div class="status_text">
              您的退款订单{{item.orderid}}{{item.tstatus_cn}}
            </div>
            <i class="iconfont icon-jiantou-copy"></i>
          </div>
        </a>
      </li>
      <!-- <li>
        <div class="orderid"><span>退款单号：<b>154545451154</b></span> <div class="btn"><button>取消退款</button><a href="">修改</a></div></div>
        <div class="order_contaner">
          <div class="order_img">
            <img src="../../assets/images/travelTest/goods.jpg" alt="">
          </div>
          <div class="order_text">
            <p>后来看客户客户</p>
            <div class="order_msg">
              大师傅沙发的萨达烦死哒尴尬死的刚度
            </div>
            <div class="order_money">
              ￥<b>5000.</b>00
            </div>
          </div>
        </div>
        <div class="refund_status">
          <div class="status_img">
            <img src="../../assets/images/travel/repulse.png" alt="">
            <i>申请中</i>
          </div>
          <div class="status_text">
            放假惊世毒妃订单
          </div>
          <i class="iconfont icon-jiantou-copy"></i>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    name: 'RefundRecord',
    data() {
      return {
        token: '',
        data: []
      }
    },
    methods: {
      getorderlist() {
        var that = this
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchatRefundOrders', qs.stringify({
          token: this.token
        })).then(function (data) {
          var res = Base64.decode(data.data)
          res = JSON.parse(res)
          if (res.code == 10000) {
            if (res.data.err = 10000) {
              that.data = res.data.data
            } else {
              Toast(res.data.msg)
            }
          } else {
            Toast(res.info)
          }
        }).catch(function (err) {

        })
      },
      quxiao(torderid, index) {
        var that = this
        MessageBox.confirm('确定取消退款？', '提示').then(action => {
          axios.post(BASE_URL + '/index.php?r=YinjiaStage/CancelRefund', qs.stringify({
            token: this.token,
            tdorderid: torderid
          })).then(function (data) {
            var res = Base64.decode(data.data)
            res = JSON.parse(res)
            if (res.code == 10000) {
              Toast('删除成功')
              that.getorderlist()
            } else {
              Toast(res.info)
            }
          }).catch(function (err) {

          })
        }, action => {
          return false
        })

      }
    },
    mounted() {
      document.title='退单列表'
      this.token = localStorage.getItem('tenant')
      this.getorderlist()
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .refund_record {
    width: 100%;
    height: 100%;
    overflow: scroll;
    ul {
      li {
        background: #fff;
        padding-bottom: 1.25rem;
        margin-bottom: 0.4rem;
        .orderid {
          display: flex;
          justify-content: space-between;
          padding: 0 0.75rem;
          border-bottom: 1px solid #eee;
          span {
            font-size: 0.7rem;
            color: #666;
            height: 2.5rem;
            display: flex;
            align-items: center;
            b {
              font-weight: normal;
            }
          }
          .btn {
            display: flex;
            align-items: center;
            font-size: 0.65rem;
            color: #333;
            button {
              border: 1px solid #333;
              line-height: 1.5rem;
              background: #FFF;
              padding: 0 0.8rem;
            }
            a {
              outline: none;
              background: #ffdb49;
              line-height: 1.6rem;
              margin-left: 0.25rem;
              padding: 0 0.5rem;
            }
          }
        }
        .order_contaner {
          display: flex;
          justify-content: space-around;
          padding: 0.75rem;
          overflow: hidden;
          height: 5.5rem;
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
        .refund_status {
          display: flex;
          justify-content: space-between;
          background: #f9f9f9;
          font-size: 0.5rem;
          color: #333;
          padding: 0 0.75rem;
          height: 2.25rem;
          align-items: center;
          overflow: hidden;
          .status_img {
            height: 1.5rem;
            display: flex;
            align-items: center;
            border-right: 2px solid #e3e5e9;
            margin-right: 0.75rem;
            padding-right: 0.75rem;
            img {
              height: 0.9rem;
              margin-right: 0.3rem;
            }
          }
          .status_text {
            display: flex;
            flex: 1;
            text-align: right;
          }
          i {
            color: #999999;
          }
        }
      }
    }
  }

</style>
