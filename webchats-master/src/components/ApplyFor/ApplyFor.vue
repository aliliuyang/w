<template>
	<div class="apply-for">
		<div class="order" v-show="!showaddress&&!succeed">
			<div class="after-goods">
				<p class="after-num">订单编号：<span>{{order.childorderid}}</span>&nbsp;&nbsp;&nbsp;下单时间：<span>{{order.addtime}}</span></p>
				<div class="goods" v-for="item in goods">
					<div class="goods-img">
						<img :src="item.imgurl" alt="" />
					</div>
					<div class="goods-tlt">
						<p class="name">{{item.goodstitle}}</p>
						<p class="number"><span class="after-number">数量：{{item.count}}</span><span class="after-price">价格：<b>¥&nbsp<i>{{item.money}}</i></b></span></p>
					</div>
				</div>
			</div>
			<div class="after-type">
				<p>服务类型</p>
				<div class="type">
					<a :class="aftertype==10?'aftertype':''" @click="changetype(10)">退货</a>
					<a :class="aftertype==20?'aftertype':''" @click="changetype(20)">换货</a>
					<a :class="aftertype==30?'aftertype':''" @click="changetype(30)">维修</a>
				</div>
			</div>
			<!--<div class="return-gift">-->
			<!--<p class="after-num">返还赠品</p>-->
			<!--<div class="goods">-->
			<!--<div class="goods-img">-->

			<!--<img src="../../assets/images/good_03.jpg" alt="" />-->
			<!--</div>-->
			<!--<div class="goods-tlt">-->
			<!--<p class="name">普莱斯2016新款眼镜框大时代如果是的法规客户大时代</p>-->
			<!--<p class="number"><span class="after-number">数量：1</span></p>-->
			<!--</div>-->
			<!--</div>-->
			<!--</div>-->
			<div class="question">
				<p>问题描述</p>
				<textarea placeholder="请您在此描述问题" v-model="text"></textarea>
				<div class="question-img">
					<div class="imglist" v-for="(imgitem,itrem) in picPath">
						<img :src="imgitem">
						<b class="iconfont icon-guanbi" @click="img(itrem)"></b>
					</div>
				</div>
				<form id="amig" enctype="multipart/form-data">
					<div class="up"><input @change="getImgURL($event)" ref="inputer1" id="upimg" name="questionPic" type="file" accept="image/*" /> <label for="upimg"><a></a></label></div>
				</form>
			</div>
			<div class="after-way">
				<p>退货方式</p>
				<div class="way">
					<a :class="afterway==4?'afterway':''" @click="changeway(4)">上门取件</a>
					<a :class="afterway==7?'afterway':''" @click="changeway(7)">送货至自提点</a>
					<a :class="afterway==40?'afterway':''" @click="changeway(40)">快递至京东</a>
				</div>
				<div class="way-hint">
					<!--<div v-if="afterway==1" class="shangmen">-->
					<!--<p>京东将在1-3天内上门取回商品</p>-->
					<!--<p>取件时间：2017-08-23（星期三）15：00-19：00 <b @click="show" class="iconfont icon-fenxiang"></b></p>-->
					<!--</div>-->
					<div v-if="afterway==2" class="songzhi">
						<p>将商品送至任意一自提点。</p>
					</div>
					<div v-if="afterway==3" class="kuaidi">
						<p>商品寄回地址将在审核通过后一短信形式告知，或在申请记录中查询。京东不钱快递附加费。</p>
					</div>
				</div>
			</div>
			<div class="after-user">
				<p class="name"><span>联系人：</span><input type="text" v-model="personName" /></p>
				<p class="phone"><span>联系电话：</span><input type="tel" v-model="personPhone" /></p>
				<!--上门取件地址-->
				<div v-if="afterway==4" class="after-address">
					<h6>取件地址</h6>
					<p><b class="iconfont icon-dizhi"></b><span><i class="addre" v-text="showmyaddress"></i></span><i @click="isshowaddress('pic')" class="iconfont icon-jiantou-copy"></i></p>
				</div>

				<!--退货地址-->
				<!--<div v-if="afterway!=1 && aftertype==1" class="after-address">
          <h6>收货地址（地址是京东回寄给您的地址）</h6>
          <p><b class="iconfont icon-dizhi"></b><span>北京市昌平区天通苑东三区北门进去右手边第一个路口旁边的电线杆大吼三声</span><i class="iconfont icon-jiantou-copy"></i></p>
        </div>-->
				<!--退换收货地址-->
				<div v-show="aftertype!=10" class="after-address">
					<h6 class="apply-address" v-if="afterway==4"><span>收货地址</span><div>和取件地址保持一致<mt-switch @click='isalike' v-model='alike'></mt-switch></div></h6>
					<h6 v-else>收货地址（地址是京东回寄给您的地址）</h6>
					<p v-show="!(alike&&afterway==4)"><b class="iconfont icon-dizhi"></b><span><i class="addre" >{{showretu}}</i></span><i @click="isshowaddress('ret')" class="iconfont icon-jiantou-copy"></i></p>
				</div>
      </div>
			<div class="btn">
				<a @click="Mysubmit">提交</a>
			</div>

		</div>
		<!--取件时间-->
		<!--<call-time v-if="showtime" :show='show'></call-time>
		<div v-if="showtime" class="zhezhao"></div>-->
		<applyfor-address v-if="showaddress" :getAddress=getAddress></applyfor-address>
		<succeed-apply v-if="succeed" :aftertype=aftertype :applyforId=applyforId></succeed-apply>
	</div>
