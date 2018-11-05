<template>
  <div class="back_money">
    <div class="container">
      <div class="input_box">
        <label for="oriderid"><i>*</i>填写订单号</label><input v-model="orderid" type="tel" id="oriderid" placeholder="请填写订单编号" @blur="getorder">
      </div>
      <div class="goods" v-if="ordergoods">
        <div class="order_contaner">
          <div class="order_img">
            <img :src="ordergoods.pdpicture" alt="">
          </div>
          <div class="order_text">
            <p>{{ordergoods.pname}}</p>
            <div class="order_msg">
              {{ordergoods.pintro}}
            </div>
            <div class="order_money">
              ￥<b>{{ordergoods.orderprice}}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="cause_box">
        <p><i>*</i>退款原因</p>
        <textarea v-model="content"  placeholder="请填写退款原因 200字以内"></textarea>
      </div>
      <div class="money"><i>*</i>退款金额 <span>￥{{money}}</span></div>
      <div class="img">
         <p><i>*</i>上传凭证</p>
         <ul class="clear">
           <li v-for="item,index in urla">
             <span @click="delimg(index)"><b><i class="iconfont icon-guanbi"></i></b></span>
             <img :src='item' alt="">
              <div class="newimg " @click="clickDom(index)">重新上传</div>
              <input type="file" class="input_img" :id="'input_img' + index" ref="input_img" accept="image/*" @change="ImgBase64($event,index)">
             </li>
              <li v-if="urla.length!=6" @click="clickDom('')"> <div class="upimg" >
                <input type="file" class="input_img" id="input_img" accept="image/*" @change="ImgBase64($event,'-1')">
              </div></li>
          </ul>
      </div>
    </div>
    <button class="goback" @click="needback">确定提交</button>
    <div v-if="isok" class="bg"></div>
    <div v-if="isok" class="ok_status"><img src="../../assets/images/travel/succeed.png" alt=""></div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import {Toast,Indicator,MessageBox} from 'mint-ui'
  export default {
    name: 'BackMoney',
    data() {
      return {
        token:'',
        orderid:'',
        money:'0.00',
        urla:[],
        content:'',
        ordergoods:'',
        issecond:false,//是否第二次提交
        isok:false
      }
    },
    methods: {
      getorder(){
        //获取订单信息
        if(!this.orderid){
          return
        }
        if(!(/^[0-9]*$/.test(this.orderid))){
          MessageBox.alert('请输入正确的订单号','提示')
          return
        }
        Indicator.open()
        var that =this
         axios.post(BASE_URL+'/index.php?r=YinjiaStage/GetOrderInfo',qs.stringify({
          token:this.token,
          orderid:this.orderid,
        })).then(function(res){
            var a =JSON.parse(Base64.decode(res.data))
            Indicator.close()
            if(a.code==10000){
              if(a.data.data.singlestatus!=5){
                if(a.data.data.singlestatus!=4){
                  that.ordergoods=a.data.data
                  that.money=that.ordergoods.orderprice
                  if(a.data.data.singlestatus!=3){
                    if(a.data.data.singlestatus!=2) {
                      if (a.data.data.singlestatus == 6) {
                        that.issecond = true
                        that.getrefundorder()
                      }
                    }else{
                      that.orderid=''
                      MessageBox.alert('该订单已提交申请','提示')
                    }
                  }else{
                    that.orderid=''
                    MessageBox.alert('该订单已取消，无法再次申请','提示')
                  }
                }else{
                  that.orderid=''
                  MessageBox.alert('该订单正在审核中','提示')
                }
              }else{
                that.orderid=''
                MessageBox.alert('该订单已退款成功','提示')
              }
            }else{
              MessageBox.alert(a.info,'提示')
            }
        }).catch(function(err){

        })
      },
      getrefundorder(){
        //获取退款状态
        Indicator.open()
        var that =this
        axios.post(BASE_URL+'/index.php?r=YinjiaStage/GetMerchatSingleRefundOrders',qs.stringify({
          token:this.token,
          orderid:this.orderid
        })).then(function(res){
              var a =JSON.parse(Base64.decode(res.data))
               Indicator.close()
              if(a.code==10000){
                if(a.data.err==10000){
                  that.content=a.data.data.content
                  that.urla= JSON.parse(a.data.data.urla)
                }else{
                  Toast(a.data.msg)
                }
              }else{
                Toast(a.info)
                that.orderid=''
              }
        }).catch(function (err) {

        })
      },
      delimg(index){
          this.urla.splice(index,1)
      },
      clickDom(index){
       var dom = "input_img"+index
        var img = document.getElementById(dom)
        img.click()
      },
      //图片转码
      ImgBase64(e, index){
        let tag = e.target;
        let fileList = tag.files;
        let imgNum = fileList.length;
        let _this = this;
        var _index = index
        if(!fileList.length){
            return
        }
        Indicator.open()
        var Orientation = null
        EXIF.getData(fileList[0], function () {
          Orientation = EXIF.getTag(fileList[0], 'Orientation');
        });
        let reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
            var expectWidth = image.naturalWidth;
            var expectHeight = image.naturalHeight;
            if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
              expectWidth = 800;
              expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
              expectHeight = 1200;
              expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
            }
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            var base64 = null;
            // // 修复ios上传图片的时候 被旋转的问题
            // if (Orientation != "" && Orientation != 1) {
            //   switch (Orientation) {
            //     case 6://需要顺时针（向左）90度旋转
            //       _this.rotateImg(this, 'left', canvas);
            //       break;
            //     case 8://需要逆时针（向右）90度旋转
            //       _this.rotateImg(this, 'right', canvas);
            //       break;
            //     case 3://需要180度旋转
            //       _this.rotateImg(this, 'right', canvas);//转两次
            //       _this.rotateImg(this, 'right', canvas);
            //       break;
            //   }
            // }
            base64 = canvas.toDataURL("image/jpeg", 1);
            if(!base64){
              Toast('上传失败，请重新选择图片，或者更换图片')
              return
            }
            _this.upimg(base64,_index,_this)

          }
        }
      },
      //上传图片
      upimg(base64,index){
        var that =this
        axios.post(BASE_URL + '/index.php?r=Common/UploadImg', qs.stringify({
          token: '6fHdQpdyvCQGgokuQQ',
          fileImg: base64
        })).then(function (res) {
          Indicator.close()
          var a = Base64.decode(res.data)
          a = JSON.parse(a)
          if(a.code==10000){
            if(a.data.err==10000){
              if(index>=0){
                that.$set(that.urla,[index],a.data.data.imgUrl)
              }else{
                that.urla.push(a.data.data.imgUrl)
              }
            }else{
              Toast(a.msg)
            }
          }else{
            Toast(a.info)
          }
        }).catch(function (err) {
          Indicator.close()
        });
      },
      needback(){
        var that=this
        if(this.urla.length<1){
          MessageBox.alert('请上传凭证','提示')
          return
        }
        if(!this.content){
          MessageBox.alert('请输入退款原因','提示')
          return
        }
        if(this.content.length>200){
          MessageBox.alert('退款原因不能超过200字符','提示')
          return
        }
        if(!(/^[0-9]*$/.test(this.orderid))){
          MessageBox.alert('请输入正确的订单号','提示')
          return
        }
        if(!this.orderid){
          MessageBox.alert('请输入订单号','提示')
          return
        }
        if(!this.money||this.money<=0){
          MessageBox.alert('请输入正确的订单号','提示')
          return
        }
        Indicator.open()
        if(this.issecond){
          //二次申请退款
          axios.post(BASE_URL+'/index.php?r=YinjiaStage/OrderRefundSecond',qs.stringify({
            token:this.token,
            orderid:this.orderid,
            money:this.money,
            urla:JSON.stringify(this.urla),
            content:this.content
          })).then(function(res){
            Indicator.close()
              var a =JSON.parse(Base64.decode(res.data))
              if(a.code==10000){
                that.isok=true
                setTimeout(function(){
                  window.location.href='#/travel/refundrecord'
                }, 3000);
              }else{
                MessageBox.alert( a.info,'提示')
              }
          }).catch(function(err){

          })
        }else{
          axios.post(BASE_URL+'/index.php?r=YinjiaStage/OrderRefund',qs.stringify({
            token:this.token,
            orderid:this.orderid,
            money:this.money,
            urla:JSON.stringify(this.urla),
            content:this.content
          })).then(function(res){
              var a =JSON.parse(Base64.decode(res.data))
            Indicator.close()
              if(a.code==10000){
                that.isok=true
                setTimeout(function(){
                  window.location.href='#/travel/refundrecord'
                }, 3000);
              }else{
                MessageBox.alert(a.info,'提示')
              }
          }).catch(function(err){

          })
        }

      },
       tow(){

      }
    },
    mounted() {
      this.token=localStorage.getItem('tenant')
      // this.orderid='2515242995693772'
      // this.money='100'
      // this.urla=['http://image.yifuka.com/CommonImg/20180415/15237917084413.jpeg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg']
      // this.content='客服还打算尽快发货速度代理费多少'
      var id =this.$route.params.torderid
      if(id!= 0){
          this.orderid=id
          this.getorder()
      }
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .back_money {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #fff;
    display: flex;
    flex-flow: column;
    .container {
      flex: 1;
      padding: 0 0.75rem;
      overflow: scroll;
      .input_box {
        display: flex;
        align-items: center;
        height: 2.25rem;
        border-bottom: 1px solid #eee;
        label {
          font-size: 0.7rem;
          font-weight: 800;
          margin-right: 0.75rem;
          i {
            color: #ff0000;
          }
        }
        input {
          border: none;
          font-size: 0.7rem;
        }
      }
     .order_contaner{
       margin: 0.75rem 0;
      display: flex;
      justify-content: space-around;
      padding: 0.75rem;
      overflow: hidden;
      height: 5.5rem;
      box-shadow:0px 0px 15px #f1f5f9;
      .order_img{
        width: 4rem;
        img{
          width: 100%;
        }
      }
      .order_text{
        display: flex;
        flex: 1;
        flex-flow: column;
        padding-left: 0.5rem;
        p{
          font-size: 0.65rem;
          color: #333;
          font-weight: bold;
          height: 1.05rem;
        }
        .order_msg{
          font-size: 0.55rem;
          color: #999;
          display: flex;
          flex: 1;
        }
        .order_money{
          height: 0.9rem;
          font-size: 0.6rem;
          font-weight: bold;
          color: #ff3636;
          b{
            font-size: 0.85rem;
          }
        }
        }
      }
      .cause_box{
        p{
          font-size: 0.7rem;
          line-height: 2.25rem;
          font-weight: 800;
          margin-right: 0.75rem;
          i {
            color: #ff0000;
          }
        }
        textarea{
          border: none;
          width: 100%;
         min-height: 5.5rem;
          border: none;
          background: #f1f5f9;
          font-size: 0.7rem;
          outline: none;
          padding: 0.5rem;
          box-sizing: border-box;
        }
      }
      .money{
        font-size: 0.7rem;
        line-height: 2.25rem;
        font-weight: 800;
        margin-right: 0.75rem;
        border-bottom: 1px solid #eee;
        i {
          color: #ff0000;
        }
        span{
          color: #ff3f3f;
        }
      }

      .img{
        padding-top: 1rem;
        overflow: hidden;
        p{
          font-size: 0.7rem;
          line-height: 2.25rem;
          font-weight: 800;
          margin-right: 0.75rem;
          i {
            color: #ff0000;
          }
        }
        ul{
          width: 110%;
          li{
            width: 4rem;
            height: 4rem;
            float: left;
            margin-right: 0.4rem;
            margin-bottom: 0.4rem;
            position: relative;
            span{
              position: absolute;
              top: -0.2rem;
              left: -0.2rem;
              background: #fff;
              border-radius: 50%;
              display: block;
              width: 1.2rem;
              height: 1.2rem;
              display: flex;
              text-align: center;
              align-items: center;
              b{
                display: inline-block;
                color: #333;
                font-size: 0.26rem;
                background: #f0c47d;
                width:1rem;
                height: 1rem;
                border-radius: 50%;
                text-align: center;
                line-height: 1rem;
                text-align: center;
                margin: 0 auto;
              }
            }
            img{
              width: 100%;
              height:100%;
            }
            .newimg{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              font-size: 0.6rem;
              color: #333;
              background: #f0c47d;
              text-align: center;
              line-height: 1.25rem;
            }
          }
        }
        ul::after{
          content: '';
          height: 0;
          clear: both;
          overflow: hidden;
        }
        .upimg{
          width: 4rem;
          height: 4rem;
          background:url('../../assets/images/travel/ps.png');
          background-size: 100% 100%;
        }
      }

    }
    .goback{
      border: none;
      background: #ff3737;
      width: 100%;
      color: #fff;
      font-size: 0.8rem;
      height: 2.25rem;
      margin-top:0.75rem;
    }
    .bg{
      background: #333;
      opacity: 0.6;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
    .ok_status{
       position: fixed;
       top: 50%;
      margin-top:-50%;
       width: 100%;
      height: 100%;
      img{
        display: block;
        width: 80%;
        margin: 0 auto;
      }
    }
    .input_img{
      display: none;
    }
  }

</style>
