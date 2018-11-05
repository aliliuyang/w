<template>
	<div id="lists">
		<ul>
			<li class="bd1">
				<div class="box">
					<div class="img">
						<img src="../../assets/images/travel/bank.png" />
					</div>
					<div class="font">
						<p class="pc1">{{bnumnaem}}</p>
						<p class="pc2" v-if="!tf">{{bnum}}</p>
            <p class="pc2" v-else >{{bnums}}</p>
					</div>
					<div class="shows" :class="{'hides':shide}" @click="displays"></div>
				</div>
			</li>
			<!--<li class="bd2">-->
				<!--<div class="box">-->
					<!--<div class="img">-->
						<!--<img src="../../assets/images/travel/alipay.png" />-->
					<!--</div>-->
					<!--<div class="font">-->
						<!--<p class="pc1">支付宝账户</p>-->
						<!--<p class="pc2" v-if="tf">{{anum}}</p>-->
						<!--<p class="pc2" v-else>{{anums}}</p>-->
					<!--</div>-->
					<!--<div class="shows" :class="{'hides':shide}" @click="displays"></div>-->
				<!--</div>-->
			<!--</li>-->
			<!--<li class="bd3">-->
				<!--<div class="box">-->
					<!--<div class="img">-->
						<!--<img src="../../assets/images/travel/wechat.png" />-->
					<!--</div>-->
					<!--<div class="font">-->
						<!--<p class="pc1">微信账号</p>-->
						<!--<p class="pc2" v-if="tf">{{wnum}}</p>-->
						<!--<p class="pc2" v-else>{{wnums}}</p>-->
					<!--</div>-->
					<!--<div class="shows" :class="{'hides':shide}" @click="displays"></div>-->
				<!--</div>-->
			<!--</li>-->
      <!--<p class="addcredit" v-if="!bnum">-->
        <!--<a href="#/travel/addcredit"><b>+</b>添加对公账户</a>-->
      <!--</p>-->
		</ul>
	</div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import axios from "axios";
  import qs from "qs";
export default{
  name:'Settlement',
 	data() {
    	return {
        	shide:false,
          tf:false,
        	bnum:'',
          bnums:'',
          bnumnaem:'',
          token:''
      	}
    },
    methods:{
		displays(){
      this.bnum.split()
      var number =this.bnum.length-8;
      var spstring =''
      for(var i =0;i<this.bnum.length-8;i++){
        spstring += '*'
      }
      // this.bnums=this.bnum.replace(/^(\w{3})\w{4}(.*)$/, spstring)
      var str1=this.bnum.substring(0,4)
      var str2=this.bnum.substring(this.bnum.length-4,this.bnum.length)
      // this.bnums=this.bnum.replace(4,this.bnum.length-4,spstring )
      this.bnums =str1 + spstring + str2
      this.shide=!this.shide
			this.tf=!this.tf
      // this.wnums=this.wnum.replace(/^(\w{4})\w{6}(.*)$/, '$1****$2')
		},
	},
  mounted(){
    document.title='收款账户'
    var that =this
    this.token=localStorage.getItem('tenant')
    axios.post(BASE_URL +'/index.php?r=YinjiaStage/GetMerchBank',qs.stringify({
      token:this.token,
    })).then(function (res) {
      var a=JSON.parse(Base64.decode(res.data))
      if(a.code==10000){
        if(a.data.err==10000){
          that.bnum=a.data.data.bankno
          that.bnumnaem=a.data.data.bankname
        }
      }
    }).catch(function (err) {

    })
  }

 }
</script>

<style scoped lang="scss">
#lists{padding: 0.75rem 0.75rem 0 0.75rem;}
#lists ul li{width:17.25rem; border-radius: 0.25rem; margin-bottom: 0.75rem; padding:1.12rem 0;}
#lists ul li div.box{ width:15.3rem; margin: 0 auto;}
#lists ul li div.box:after{content: ""; display: block; height: 0; clear: both;}
#lists ul li div div.img{ width:1.75rem ; height: 1.77rem; float:left;}
#lists ul li div div.img img{width: 100%; height: 100%;}
#lists ul li div div.font{float:left; padding-left: 0.75rem;}
#lists ul li div div.font p.pc1{color: #fff; font-size: 0.7rem; margin-bottom: 0.3rem;}
#lists ul li div div.font p.pc2{color: #fff; filter:alpha(opacity=60);-moz-opacity:0.6;opacity:0.6; font-size: 0.55rem;}
#lists ul li div div.shows{float:right; width:1rem; height: 0.62rem; background-image: url(../../assets/images/travel/show.png); background-repeat: no-repeat; background-size:cover; margin-top: 0.7rem;}
#lists ul li div div.hides{float:right; width:1rem; height: 0.62rem; background-image: url(../../assets/images/travel/hide.png); background-repeat: no-repeat; background-size:90%; margin-top: 0.7rem;}
#lists ul li.bd1{
	background: -webkit-linear-gradient(left, #ff502a, #ff8e48); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ff502a, #ff8e48); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ff502a, #ff8e48); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ff502a, #ff8e48); /* 标准的语法 */
}
#lists ul li.bd2{
	background: -webkit-linear-gradient(left, #1495d1, #62beea); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #1495d1, #62beea); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #1495d1, #62beea); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #1495d1, #62beea); /* 标准的语法 */
}
#lists ul li.bd3{
	background: -webkit-linear-gradient(left, #3cc45a, #53d66b); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #3cc45a, #53d66b); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #3cc45a, #53d66b); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #3cc45a, #53d66b); /* 标准的语法 */
}
  .addcredit{
    padding: 0;
    margin: 0;
    a{
      display: block;
      border: 1px dashed #666;
      width: 100%;
      line-height: 3.5rem;
      text-align: center;
      font-size: 1rem;
      color: #333;
      b{
        font-size: 1.3rem;
        font-weight: normal;
      }
    }
  }
</style>
