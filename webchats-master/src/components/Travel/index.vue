<template>
  <div class="travel-index">
    <div class="one">
      <header>
        <div class="merchant">
          <div class="merchant-img">
            <a href="#/travel/Settlement"> <img :src="my.logo" alt=""></a>
          </div>
          <div class="merchant-data">
            <div class="merchant-text">
              <p class="name"><b v-text="my.companyname"></b></p>
              <p class="address">{{my.province_cn}}{{my.city_cn}}</p>
            </div>
            <div class="issue">
              <button><a @click="goaddgoods">发布商品</a></button>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <section>
          <!--<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :auto-fill="false" ref='loadmore' :bottomDistance=150 >-->
          <ul>
            <li v-for="goods,index in tenant">
              <div class="goodstit">
                <div class="img"><img :src="goods.pdpicture" alt=""></div>
                <div class="goods">
                  <p class="goodsname" v-text="goods.pname"></p>
                  <p class="goodstext" v-text="goods.pintro"></p>
                  <h5><b>￥ </b><span v-text="goods.pmoney"></span></h5>
                </div>
              </div>
              <div class='gopay'>
                <a  @click='back(1,"#/travel/receivables/"+goods.pid +"/card" ,goods.pmoney)' :class="{cardpay:!isOpenF}">分期收款</a><!-- -->
                <a   @click='back(2,"#/travel/receivables/"+goods.pid+"/wx",goods.pmoney)' :class="{cardpay:!isOpenW}">微信收款</a>
                <button @click="deleteGoods(goods.pid,index)"></button>
              </div>
            </li>
          </ul>
          <!--</mt-loadmore>-->
        </section>
      </div>
    </div>
    <travel-tab :selectedpage="'商品'"></travel-tab>
  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  import {Indicator, Toast, MessageBox} from 'mint-ui'
  import TravelTab from './TravelTab'

  export default {
    name: 'TravelIndex',
    data() {
      return {
        tenant: [],
        my: '',
        token: '',
        ishave: false,
        issure: false,
        isOpenW:false,
        isOpenF:false,
        wxmax:'',
        status:null,//账户状态
      }
    },
    methods: {
      back(type,src,money) {
          // MessageBox.alert('正在开发中，请您耐心等待')
        if(this.status!=0){
          MessageBox.alert('您的账户已经冻结，请联系客服')
          return
        }
        if (type==1) {
          if(this.isOpenF){
            window.location.href=src
          }else{
              MessageBox.alert('您未开通分期收款')
          }
        }else{
          if(this.isOpenW){
            // if(this.wxmax-money>=0){
              window.location.href=src
            // }else{
            //   MessageBox.alert('微信支付最大限额'+this.wxmax)
            // }
          }else{
              MessageBox.alert('您未开通微信收款')
          }
        }
      },
      loadBottom() {

      },
      goaddgoods() {
        if (this.ishave) {
          if (this.issure) {
            if(this.status==0){
              window.location.href = '#/travel/publish'
            }else{
              MessageBox.alert('您的账户已经冻结，请联系客服')
            }
          } else {
            MessageBox.alert('您的信息正在认证中，请耐心等待')
          }
        } else {
          MessageBox.alert('您还未填写对公账户，请前去填写').then(action => {
            window.location.href = '#/travel/addcredit'
          });
        }
      },
      //删除
      deleteGoods(pid, index) {
        if(this.status!=0){
          MessageBox.alert('您的账户已经冻结，请联系客服')
          return
        }
        var that = this
        MessageBox.confirm("您确定删除此商品", '  ').then(action => {
          Indicator.open()
          axios.post(BASE_URL + '/index.php?r=YinjiaStage/DelMerchGoods', qs.stringify({
            token: this.token,
            productId: pid
          })).then(function (res) {
            Indicator.close()
            var data = JSON.parse(Base64.decode(res.data))
            if (data.code == 10000) {
              that.tenant.splice(index, 1)
              Toast('删除成功')
            } else {
              Toast(data.info)
            }
          }).catch(function (err) {
          })
        })
      },
      getgoods() {
        var that = this
        Indicator.open()
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchGoods', qs.stringify({
          token: this.token
        })).then(function (res) {
          Indicator.close()
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              that.tenant = a.data.data
              if (!that.tenant.length) {
                Toast('暂无发布商品')
              }
            } else {
              Toast('商品列表获取失败，请刷新页面')
            }

          } else {
            Toast('商品列表获取失败')
          }
        }).catch(function (err) {

        })
      },
      getMerchatInfo(){
        //获取账户信息
        var that =this
         Indicator.open()
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchatInfo', qs.stringify({
          token: this.token
        })).then(function (res) {
           Indicator.close()
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              that.my = a.data.data
              if (a.data.data.attestation == 1) {
                that.issure = true
                that.isOpenF=a.data.data.isOpenF
                that.isOpenW=a.data.data.isOpenW
                that.status=a.data.data.status
                that.wxmax=a.data.data.payLimit
                that.getgoods()
              }
            }else if (a.code == 10007) {
              localStorage.removeItem('tenant')
              window.location.href = '#/travel/login'
              return
            } else {
              Toast('商户信息获取失败，请刷新页面')
            }
          } else {
            Toast(a.info)
          }
        }).catch(function (err) {
              Indicator.close()
        })
      }

    },
    mounted() {
      document.title = '分期业务'
      var that = this
      this.token = localStorage.getItem('tenant')
      if (!this.token) {
        window.location.href = '#/travel/login'
      } else {
        Indicator.open()
        //验证商户有无对公账户
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchBank', qs.stringify({
          token: this.token,
        })).then(function (res) {
          Indicator.close()
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              if (a.data.data.bankno) {
                that.ishave = true
                that.getMerchatInfo()
              }
            }
          } else if (a.code == 10007) {
            localStorage.removeItem('tenant')
            window.location.href = '#/travel/login'
            return
          }else if(a.code==10008){
            MessageBox.alert('请补全对公账户信息', '提示').then(action => {
              window.location.href = '#/travel/addcredit'
            })
        } else{
            Toast(a.info)
          }
        }).catch(function (err) {
            Indicator.close()
        })


      }
    },
    updated() {
    },
    activated() {
    },
    components: {
      'travel-tab': TravelTab
    }
  }
