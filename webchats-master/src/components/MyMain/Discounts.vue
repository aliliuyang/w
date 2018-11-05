<template>
  <div class="discounts">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未使用</mt-tab-item>
      <mt-tab-item id="2" @click.native="already(2)">已使用</mt-tab-item>
      <mt-tab-item id="3" @click.native="already(3)">已过期</mt-tab-item>
      <!--<mt-tab-item id="4" @click.native="already(4)">兑换优惠券</mt-tab-item>-->
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <p class="exchange">
          <input type="" placeholder="请输入兑换码 " v-model="couCode">
          <button @click="exchanges">兑换</button>
        </p>
        <ul>
          <li>
            <a class="a1" v-for="item,index in use">
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
                  <i class="ibox1">有效期截止<span>{{showtime(item.enddate)}}</span></i>
                </b>
              </div>
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
              </div>
            </a>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul>
          <li>
            <a class="a3" v-for="item,index in over">
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
              </div>
            </a>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {Navbar, TabItem} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import axios from 'axios';
  import qs from "qs";

  const Discounts = {
    name: 'Discounts',
    data() {
      return {
        selected: '1',
        use: [],
        notuse: [],
        over: [],
        couCode: '',
        status: ''

      }
    },
    methods: {
      showtime( time){
        return time.substr(0,10)
      },
      //兑换
      exchanges() {
        var token = localStorage.getItem("token")
        var that = this
        if (!this.couCode) {
          MessageBox({
            title: "提示",
            message: "请填写兑换码"
          });
        } else {
          axios.post(
            BASE_URL + '/index.php?r=Couponcate/CouBind',
            qs.stringify({
              token: token,
              couCode: this.couCode,
            })
          )
            .then(function (res) {
              var a = JSON.parse(Base64.decode(res.data))
              if (a.data.err == 10000) {
                MessageBox({
                  title: "提示",
                  message: a.data.msg
                });
                that.init()
              } else {
                MessageBox({
                  title: "提示",
                  message: a.data.msg
                });
              }
            }).catch(function (err) {

          });

        }
      },

      init() {
        var that = this
        var token = localStorage.getItem("token")
        axios.post(
          BASE_URL + '/index.php?r=Couponcate/index',
          qs.stringify({
            token: token,
            status: this.status
          })
        )
          .then(function (res) {
            var a = JSON.parse(Base64.decode(res.data))
            if (a.data.err == 10002) {
              that.use = a.data.result
            }
          }).catch(function (err) {

        });
      },
      //切换状态
      already(status) {
        var token = localStorage.getItem("token")
        var that = this
        this.status = status
        this.init()
      }
    },
    mounted() {
      document.title = '优惠券'
      var token = localStorage.getItem("token")
      if (!token) {
        MessageBox.confirm('您还未登录，现在去登录?').then(action => {
            window.location.href = "#/login";
          },
          action => {
            window.location.href = "#/main";
          })
      }
      this.init()
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
  export default Discounts
</script>

<style scoped lang="scss">
  .discounts {
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
        p.exchange {
          padding: 0.75rem;
          padding-bottom: 0;
          margin: 0 auto;
          input {
            width: 77%;
            height: 2.25rem;
            line-height: 2.25rem;
            border-radius: 0.2rem;
            border: none;
            padding-left: 3%;
            font-size: 0.8rem;

          }
          button {
            width: 21%;
            height: 2.25rem;
            line-height: 2.25rem;
            color: #fff;
            background-color: #06c1ae;
            border-radius: 0.2rem;
            border: none;
          }
        }
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
                  margin-left: 0.75rem;
                  display: block;
                }
              }
              .boxs {
                display: block;
                float: left;
                padding-top: 0.5rem;

                .box1 {
                  margin-bottom: 0.9rem;
                  display: block;
                  .ibox1 {
                    padding: 0.17rem 0.35rem;
                    margin: 0 0 0 0.37rem;
                    background-color: #ff3737;
                    font-size: 0.55rem;
                    line-height: 0.82rem;
                    display: block;
                    color: #fff;
                    float: left;
                    height: auto;
                  }
                  .ibox2 {
                    /*height:0.82rem;*/
                    font-size: 0.55rem;
                    color: #333333;
                    display: block;
                    float: left;
                    width: 8rem;
                    word-break: normal;
                    margin-left: 0.5rem;
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
                  margin-left: 0.37rem;
                  .ibox1 {
                    font-size: 0.6rem;
                    color: #999999;
                    span {
                      color: #ff3737;
                    }
                  }
                }
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
              background-image: url(../../assets/images/youhuiquan1.png);
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
                  margin-left: 0.75rem;
                  display: block;
                }
              }
              .boxs {
                display: block;
                float: left;
                padding-top: 0.5rem;
                .box1 {
                  margin-bottom: 0.9rem;
                  display: block;
                  .ibox1 {
                    padding: 0.17rem 0.35rem;
                    margin: 0 0 0 0.37rem;
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
                  margin-left: 0.37rem;
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
            a.a3 {
              background-image: url(../../assets/images/youhuiquan2.png);
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
                  margin-left: 0.75rem;
                  display: block;
                }
              }
              .boxs {
                display: block;
                float: left;
                padding-top: 0.5rem;
                .box1 {
                  margin-bottom: 0.9rem;
                  display: block;
                  .ibox1 {
                    padding: 0.17rem 0.35rem;
                    margin: 0 0 0 0.37rem;
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
                  margin-left: 0.37rem;
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
        /*.exchange{

                  padding-top: 1.25rem;
                  padding-bottom: 0;

                  p{
                      width:17.25rem;
                      padding:0.87rem 0rem 0.87rem 0rem;
                      background-color: #fff;
                      margin:0 auto;
                      span{
                          font-size: 0.8rem;
                          color: #333;
                          font-weight: bold;
                          margin-left: 1rem;
                      }
                      input{
                          font-size: 0.8rem;
                          color: #333;
                          width:6.25rem;
                          margin-left: 1.25rem
                      }
                  }
              }*/
      }

    }
  }


</style>
