<template>
  <div class="addcredit">
    <div class="creditcard">
      <p><span>企业对公账户：</span><input type="tel" placeholder="请输入企业对公账户" v-model="bankno" @blur="isnumber(bankno)"></p>
      <p @click="show()"><span>银行名称：</span><i :class=" bankname.bankcode ? 'select':''" v-text="bankname.paybankname" ></i></p>
      <p><span>开户行全称：</span><input type="text" placeholder="请输入开户行全称" v-model="banksubname" @blur="errinput(banksubname)"></p>
      <p @click='selectCity' ><span>城市：</span><i :class=" address.length ? 'select':''" v-text="showaddress"></i></p>
      <p><span>手机号：</span><input type="tel" placeholder="请选择手机号" v-model="mobile" @blur="testphone"></p>
    </div>
    <p class="info">提示：请输入正确的企业对公账户信息，错误的信息导致无法收款</p>
    <div class="btn">
      <p  @click="submitCredit">提交</p>
    </div>
    <div class="bottom"  v-if="showbank">
      <p class="banktit"><span @click="okbankname">取消</span><span></span><span  @click="okbankname">确定</span></p>
      <mt-picker :slots="slots" @change="onValuesChange" :valueKey="'paybankname'" :visibleItemCount="5" :value="'请选择银行'"></mt-picker>
    </div>
    <picker-address v-if="isshow" :selectCity=selectCity :sureCity=sureCity ></picker-address>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  import {Toast} from 'mint-ui'
  import { DatetimePicker } from 'mint-ui';
  import axios from "axios";
  import qs from "qs";
  import { Indicator } from "mint-ui";
  import PickerAddress from './PickerAddress';
  import { Picker  } from 'mint-ui';
  export default{
    name: 'AddCredit',
    data() {
      return {
        isshow:'',//选择地址
        bankno:'',
        bankname:{paybankname:'请选择银行'},
        banksubname:'',
        chinacode:'',
        mobile:'',
        address:[ ],
        showaddress:'请选择地址',
        tpoken:'',
        showbank:false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            value:'',
            defaultIndex:0,
          }],
      }
    },
    methods: {
      errinput(str){//特殊字符匹配
        var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;
        if(pattern.test(str)){
          Toast('不能输入特殊字符')
        }
      },
      //纯数字数字正则
      isnumber(str){
        var pattern=/^[0-9]*$/g;
        if(!pattern.test(str)){
          Toast('不能输入数字以外的其它字符')
        }
      },
      selectCity(){
        this.isshow =!this.isshow;
      },
      okbankname(){
        this.showbank=!this.showbank
      },
      sureCity(arr){
        this.address=arr
        this.showaddress= this.address[0].cat +' '+ this.address[1].cat
        this.isshow =!this.isshow;
      },
      show(){
        this.showbank=true
      },
      onValuesChange(picker,values){
        if(this.slots[0].values){
          picker.setSlotValue(1,this.slots[0].values[1]);
          this.bankname=values[0]
        }
      },
      testphone(){
        if(!(/^1[3|4|5|8|7][0-9]\d{8,8}$/).test(this.mobile)){
          Toast('请输入正确联系电话')
        }
      },
      getbank(){
        var that =this
        axios.post(BASE_URL +'/index.php?r=YinjiaStage/GetBank',qs.stringify({
          token:this.token,
        })).then(function (res) {
          var a=JSON.parse(Base64.decode(res.data))
          if(a.code==10000){
            if(a.data.err==10000){
              var bankname= a.data.data
              // bankname.unshift(that.slots[0].values[0])
              that.slots[0].values=bankname
            }
          }
        }).catch(function (err) {

        })
      },
      submitCredit(){
        if(!this.bankno){
          MessageBox.alert('请输入企业账号')
          return
        }
        if(!(/^[0-9]*$/g.test(this.bankno))){
          MessageBox.alert('企业账号格式不正确')
          return
        }
        if(!this.mobile){
          MessageBox.alert('请输入手机号')
          return
        }
        if(!(/^1[3|4|5|8|7][0-9]\d{8,8}$/.test(this.mobile))){
          MessageBox.alert('手机号码格式不正确')
          return
        }
        if(!this.address){
          MessageBox.alert('请选择城市')
          return
        }
        if(!this.banksubname){
          MessageBox.alert('请输入银行全称')
          return
        }
        if(!this.bankname.bankcode){
          MessageBox.alert('请选择银行名称')
          return
        }
        if(!this.address.length){
          MessageBox.alert('请选择城市')
          return
        }
        Indicator.open()
        axios.post(BASE_URL +'/index.php?r=YinjiaStage/MerchantBank',qs.stringify({
          token:this.token,
          province:this.address[0].catid,
          city: this.address[1].catid,
          banksubname:this.banksubname,
          bankname:this.bankname.paybankname,
          chinacode:this.bankname.bankcode,
          bankid:this.bankname.id,
          bankno:this.bankno,
          mobile:this.mobile
        })).then(function (res) {
          Indicator.close()
          var a=JSON.parse(Base64.decode(res.data))
          if(a.code==10000){
              MessageBox.alert(a.info).then(action => {
                  window.location.href='#/travel/index'
              });
          }else{
            MessageBox.alert(a.info)
          }
        }).catch(function (err) {
            Indicator.close()
        })
      }
    },
    mounted() {
      document.title = '企业账户录入'
      this.token=localStorage.getItem('tenant')
      this.getbank()
    },
    updated() {

    },
    activated() {

    },
    components: {
      'picker-address':PickerAddress
    }
  }
