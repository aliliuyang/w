<template>
  <div id="submit-order">
    <div v-show='!selecAddress' v-if="showhide">
      <div class="default-address" v-if='alladdress.length'>
        <div class="" @click="showaddress">
          <p class="person"><span>{{shouAddress.consigneename}}</span><span class="phone-num">{{shouAddress.consigneephone}}</span>
          </p>
          <p class="payaddress"><span class="iconfont icon-dizhi"></span>&nbsp;&nbsp;<span>{{shouAddress.province_cn+shouAddress.city_cn+shouAddress.county_cn+shouAddress.street}}</span>
          </p>
        </div>
        <div class="add">
          <b class="iconfont icon-jiantou-copy" @click="showaddress"></b>
        </div>
      </div>
      <div class="default-address" v-if='!alladdress.length'>
        <a class="noaddress" href="#/addaddress">您还没有地址，快去添加地址<b class="iconfont icon-jiantou-copy"></b></a>
      </div>
      <div v-if='showgoods'>
        <div class="submit-list">商品清单</div>

        <!--电子卡订单-->
        <div v-if="cardorder.length">
          <div class="submit-goods" v-for='item in cardorder'>
            <div class="goods-img">
              <a :href="item.wxgoodshref">
                <img :src="item.img"/>
              </a>
            </div>
            <div class="goods-name">
              <p class="name">{{item.name}}</p>
              <p class="style"></p>
              <h4><b>¥ <span>{{item.frontPrice}}</span></b> <span class="number">x{{item.number}}</span></h4>
              <h5 v-if="item.zxtprejiage != 0"><b>¥ {{item.zxtprejiage}}</b> <span class="number">中欣通专享价</span></h5>
            </div>
          </div>
          <div class="card-order">
            <p>卡密码获取方式<span>支付成功后，卡密将发送至此手机</span></p>
            <p>手机号码：<input type="text" placeholder="请输入有效的手机号码获取验证码" v-model="phonenum"/></p>
            <p>验证码：<input type="text" v-model="code" placeholder="请输入短信验证码"/>
              <button @click="yanzheng">{{codetime}}</button>
            </p>
          </div>
        </div>
        <!--    京东订单--->
        <div class="submit-goods" v-for='item in paygoods'>
          <div class="goods-img">
            <a :href="item.wxgoodshref">
              <img :src="item.img"/>
            </a>
          </div>
          <div class="goods-name">
            <p class="name">{{item.name}}</p>
            <p class="style" v-if="item.options">属性：{{item.options}}</p>
            <h4><b>¥ <span>{{item.frontPrice}}</span></b> <span class="number">x{{item.number}}</span></h4>
            <h5 v-if="item.zxtprejiage != 0"><b>¥ {{item.zxtprejiage}}</b> <span class="number">中欣通专享价</span></h5>
          </div>
        </div>
        <!--实体卡-->
        <div v-if="shiticard.length" class="submit-goods" v-for='item in shiticard'>
          <div class="goods-img">
            <a :href="item.wxgoodshref">
              <img :src="item.img"/>
            </a>
          </div>
          <div class="goods-name">
            <p class="name">{{item.name}}</p>
            <p class="style" v-if="item.options"></p>
            <h4><b>¥ <span>{{item.frontPrice}}</span></b> <span class="number">x{{item.number}}</span></h4>
            <h5 v-if="item.zxtprejiage != 0"><b>¥ {{item.zxtprejiage}}</b> <span class="number">中欣通专享价</span></h5>
          </div>
        </div>

        <div class="submit-goods" v-if='insufficient.length' v-for='item in insufficient'>
          <div class="goods-img">
            <a :href="item.wxgoodshref">
              <div class="area"></div>
              <p>无货</p>
              <img :src="item.img"/>
            </a>
          </div>
          <div class="goods-name">
            <p class="name">{{item.name}}</p>
            <p class="style" v-if="item.options">属性：{{item.options}}</p>
            <h4><b>¥ <span>{{item.frontPrice}}</span></b> <span class="number">x{{item.number}}</span></h4>
            <h5 v-if="item.zxtprejiage != 0"><b>¥ {{item.zxtprejiage}}</b> <span class="number">中欣通专享价</span></h5>
          </div>
        </div>
        <div class="submit-goods" v-if='area.length' v-for='item in area'>
          <div class="goods-img">
            <a :href="item.wxgoodshref">
              <div class="area"></div>
              <p>地区限制</p>
              <img :src="item.img"/>
            </a>
          </div>
          <div class="goods-name">
            <p class="name">{{item.name}}</p>
            <p class="style" v-if="item.options">属性：{{item.options}}</p>
            <h4><b>¥ <span>{{item.frontPrice}}</span></b> <span class="number">x{{item.number}}</span></h4>
            <h5 v-if="item.zxtprejiage != 0"><b>¥ {{item.zxtprejiage}}</b> <span class="number">中欣通专享价</span></h5>
          </div>
        </div>

        <!--订单优惠-->
        <!--<div class="qudou">
                    <div class="myqudou">
                        <span>我的趣豆</span>
                        <span><i v-show="showqudou">-¥&nbsp;<b>{{qudouzikou}}</b> &nbsp;&nbsp;</i>
                        <b @click="qudou" class="iconfont" :class="[this.showqudou? 'icon-jiantou':'icon-jiantou-copy']"></b></span>
                    </div>
                    <div v-show="showqudou" class="usequdou">
                        <div>
                            趣豆：<span>300</span>
                        </div>
                        <div class="use">
                            <p>使用趣豆：<input type="text" v-model="usequdou"/>&nbsp;抵扣¥{{qudouzikou}}</p>
                        </div>
                    </div>
                </div>-->
        <div class="youhuiquan" @click="yhq">
          <span>优惠券</span>

          <span class="sfr"><b class="iconfont icon-jiantou-copy" v-if="!favorablePrice"></b><i v-else>- ¥ {{favorablePrice}}</i></span>
        </div>
        <div class="total" v-if='showgoods'>
          <div class="zongjia">
            <p>总商品金额</p>
            <span>¥&nbsp;<b>{{allmoney}}</b></span>
            <!--<span>¥&nbsp;<b>{{allmoney}}</b></span>-->
          </div>
          <div class="yunfei">
            <p>运费</p>
            <span>¥&nbsp;<b>{{fare}}</b></span>
          </div>
          <div class="youhuifei" v-if="quany">
            <p>优惠券</p>
            <span>-&nbsp;¥&nbsp;<b>{{favorablePrice}}</b></span>
          </div>
          <!--<div class="qudoufei">
                        <p>趣豆</p>
                        <span>¥&nbsp;<b>{{qudouzikou}}</b></span>
                    </div>-->
        </div>
      </div>
      <div class="bottom"></div>
      <div class="order-tab">
        <!--<div @click="aaa">订单金额：&nbsp;<p>¥<span v-text="calculation" ></span></p></div>-->
        <div>订单金额：&nbsp;<p>¥<span v-text="calculation"></span></p></div>
        <a @click="makeOrder">提交订单</a>
      </div>
    </div>
    <selec-address v-if='selecAddress' :alladdress=alladdress :slelct=shouAddress
                   :changeaddress=changeaddress></selec-address>
    <!--优惠券-->
    <div class="coupon" v-if="csh">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">可用优惠券</mt-tab-item>
        <mt-tab-item id="2">不可用优惠券</mt-tab-item>

      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul>
            <li>
              <a class="a1" v-for="item in use" @click="icheck(item)">
                <!--<a href="" class="a1">-->
                <span class="box">
			    				<span class="font1">{{item.money}}</span>
			    				<span class="font2">元</span>
			    				<span class="font3">满{{item.fullmoney}}元可使用</span>
			    			</span>
                <div class="boxs">
                  <b class="box1">
                    <i class="ibox1">趣券</i>
                    <i class="ibox2">{{item.shortname}}</i>
                  </b>
                  <b class="box2">
                    <i class="ibox1">有效期截止<span>{{getday(item.enddate)}}</span></i>
                  </b>
                </div>
                <span class="ir " :class="{'ic':item.couid==checkid.couid}"></span>
              </a>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul>
            <li>
              <a class="a2" v-for="item,index in notuse">
			    			<span class="box">
			    				<span class="font1">{{item.money}}</span>
			    				<span class="font2">元</span>
			    				<span class="font3">满{{item.fullmoney}}元可使用</span>
			    			</span>
                <div class="boxs">
                  <b class="box1">
                    <i class="ibox1">趣券</i>
                    <i class="ibox2">{{item.shortname}}</i>
                  </b>
                  <b class="box2">
                    <i class="ibox1">有效期截止<span>{{getday(item.enddate)}}</span></i>
                  </b>
                </div>
              </a>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="dern">
        <button class="determine" @click="determines">确定</button>
        <button class="return" @click="returns">返回</button>
      </div>
    </div>
    <!--优惠券-->
  </div>