</template>

<script>
import { Switch } from "mint-ui";
import CallTime from "./CallTime";
import SucceedApply from "./SucceedApply"; //售后提交成功提示
import ApplyforAddress from "./ApplyforAddress"; //修改售后地址
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
const ApplyFor = {
  name: "ApplyFor",
  data() {
    return {
      aftertype: 10,
      afterway: 4,
      alike: true,
      showaddress: false,
      succeed: false,
      childorderid: "",
      oneid: [],
      alltype: "",
      order: [],
      goods: [],
      text: "",
      personName: "",
      personPhone: "",
      Pickwareaddress: [],
      PickwareDetails: "",
      returnAddress: [],
      returnDetails: "",
      goodsId: [],
      addtype: "",
      picPath: [],
      applyforId: "",
      baseimg:''
    };
  },
  computed:{
    showretu(){
      var a=''
      if(this.returnAddress.length){
        for(var i=0;i<this.returnAddress.length;i++){
          a +=this.returnAddress[i].name
        }
        a+=this.returnDetails
        return a
      }
    },
    showmyaddress(){
       var a=''
      if(this.Pickwareaddress.length){
        for(var i=0;i<this.Pickwareaddress.length;i++){
          a +=this.Pickwareaddress[i].name
        }
        a+=this.PickwareDetails
        return a
      }
    }
  },
  methods: {
    isalike() {
      if (this.alike) {
        this.returnAddress = this.Pickwareaddress;
        this.returnDetails = this.PickwareDetails;
      }
    },
    changetype(type) {
      this.aftertype = type;
    },
    changeway(way) {
      this.afterway = way;
    },
    isshowaddress(type) {
      this.addtype = type;
      this.showaddress = !this.showaddress;
    },
    getAddress(arr, str) {
      if (this.addtype == "pic") {
        this.Pickwareaddress = arr;
        this.PickwareDetails = str;
      }
      if (this.addtype == "ret") {
        this.returnAddress = arr;
        this.returnDetails = str;
      }
      this.showaddress = false;
    },
    getImgURL(e) {
      var that = this;
      if (this.picPath.length > 4) {
        Toast("最多上传5张图片");
        return false;
      }
      //var file = new FormData(document.getElementById("amig"));
      var data  = new FormData();
        // console.log( window.URL.createObjectURL(this.$refs.inputer1.files[0]))
      Indicator.open()
      // //base64上传
      var file=this.$refs.inputer1.files[0]
      var reader = new FileReader();
      reader.onload = function () {
        var result = this.result;    //data:base64
        that.baseimg=result
        axios.post(BASE_URL+'/index.php?r=jdproduct/baseUpimg',qs.stringify({
          imgInfo:that.baseimg
        })).then(function(res){
          Indicator.close()
          if (res.data.flag == 1) {
              that.picPath.push(Base64.decode(res.data.data));
                Toast("上传成功");
          } else {
            Toast("上传失败，请重新选择");
          }
        }).catch(function(err){
          Indicator.close()
        });
      };
      reader.readAsDataURL(file);
      //
      //     var reader = new FileReader();
      //     reader.onload = function(e) {
      //       // reader.readAsBinaryString(that.$refs.inputer1.files[0])
      //     that.baseimg.push(e.target.result)
      //         console.log(e.target.result)
      //     };
      //     var  v=reader.readAsBinaryString(that.$refs.inputer1.files[0]);
      //    console.log(v)
      // data .append('questionPic', this.$refs.inputer1.files[0]);
      // axios.post(BASE_URL + "/index.php?r=jdproduct/Upimg",data,{
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })
      //   .then(function(res) {
      //     Indicator.close()
      //     if (res.data.flag == 1) {
      //         that.picPath.push(Base64.decode(res.data.data));
      //           Toast("上传成功");
      //           // alert(that.picPath[0])
      //           // console.log(that.baseimg)
      //     } else {
      //       Toast("请再次选择");
      //     }
      //   })
      //   .catch(function(err) {});
    },
    img(index) {
      this.picPath.splice(index, 1);
    },
    Mysubmit() {
      var allskuNum = 0;
      var token = localStorage.getItem("token");
      var that =this
      if (!this.personName) {
        Toast("请填写联系人");
        return false;
      }
      if (!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(this.personPhone))) {
        Toast("请填写正确联系人电话");
        return false;
      }
      if (!this.text) {
        Toast("请填写问题描述");
        return false;
      }
      for (var i = 0; i < this.goods.length; i++) {
        allskuNum += Number(this.goods[i].count);
      }
      var pickwareProvince = "";
      var pickwareCity = "";
      var pickwareCounty = "";
      var pickwareVillage = "";
      var returnwareProvince = "";
      var returnwareCity = "";
      var returnwareCounty = "";
      var returnwareVillage = "";
      if (this.afterway == 4) {
        if (!this.Pickwareaddress.length && !this.pickwareAddress) {
          Toast("请填写取件地址");
          return false;
        }
        for (var i = 0; i < this.Pickwareaddress.length; i++) {
          pickwareProvince = this.Pickwareaddress[0].aid;
          pickwareCity = this.Pickwareaddress[1].aid;
          pickwareCounty = this.Pickwareaddress[2].aid;
          if (i == 3) {
            pickwareVillage = this.Pickwareaddress[3].aid;
          }
        }
        Indicator.open()
        if (this.aftertype == 10) {
          axios
            .post(
              BASE_URL + "/index.php?r=jdproduct/doJdProreturn",
              qs.stringify({
                customerExpect: this.aftertype,
                pickwareType: this.afterway,
                questionDesc: this.text,
                skuNum: allskuNum,
                questionPic: this.picPath,
                pickwareProvince: pickwareProvince,
                pickwareCity: pickwareCity,
                pickwareCounty: pickwareCounty,
                pickwareVillage: pickwareVillage,
                pickwareAddress: this.PickwareDetails,
                customerContactName: this.personName,
                customerTel: this.personPhone,
                childorderid: this.childorderid,
                alltype: this.alltype,
                id: this.oneid,
                token: token
              })
            )
            .then(function(res) {
              Indicator.close()
              if (res.data.flag == 1) {
                that.succeed = true;
              } else {
                Toast(JSON.parse(Base64.decode(res.data.data)));
              }
            })
            .catch(function(err) {
              Indicator.close()
            });
        } else {
          if (this.alike) {
            this.returnAddress = this.Pickwareaddress;
            this.returnDetails = this.PickwareDetails;
          }
          if (!this.returnAddress.length && !this.returnDetails) {
            Toast("请填写收货地址")
            return false;
          }
          for (var i = 0; i < this.returnAddress.length; i++) {
            returnwareProvince = this.returnAddress[0].aid;
            returnwareCity = this.returnAddress[1].aid;
            returnwareCounty = this.returnAddress[2].aid;
            if (i == 3) {
              returnwareVillage = this.returnAddress[3];
            }
          }
          Indicator.open()
          axios
            .post(
              BASE_URL + "/index.php?r=jdproduct/doJdProreturn",
              qs.stringify({
                customerExpect: this.aftertype,
                pickwareType: this.afterway,
                questionDesc: this.text,
                skuNum: allskuNum,
                questionPic: this.picPath,
                customerContactName: this.personName,
                customerTel: this.personPhone,
                childorderid: this.childorderid,
                alltype: this.alltype,
                id: this.oneid,
                questionPic: this.picPath,
                pickwareProvince: pickwareProvince,
                pickwareCity: pickwareCity,
                pickwareCounty: pickwareCounty,
                pickwareVillage: pickwareVillage,
                pickwareAddress: this.PickwareDetails,
                returnwareProvince: returnwareProvince,
                returnwareCity: returnwareCity,
                returnwareCounty: returnwareCounty,
                returnwareVillage: returnwareVillage,
                returnwareAddress: this.returnDetails,
                token: token
              })
            )
            .then(function(res) {
              Indicator.close()
              if (res.data.flag == 1) {
                that.succeed = true;
              } else {
                Toast(JSON.parse(Base64.decode(res.data.data)));
              }
            })
            .catch(function(err) {
              Indicator.close()
            });
        }
      } else {
        Indicator.open()
        if (this.aftertype == 10) {
          axios
            .post(
              BASE_URL + "/index.php?r=jdproduct/doJdProreturn",
              qs.stringify({
                customerExpect: this.aftertype,
                pickwareType: this.afterway,
                questionDesc: this.text,
                skuNum: allskuNum,
                questionPic: this.picPath,
                customerContactName: this.personName,
                customerTel: this.personPhone,
                childorderid: this.childorderid,
                alltype: this.alltype,
                id: this.oneid,
                token: token
              })
            )
            .then(function(res) {
              Indicator.close()
              if (res.data.flag == 1) {
                that.succeed = true;
              } else {
                Toast(JSON.parse(Base64.decode(res.data.data)));
              }
            })
            .catch(function(err) {
            });
        } else {
          if (!this.returnAddress.length && !this.returnDetails) {
            Toast("请填写收货地址");
            return false;
          }
          if (this.alike) {
            this.returnAddress = this.Pickwareaddress;
            this.returnDetails = this.PickwareDetails;
          }
          for (var i = 0; i < this.returnAddress.length; i++) {
            returnwareProvince = this.returnAddress[0].aid;
            returnwareCity = this.returnAddress[1].aid;
            returnwareCounty = this.returnAddress[2].aid;
            if (i == 3) {
              returnwareVillage = this.returnAddress[3];
            }
          }
          Indicator.open()
          axios
            .post(
              BASE_URL + "/index.php?r=jdproduct/doJdProreturn",
              qs.stringify({
                customerExpect: this.aftertype,
                pickwareType: this.afterway,
                questionDesc: this.text,
                skuNum: allskuNum,
                returnwareProvince: returnwareProvince,
                returnwareCity: returnwareCity,
                returnwareCounty: returnwareCounty,
                returnwareVillage: returnwareVillage,
                returnwareAddress: this.returnDetails,
                customerContactName: this.personName,
                customerTel: this.personPhone,
                childorderid: this.childorderid,
                alltype: this.alltype,
                id: this.oneid,
                token: token
              })
            )
            .then(function(res) {
              Indicator.close()
              if (res.data.flag == 1) {
                that.succeed = true;
              } else {
                Toast(JSON.parse(Base64.decode(res.data.data)));
              }
            })
            .catch(function(err) {

            });
        }
      }
    }
  },
  mounted() {
    var that = this;
    this.isgologin()
    Indicator.open()
    document.title = "售后申请";
    this.childorderid = this.$route.params.childorderid;
    this.alltype = this.$route.params.alltype;
    var goodsid = this.$route.params.oneid;
    var token = localStorage.getItem("token");
    if (this.alltype == "1") {
      this.oneid = [];
    } else {
      this.oneid.push(goodsid);
    }
    axios
      .post(
        BASE_URL + "/index.php?r=jdproduct/Proreturn",
        qs.stringify({
          childorderid: this.childorderid,
          id: this.oneid.toString(),
          alltype: this.alltype,
          token: token
        })
      )
      .then(function(res) {
        Indicator.close()
        var a = Base64.decode(res.data.data);
        a = JSON.parse(a);
        that.order = a.order;
        that.goods = a.goods;
      })
      .catch(function(err) {});
  },
  updated() {},
  activated() {},
  components: {
    //			'call-time':CallTime,
    "succeed-apply": SucceedApply,
    "applyfor-address": ApplyforAddress
  }
};
export default ApplyFor;
</script>
<style lang="scss" >
.apply-for {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .order {
    background: #f5f5f5;
  }
  .after-goods {
    margin-top: 0.5rem;
    background: #fff;
    .after-num {
      padding: 0 0.75rem;
      font-size: 0.5rem;
      line-height: 1.75rem;
      border-bottom: 1px solid #f5f5f5;
      color: #666;
    }
    .goods {
      padding: 0.5rem 0.75rem;
      display: flex;
      justify-content: space-between;
      .goods-img {
        width: 3rem;
        height: 3rem;
        img {
          width: 100%;
        }
      }
      .goods-tlt {
        display: flex;
        flex-direction: column;
        padding-left: 0.5rem;
        flex: 1;
        .name {
          width: 12.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.5rem;
          color: #333;
        }
        .number {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: space-between;
          .after-number {
            font-size: 0.55rem;
            position: absolute;
            bottom: 0rem;
            padding: 0px;
            margin: 0px;
            color: #666;
          }
          .after-price {
            position: absolute;
            bottom: 0rem;
            right: 0.75rem;
            color: #666;
            background: #fff;
            font-size: 0.55rem;
            b {
              color: #ff3737;
            }
          }
        }
      }
    }
  }
  .after-type {
    margin-top: 0.5rem;
    background: #fff;
    padding: 0.75rem 0.75rem;
    p {
      color: #333;
      font-size: 0.65rem;
    }
    .type {
      padding-top: 0.5rem;
      a {
        color: #333;
        font-size: 0.65rem;
        display: inline-block;
        border: 0.025rem solid #b5b5b5;
        padding: 0 1.4rem;
        line-height: 1.45rem;
        margin-right: 0.75rem;
      }
      .aftertype {
        border-color: #ff3737;
        color: #ff3737;
      }
    }
  }
  .return-gift {
    margin-top: 0.5rem;
    background: #fff;
    .after-num {
      padding: 0 0.75rem;
      font-size: 0.5rem;
      line-height: 1.75rem;
      color: #333;
      letter-spacing: 1px;
    }
    .goods {
      padding: 0.5rem 0.75rem;
      display: flex;
      justify-content: space-between;
      .goods-img {
        width: 3rem;
        height: 3rem;
        img {
          width: 100%;
        }
      }
      .goods-tlt {
        display: flex;
        flex-direction: column;
        padding-left: 0.5rem;
        flex: 1;
        .name {
          width: 12.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.5rem;
          color: #333;
        }
        .number {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: space-between;
          .after-number {
            font-size: 0.55rem;
            position: absolute;
            bottom: 0rem;
            padding: 0px;
            margin: 0px;
            color: #666;
          }
          .after-price {
            position: absolute;
            bottom: 0rem;
            right: 0.75rem;
            color: #666;
            background: #fff;
            font-size: 0.55rem;
            b {
              color: #ff3737;
            }
          }
        }
      }
    }
  }
  /*问题描述*/
  .question {
    margin-top: 0.5rem;
    padding: 0 0.75rem;
    background: #fff;
    p {
      color: #333;
      font-size: 0.65rem;
      line-height: 1.75rem;
    }
    textarea {
      width: 100%;
      height: 5.5rem;
      border: none;
      background: #f5f5f5;
      font-size: 0.6rem;
      outline: none;
      padding: 0.25rem;
      box-sizing: border-box;
    }
    .question-img {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      .imglist {
        position: relative;
        b {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 0.25rem;
          color: #ff3737;
        }
      }
      img {
        margin-top: 0.5rem;
        display: flex;
        width: 2.5rem;
        margin-right: 0.5rem;
      }
    }
    .up {
      padding: 0.5rem 0;
      position: relative;
      a {
        display: block;
        height: 1.2rem;
        width: 1.2rem;
        background: url(../../assets/images/xiangji.png) no-repeat center;
        background-size: 100%;
      }
      #upimg {
        position: absolute;
        opacity: 1;
        border: none;
        left: -9999px;
      }
      lable {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
      }
    }
  }
  /*退货方式*/
  .after-way {
    margin-top: 0.5rem;
    background: #fff;
    padding: 0.75rem 0.75rem;
    p {
      color: #333;
      font-size: 0.65rem;
    }
    .way {
      padding-top: 0.5rem;
      a {
        color: #333;
        font-size: 0.65rem;
        display: inline-block;
        border: 0.025rem solid #b5b5b5;
        padding: 0 0.5rem;
        line-height: 1.45rem;
        margin-right: 0.75rem;
      }
      .afterway {
        border-color: #ff3737;
        color: #ff3737;
      }
    }
    .way-hint {
      padding-top: 0.75rem;
      p {
        color: #b5b5b5;
        font-size: 0.5rem;
      }
    }
  }
  .after-user {
    background: #fff;
    margin-top: 0.5rem;
    .name,
    .phone {
      padding: 0 0.75rem;
      line-height: 2.25rem;
      font-size: 0.55rem;
      border-bottom: 1px solid #f5f5f5;
      span {
        display: inline-block;
        color: #b5b5b5;
        width: 3rem;
      }
      input {
        color: #333;
        border: none;
      }
    }
    .after-address {
      padding: 0.5rem 0.75rem;
      .apply-address {
        display: flex;
        justify-content: space-between;
        div {
          font-weight: normal;
          color: #333;
          display: flex;
          justify-content: flex-end;
          .mint-switch-core {
            width: 2rem;
            height: 1.1rem;
            margin-left: 0.5rem;
          }
          .mint-switch-input:checked + .mint-switch-core {
            width: 2rem;
            height: 1.1rem;
            background: #ff3737;
            border: 1px solid #eeeeee;
          }
          .mint-switch-core::before,
          .mint-switch-core::after {
            width: 1rem;
            height: 1rem;
          }
        }
      }
      h6 {
        color: #b5b5b5;
        font-size: 0.55rem;
        font-weight: normal;
      }
      p {
        padding-top: 0.85rem;
        b {
          color: #ff3737;
        }
        display: flex;
        justify-content: space-between;
        color: #333;
        font-size: 0.6rem;
        span {
          padding-left: 0.25rem;
          padding-right: 0.7rem;
          display: flex;
          flex: 1;
          .addre {
            display: inline;
            color: #333;
          }
        }
        i {
          display: flex;
          color: #d5d5d5;
          align-items: center;
        }
      }
    }
  }
  .btn {
    padding: 0.5rem 0.75rem;
    background: #f5f5f5;
    a {
      display: block;
      width: 100%;
      background: #ff3737;
      color: #fff;
      text-align: center;
      line-height: 2.25rem;
      font-size: 0.8rem;
    }
  }
  .zhezhao {
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.6;
    width: 100%;
    height: 100%;
  }
}
</style>