</script>

<style  lang="scss">
 .addcredit .picker-items .slot1{
    display: block;
  }
  .addcredit{
    width: 100%;
    height: 100%;
    .info{
      color: #ff3737;
      font-size: 0.7rem;
      padding: 0 0.75rem;
    }
    .creditcard{
      background: #fff;
      margin-bottom: 0.75rem;
      color: #333;
      p{
        padding: 0 0.75rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        input{
          flex: 1;
          border: none;
          font-size: 0.7rem;
          color: #333;;
        }
        span{
          font-size: 0.7rem;
          line-height: 2.45rem;
        }
        b{
          font-size: 0.7rem;
          line-height: 2.45rem;
          font-weight: normal;
          color: #ff3737;
          padding-left: 1rem;
        }
        i{
          font-style: normal;
          font-weight: normal;
          line-height: 2.45rem;
          flex: 1;
          font-size: 0.7rem;
          color: #666;
        }
        .select{
          color: #333;
        }
      }

    }
    .btn{
      padding: 0.75rem;
      p{
        background: #ff3737;
        color: #fff;
        text-align: center;
        line-height: 2.45rem;
        font-size: 0.8rem;
        border-radius: 4px;
      }
    }
    .zhezhao{
      width: 100%;
      height: 100%;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;
      opacity:0.6;
    }
    .vzhezhao{
    	width: 100%;
      height: 100%;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;
      opacity:0.6;
    }
    .cvv{
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      height:12.5rem;
      position: fixed;
      top: 50%;
      background: #fff;
      z-index: 111;
      margin:0 1rem;
      margin-top: -7rem;
      img{
        width: 100%;
        height: 100%;
      }
      .CVVpic{
        padding: 1.8rem 3.4rem;
        padding-bottom: 0;
      }
      .text{
        font-size: 0.7rem;
        text-align: center;
        color:#666;
        line-height: 2.5rem;
      }
      .butto{
        width: 100%;
        background: #ff3737;
        text-align: center;
        color: #fff;
        font-size: 0.9rem;
        line-height: 2.45rem;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .verifications{
    	-webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      position: fixed;
      top: 50%;
      left: 50%;
      width:15.75rem;
      margin-left:-7.875rem ;
      background: #fff;
      z-index: 111;
      margin-top: -7rem;
    	padding-top: 1.5rem;
    	.title{
    		font-size: 0.8rem;
    		color: #333;
    		text-align: center;
    		margin-bottom: 1.125rem;
    	}
    	.box{
    		margin: 0rem 1.75rem;
    		border-right: none;
    		.number{
    			width:2.038rem;
    			height: 1.94rem;
    			text-align: center;
    			color: #333;
          line-height: 2.0rem;
          font-size: 0.9rem;
    			float: left;
    			border:0.025rem solid #000000;
          border-left: none;
    		}

        :nth-child(1){
          border-left:0.025rem solid #000000;
        }
    		.clear{
    			clear: both;
    		}
    	}
      .text{
        height: 0;
        border: none;
        overflow: hidden;
      }
    	.tips{
    		margin-top: 0.625rem;
    		font-size: 0.55rem;
    		color: #999999;
    		text-align: center;
    	}
    	.button{
    		border-top: 0.025rem #eeeeee solid;
    		padding: 0.625rem 0rem 1.25rem 0rem;
    		border-radius:0 0 4px 4px;
    		font-size: 0.85rem;
    		text-align: center;
    		color: #ff3737;
    		margin-top: 1rem;
    	}
    }
    .bottom{
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .banktit{
        display: flex;
        justify-content: space-between;
        padding:0 0.75rem;
        line-height: 2rem;
        font-size: 0.8rem;
        color: #333;
      }
    }

  }



</style>