</template>
<script>
  import {MessageBox} from "mint-ui";
  import axios from "axios";
  import qs from "qs";
  import SelecAddress from "./SelecAddress";
  import {Toast} from "mint-ui";
  import {Indicator} from "mint-ui";
  import {mapState, mapActions} from 'vuex'

  import {Radio} from 'mint-ui';

  export default {
    name: "SubmitOrder",
    data() {
      return {
        showqudou: false,
        cardorder: [],
        shiticard: [],
        selecAddress: false,
        phonenum: "",
        usequdou: 0,
        paygoods: [],
        insufficient: [],
        area: [],
        allmoney: 0.0,
        fare: 0.0,
        alladdress: [],
        shouAddress: [],
        paymoney: null,
        code: "",
        codetime: "获取验证码",
        showgoods: false,
        //优惠券
        showhide: true,
        csh: false,
        selected: '1',
        use: [],
        notuse: [],
        checkid: '',
        quany: false
        //优惠券
      };
    },
    computed: {
      ...mapState({
        useaddress: 'useaddress',
      }),
      qudouzikou() {
        return (this.usequdou / 1000).toFixed(2);
      },
      favorablePrice() {
        let Prices = 0
        if (!this.checkid.money) {
          Prices = 0
        } else {
          Prices = Number(this.checkid.money)
        }

        return Prices
      },
      calculation() {
        let calculations = 0
        calculations = Number(this.paymoney - this.favorablePrice).toFixed(2)
        return calculations
      }
    },
    methods: {
      getday(date) {
        var day = date.split(' ')[0]
        day = day.replace(/-/g, '.')
        return day
      },
      qudou() {
        this.showqudou = !this.showqudou;
      },
      yanzheng() {
        var that = this;
        var token = localStorage.getItem("token");
        if (this.codetime <= 60) {
          return;
        } else {
          axios
            .post(
              BASE_URL + "/index.php?r=shop/Sendapi",
              qs.stringify({
                mobile: this.phonenum,
                token: token
              })
            )
            .then(function (res) {
              if (res.data.data.err == 10002) {
                that.codetime = 60;
                MessageBox({
                  title: "提示",
                  message: "验证码已发送至" + that.phonenum
                });
                var timer = null;
                timer = setInterval(function () {
                  if (that.codetime == 1) {
                    that.codetime = "获取验证码";
                    clearTimeout(timer);
                  } else {
                    that.codetime--;
                  }
                }, 1000);
              } else {
                MessageBox({
                  title: "提示",
                  message: "获取失败，请稍后再试"
                });
              }
            })
            .catch(function (err) {
            });
        }
      },
      showaddress() {
        this.selecAddress = true;
      },
      changeaddress(arr) {
        //查库存
        Indicator.open();
        var that = this
        var token = localStorage.getItem("token");
        axios.post(
          BASE_URL + "/index.php?r=address/getByUserid",
          qs.stringify({
            token: token
          })
        )
          .then(function (res) {
            var a = JSON.parse(Base64.decode(res.data));
            if (a.code == 1000) {
              that.alladdress = a.data.data;
            } else {
              Toast("获取失败,请刷新页面");
            }
          })
          .catch(function (err) {
          });
        this.showgoods = false;
        this.shouAddress = arr;
        this.selecAddress = false;
        var that = this;
        this.paygoods = [];
        this.insufficient = [];
        this.area = [];
        this.fare = "0.00";
        this.cardorder = [];
        this.shiticard = [];
        var token = localStorage.getItem("token");
        axios
          .post(
            BASE_URL + "/index.php?r=shop/orderspay",
            qs.stringify({
              addressid: that.shouAddress.id,
              token: token
            })
          )
          .then(function (res) {
            Indicator.close();
            if (res.data.data.err == 10006) {
              MessageBox({
                title: "提示",
                message: res.data.data.msg
              });
              return
            }
            var allgoods = res.data.data.pruduct.jdgoods;
            var dizika = res.data.data.pruduct.dzgoods;
            var shitika = res.data.data.pruduct.stgoods;
            that.fare = res.data.data.pruduct.fare;
            that.allmoney = res.data.data.pruduct.coutmoney;
            that.paymoney = Number(res.data.data.pruduct.paymoney);

            that.showgoods = true;
            if (allgoods) {
              for (var i = 0; i < allgoods.length; i++) {
                if (allgoods[i].areano == 1) {
                  if (allgoods[i].kucun == 1) {
                    that.paygoods.push(allgoods[i]);
                  } else {
                    that.insufficient.push(allgoods[i]);
                  }
                } else {
                  that.area.push(allgoods[i]);
                }
              }
            }
            if (dizika) {
              for (var j = 0; j < dizika.length; j++) {
                if (dizika[j].kucun == 0) {
                  that.insufficient.push(dizika[j]);
                } else {
                  that.cardorder.push(dizika[j]);
                }
              }
            }
            if (shitika) {
              for (var k = 0; k < shitika.length; k++) {
                if (shitika[k].kucun == 0) {
                  that.insufficient.push(shitika[k]);
                } else {
                  that.shiticard.push(shitika[k]);
                }
              }
            }
            var arealength = that.area.length + that.insufficient.length;
            if (arealength > 0) {
              MessageBox({
                title: "提示",
                message: "共" + arealength + "件商品无货，不在本订单中"
              });
            }
          })
          .catch(function (err) {
          });
      },
      makeOrder() {
        var b = this.paygoods;
        b = b.concat(this.cardorder);
        b = b.concat(this.shiticard);
        b = JSON.stringify(b);
        if (this.cardorder.length) {
          if (this.code) {
            var that = this;
            var allnumber = (this.paygoods.length +this.cardorder.length +this.shiticard.length).toFixed(2);
            if (allnumber <= 0) {
              Toast("该订单没有可下单商品");
              return;
            }
            Indicator.open()
            var token = localStorage.getItem("token");
            axios.post(
                BASE_URL + "/index.php?r=shop/Restorders",
                qs.stringify({
                  addressid: that.shouAddress.id,
                  skuIds: b,
                  money: Number(this.paymoney).toFixed(2),
                  fare: this.fare,
                  token: token,
                  phone: this.phonenum,
                  vrefy: this.code,
                  useCouponId: this.checkid.couid
                })
              )
              .then(function (res) {
                Indicator.close()
                if (res.data.data.err == "10002") {
                  window.location.href = "?#/pay/" + res.data.data.mainorderid;
                } else {
                  if (res.data.data.err == "10007") {
                    Toast(res.data.data.msg)
                  } else {
                    MessageBox({
                      title: "提示",
                      message: res.data.data.msg
                    });
                  }
                }
              })
              .catch(function (err) {
                Indicator.close()
              });
          } else {
            MessageBox({
              title: "提示",
              message: "请输入验证码"
            });
          }
        } else {
          var that = this;
          var allnumber =
            this.paygoods.length + this.cardorder.length + this.shiticard.length;
          if (allnumber <= 0) {
            Toast("该订单没有可下单商品");
            return;
          }
          var b = JSON.stringify(this.paygoods);
          var token = localStorage.getItem("token");
          Indicator.open()
          axios
            .post(
              BASE_URL + "/index.php?r=shop/Restorders",
              qs.stringify({
                addressid: that.shouAddress.id,
                skuIds: b,
                money: Number(this.paymoney).toFixed(2),
                fare: this.fare,
                token: token,
                useCouponId: this.checkid.couid
              })
            )
            .then(function (res) {
              Indicator.close()
              if (res.data.data.err == "10002") {
                window.location.href = "?#/pay/" + res.data.data.mainorderid;
              } else {
                if (res.data.data.err == "10007") {
                  Toast(res.data.data.msg)
                } else {
                  MessageBox({
                    title: "提示",
                    message: res.data.data.msg
                  });
                }
              }
            })
            .catch(function (err) {
              Indicator.close()
            });
        }
      },
      getaddress() {
        var that = this
        var token = localStorage.getItem("token");
        axios.post(
          BASE_URL + "/index.php?r=address/getByUserid",
          qs.stringify({
            token: token
          })
        )
          .then(function (res) {
            var a = JSON.parse(Base64.decode(res.data));
            if (a.code == 1000) {
              that.alladdress = a.data.data;
              if (that.useaddress == 0) {
                for (var k = 0; k < that.alladdress.length; k++) {
                  if (that.alladdress[k].isdefault == 1) {
                    that.shouAddress = that.alladdress[k]
                    break
                  } else {
                    if (that.alladdress.length - 1 == k) {
                      that.shouAddress = that.alladdress[that.alladdress.length - 1];
                    }
                  }
                }
              } else {
                that.shouAddress = that.alladdress[that.alladdress.length - 1];
              }
              if (that.shouAddress) {
                that.phonenum = that.shouAddress.consigneephone;
                that.getordergoods()
              }
            } else {
              Indicator.close()
            }
          })
          .catch(function (err) {
            Indicator.close()
          });
      },
      getordergoods() {
        var that = this;
        var token = localStorage.getItem("token");
        axios
          .post(
            BASE_URL + "/index.php?r=shop/orderspay",
            qs.stringify({
              token: token,
              addressid: this.shouAddress.id
            })
          )
          .then(function (res) {
            Indicator.close();
            if (res.data.data.err == 10006) {
              MessageBox({
                title: "提示",
                message: res.data.data.msg
              });
              return
            }
            if (res.data.data.err == 10002) {

              var allgoods = res.data.data.pruduct.jdgoods;
              var dizika = res.data.data.pruduct.dzgoods;
              var shitika = res.data.data.pruduct.stgoods;
              that.use = res.data.data.pruduct.couponList;
              that.notuse = res.data.data.pruduct.couponListNo;
              that.fare = res.data.data.pruduct.fare;
              that.allmoney = res.data.data.pruduct.coutmoney;
              that.paymoney = Number(res.data.data.pruduct.paymoney);
              that.showgoods = true;
              if (allgoods) {
                for (var i = 0; i < allgoods.length; i++) {
                  if (allgoods[i].areano == 1) {
                    if (allgoods[i].kucun == 1) {
                      that.paygoods.push(allgoods[i]);
                    } else {
                      that.insufficient.push(allgoods[i]);
                    }
                  } else {
                    that.area.push(allgoods[i]);
                  }
                }
              }
              if (dizika) {
                for (var j = 0; j < dizika.length; j++) {
                  if (dizika[j].kucun == 0) {
                    that.insufficient.push(dizika[j]);
                  } else {
                    that.cardorder.push(dizika[j]);
                  }
                }
              }
              if (shitika) {
                for (var k = 0; k < shitika.length; k++) {
                  if (shitika[k].kucun == 0) {
                    that.insufficient.push(shitika[k]);
                  } else {
                    that.shiticard.push(shitika[k]);
                  }
                }
              }

              var arealength = that.area.length + that.insufficient.length;
              if (arealength > 0) {
                MessageBox({
                  title: "提示",
                  message: "共" + arealength + "件商品无货，不在本订单中"
                });
              }
            } else {
              MessageBox({
                title: "提示",
                message: res.data.data.msg
              });
            }

          })
          .catch(function (err) {
            Indicator.close();
          });
      },
      yhq() {
        this.showhide = false
        this.csh = true
      },
      icheck(item) {
        if (this.checkid == item) {
          this.checkid = ''

        } else {
          this.checkid = item
        }

      },
      determines() {
        if (this.checkid) {
          this.csh = false
          this.showhide = true
          this.quany = true
        } else {
          this.csh = false
          this.showhide = true
          this.quany = false
        }
      },
      returns() {
        this.csh = false
        this.showhide = true
        this.quany = false
        this.checkid = ''
      }
    },
    mounted() {
      this.isgologin()
      Indicator.open();
      var that = this;
      document.title = "订单提交";
      var token = localStorage.getItem("token");
      this.getaddress()

      //初始化 可用优惠券
//	var token = localStorage.getItem("token")
//	var that =this
//	axios.post(
//				BASE_URL+'/index.php?r=Couponcate/index',
//				qs.stringify({
//		  			token:token
//		  		})
//				)
//				.then(function(res){
//		  			var a=JSON.parse(Base64.decode(res.data))
//					if(a.data.err==10002){
//						that.notused=a.data.result
//					}
//		  		}).catch(function(err){
//
//		        });
      //初始化 可用优惠券
    },
    updated() {
    },
    activated() {
    },
    components: {
      "selec-address": SelecAddress
    }
  };