</script>

<style scoped lang="scss">
  .travel-index {
    height: 100%;
    display: flex;
    flex-flow: column;
    .one {
      height: 100%;
      overflow: scroll;
      padding-bottom: 2.5rem;
      background: #f5f5f5;
    }
    header {
      height: 6.95rem;
      background: #f0c37c;
      padding: 0 0.75rem;
      z-index: 999;
      padding-top: 2.75rem;
      .merchant {
        width: 100%;
        height: 5.75rem;
        background: #fff;
        border-radius: 8px;
        position: relative;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
        .merchant-img {
          width: 3rem;
          height: 3rem;
          border-radius: 8px;
          position: absolute;
          top: -1.5rem;
          left: 1rem;
          img {
            width: 100%;
            border-radius: 8px;
          }
        }
        .merchant-data {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          .merchant-text {
            padding-top: 2.5rem;
            padding-left: 1rem;
            .name {
              color: #333;
              font-size: 0.7rem;
              line-height: 1rem;
            }
            .address {
              color: #bfbfbf;
              font-size: 0.5rem;
            }
          }
          .issue {
            display: flex;
            align-items: center;
            padding-right: 1rem;
            button {
              height: 1.5rem;
              width: 4.3rem;
              background: #ffdb49;
              border: none;
              color: #333;
              font-size: 0.6rem;
              text-align: center;
              border-radius: 0.75rem;
              box-shadow: 0px 3px 15px rgba(255, 219, 73, 0.5);
            }
          }
        }
      }
    }
    //内容列表
    .container {
      background: #ececee;
      display: flex;
      flex: 1;
      flex-flow: column;
      /*.top{*/
      /*height: 2.5rem;*/
      /*width: 100%;*/
      /*}*/

      section {
        display: flex;
        background: #f1f1f2;
        ul {
          padding-top: 2.5rem;
          width: 100%;
          li {
            background: #fff;
            padding: 0 0.75rem;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            display: flex;
            flex-flow: column;
            margin-bottom: 0.5rem;
            width: 100%;
            .goodstit {
              width: 100%;
              display: flex;
              justify-content: space-around;
              padding: 0.75rem 0;
              border-bottom: 1px solid #eee;
              flex: 1;
              .img {

                width: 4.5rem;
                margin-right: 0.5rem;
                img {
                  width: 100%;
                }
              }
              .goods {
                display: flex;
                flex: 1;
                flex-flow: column;
                .goodsname {
                  font-size: 0.65rem;
                  color: #333;
                  font-weight: bold;
                  height: 1.1rem;
                  overflow: hidden;
                }

                .goodstext {
                  font-size: 0.5rem;
                  color: #666;
                  flex: 1;
                  overflow: hidden;
                }
                h5 {
                  color: #ff3737;
                  font-size: 0.7rem;
                  height: 0.75rem;
                  b {
                    font-size: 0.5rem;
                  }
                }
              }
            }
            .gopay {
              height: 2.25rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              a {
                background: #ff0000;
                line-height: 1.5rem;
                color: #fff;
                font-weight: bold;
                padding: 0 1rem;
                font-size: 0.65rem;
                margin-right: 0.5rem;
              }
              .cardpay {
                background: #c4b1b1;
              }
              button {
                width: 1.5rem;
                height: 1.5rem;
                border: 1px solid #cacaca;
                background: url(../../assets/images/travel/lese.png) no-repeat center;
                background-size: 70%;
              }
            }
          }
        }
      }

    }

  }

</style>