</script>

<style scoped lang="scss">
  #submit-order {
    background: #f5f5f5;
    .default-address {
      display: flex;
      justify-content: space-between;
      padding: 0 0.75rem 0.2rem 0.75rem;

      background: #fff;
      .noaddress {
        line-height: 3.9rem;
        color: #333;
        font-size: 0.8rem;
      }
      p {
        color: #a3a3a3;
        font-size: 0.65rem;
      }
      .person {
        padding-top: 1.25rem;
        color: #333;
        padding-left: 1.3rem;
        line-height: 1.3rem;
        .phone-num {
          padding-left: 1.75rem;
        }
      }
      .add {
        line-height: 3.9rem;
        color: #eee;
      }
    }
    .submit-list {
      line-height: 2.25rem;
      background: url(../../assets/images/addre.jpg) no-repeat #f5f5f5;
      background-position: top left;
      font-size: 0.75rem;
      padding-left: 0.75rem;
      background-repeat: repeat-x;
      background-size: 5.1rem;
    }
    .submit-goods {
      background: #fff;
      padding: 0.75rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.65rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .goods-img {
        position: relative;
        width: 3rem;
        display: flex;
        height: 100%;
        align-items: center;
        img {
          width: 100%;
        }
        .area {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #000000;
          opacity: 0.6;
        }
        p {
          position: absolute;
          width: 100%;
          height: 100%;
          color: #fff;
          line-height: 3rem;
          text-align: center;
        }
      }
      .goods-name {
        flex: 1;
        padding-left: 0.5rem;
        p {
          width: 12.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .name {
          color: #333333;
        }
        .style {
          color: #999;
          font-size: 0.6rem;
        }
        h4 {
          padding-top: 0.58rem;
          color: #ff3737;
          display: flex;
          justify-content: space-between;
          .number {
            color: #999;
          }
        }
        h5 {
          color: #4a4a4a;
          display: flex;
          justify-content: space-left;
          span {
            font-size: 0.5rem;
            color: #fff;
            border: 1px solid #29218e;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            padding: 0 4px;
            margin-left: 5px;
            background: #29218e;
          }
        }
      }
    }
    /*		电子卡订单*/
    .card-order {
      margin: 0 0px 0.75rem 0;
      padding: 0.5rem 0.75rem 0 0.75rem;
      background: #fff;
      p {
        font-size: 0.65rem;
        line-height: 1.5rem;
        padding-bottom: 0.4rem;
        color: #666;
        display: flex;
        justify-content: flex-start;
        span {
          color: #ff3737;
          font-size: 0.65rem;
          padding-left: 0.5rem;
        }
        input {
          display: flex;
          flex: 1;
          border: none;
          border-bottom: 1px solid #eee;
          padding-left: 0.5rem;
          font-size: 0.65rem;
        }
        button {
          height: 1.4rem;
          width: 5rem;
          text-align: center;
          background: #fff;
          border: 1px solid #ff8c8c;
          color: #f00;
          vertical-align: middle;
          font-size: 0.65rem;
        }
      }
    }

    .qudou {
      background: #fff;
      border-bottom: 1px solid #eee;
      padding: 0 0.75rem;
      .usequdou {
        color: #666;
        font-size: 0.65rem;
        line-height: 1.5rem;
        span {
          color: #000;
          font-weight: bold;
        }
        div {
          padding-bottom: 0.2rem;
          input {
            width: 4.95rem;
            height: 1.3rem;
            background: #eee;
            border: none;
            padding: 0 0.75rem;
            color: #333;
          }
        }
      }
    }
    .myqudou,
    .youhuiquan {
      background: #fff;
      display: flex;
      justify-content: space-between;
      line-height: 2.25rem;
      color: #333;
      font-size: 0.75rem;
      i {
        font-size: 0.65rem;
        color: #ff3737;
        font-weight: bold;
      }
      b {
        color: #eee;
      }

    }

    .myqudou span i {
      color: #ff3737;
      b {
        color: #ff3737;
      }
    }

    .youhuiquan {
      padding: 0 0.75rem;
    }
    .total {
      background: #fff;
      margin-top: 0.75rem;
      padding: 0.75rem 0.75rem;
      color: #333;
      font-size: 0.65rem;
      line-height: 1.5rem;
      div {
        display: flex;
        justify-content: space-between;
        span {
          color: #ff3737;
        }
      }
    }

  }

  .order-tab {
    position: fixed;
    height: 2.45rem;
    border-top: 1px solid #eee;
    background: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: flex-end;
      font-size: 0.85rem;
      line-height: 2.45rem;
      color: #333;
      flex: 1;
      padding-right: 0.75rem;
      p {
        color: #ff0000;
      }
    }
    a {
      display: block;
      width: 6.025rem;
      font-size: 0.85rem;
      text-align: center;
      background: #ff3737;
      color: #fff;
      line-height: 2.45rem;
    }
  }

  .payaddress {
    display: flex;
    justify-content: flex-start;
  }

  .bottom {
    width: 100%;
    height: 2.5rem;
    background: #f5f5f5;
  }

  .mint-msgbox-btns {
    .mint-msgbox-btn.mint-msgbox-confirm {
      color: #ff3737;
    }
  }

  /*优惠券*/
  .coupon {
    .mint-navbar {
      height: 2.25rem;
      .mint-tab-item {
        .mint-tab-item-label {
          font-size: 0.65rem;
        }
      }
      .is-selected {
        color: #FF3737;
        margin-bottom: 0px;
        border-bottom: 1px solid #FF3737;
      }
    }
    .mint-tab-container-wrap {
      .mint-tab-container-item {
        background: #F5F5F5;
        ul {
          li {
            padding: 0.75rem;
            padding-bottom: 0;
            a {
              display: block;
              width: 100%;
              height: 4.4rem;
              margin-bottom: 0.75rem;
              /*img{
                              width: 100%;
                          }*/
              .box {
                display: block;
                width: 5.5rem;
                height: 4.4rem;
                float: left;
                .font1 {
                  font-size: 1.85rem;
                  color: #fff;
                  margin: 0.75rem 0 0 1.37rem;
                  display: inline-block;

                }
                .font2 {
                  font-size: 0.75rem;
                  color: #fff;
                  margin-left: -0.25rem;
                }
                .font3 {
                  font-size: 0.6rem;
                  color: #fff;
                  /*margin-left:0.75rem;*/
                  display: block;
                  text-align: center;
                }
              }
              .boxs {
                display: block;
                float: left;
                padding-top: 0.5rem;
                .box1 {
                  width: 9.5rem;
                  margin-bottom: 0.9rem;
                  display: block;
                  display: flex;
                  align-items: center;
                  justify-content: start;
                  .ibox1 {
                    float: left;
                    padding: 0.17rem 0.35rem;
                    margin: 0 0 0 0.7rem;
                    background-color: #ff3737;
                    font-size: 0.55rem;
                    line-height: 0.82rem;
                    display: inline-block;
                    color: #fff;

                  }
                  .ibox2 {
                    float: left;
                    margin-left: 0.3rem;
                    /*height:0.82rem;*/
                    font-size: 0.55rem;
                    color: #333333;
                    width: 6.5rem;
                  }
                }
                .box1:after {
                  content: "";
                  display: block;
                  clear: both;
                  height: 0;
                  overflow: hidden;
                  visibility: hidden;
                }
                .box2 {
                  display: block;
                  margin-left: 0.7rem;
                  .ibox1 {
                    font-size: 0.6rem;
                    color: #999999;
                    span {
                      color: #ff3737;
                    }
                  }
                }
              }
              .ir {
                float: right;
                display: block;
                margin-top: 1.9rem;
                margin-right: 1rem;
                width: 0.9rem;
                height: 0.9rem;
                border: 1px solid black;
                border-radius: 50%;
              }
              .ic {

                background: url(../../assets/images/ic.png) no-repeat #f5f5f5;
                display: block;
                width: 0.9rem;
                height: 0.9rem;
                border: none;
                background-size: 0.9rem 0.9rem;
              }

            }
            a:after {
              content: "";
              display: block;
              clear: both;
              height: 0;
              overflow: hidden;
              visibility: hidden;
            }
            a.a1 {
              background-image: url(../../assets/images/youhuiquan0.png);
              background-repeat: no-repeat;
              background-size: cover;
            }
            a.a2 {
              background-image: url(../../assets/images/mustnot.png);
              background-repeat: no-repeat;
              background-size: cover;
              .box {
                display: block;
                width: 5.5rem;
                height: 4.4rem;
                float: left;
                .font1 {
                  font-size: 1.85rem;
                  color: #fff;
                  margin: 0.75rem 0 0 1.37rem;
                  display: inline-block;

                }
                .font2 {
                  font-size: 0.75rem;
                  color: #fff;
                  margin-left: -0.25rem;
                }
                .font3 {
                  font-size: 0.6rem;
                  color: #fff;
                  /*margin-left:0.75rem;*/
                  display: block;
                  text-align: center;
                }
              }
              .boxs {
                display: block;
                float: left;
                padding-top: 0.5rem;
                .box1 {
                  margin-bottom: 0.9rem;
                  display: block;
                  display: flex;
                  align-items: center;
                  justify-content: start;
                  .ibox1 {
                    padding: 0.17rem 0.35rem;
                    margin: 0 0 0 0.7rem;
                    background-color: #999999;
                    font-size: 0.55rem;
                    line-height: 0.82rem;
                    display: inline-block;
                    color: #fff;
                  }
                  .ibox2 {
                    height: 0.82rem;
                    font-size: 0.55rem;
                    color: #999999;
                  }
                }
                .box2 {
                  display: block;
                  margin-left: 0.7rem;
                  .ibox1 {
                    font-size: 0.6rem;
                    color: #999999;
                    span {
                      color: #999999;
                    }
                  }
                }
              }

            }

          }
        }
      }

    }
    .dern {
      position: fixed;
      height: 2.45rem;
      border-top: 1px solid #eee;
      background: #fff;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .determine {
        width: 50%;
        border: none;
        color: #fff;
        font-size: 0.8rem;
        background: #FF3737;
        font-weight: bold;
      }
      .return {
        width: 50%;
        border: none;
        color: #333;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }

  /*优惠券*/
</style>
