<template>
<div id="flux">
		<div class="much">
			<div class="how">
        <span v-if="type!='GPRS'"v-for="item in size" :class="flowvalue==item.faceValue?'active':''" @click="change(item)">{{item.faceValue}}</span>
				<span v-if="type=='GPRS'" v-for="item in combo" :class="flowvalue==item.flowvalue?'active':''" @click="change(item)">{{item.flowvalue}}</span>

				<b></b>
			</div>
			<p class="pay"><span>应付金额：&nbsp;<b>¥&nbsp;<i>{{frontPrice}}</i></b></span><span>提示：手机充值收取3%手续费</span></p>
      <p v-if="type!='GPRS'"><span>中欣通支付立省{{size[0].savenum}}</span></p>
      <p v-if="type =='GPRS'"><span>中欣通支付立省{{combo[0].savenum}}</span></p>
		</div>
		<div class="gopay">
			<a @click="vaildproduct">选择充值方式</a>
		</div>
		<p class="dao">正常充值时间为5到30分钟，如遇运营商系统繁忙到账时间会有延迟</p>
	</div>
</template>

<script>
const Flux = {
  name: "Flux",
  props: ["combo", "vaildproduct", "changeflow", "size", "type"],
  data() {
    return {
      flowvalue: "",
      frontPrice: 0.0
    };
  },
  computed: {},
  methods: {
    change(item) {
      if (this.type == "GPRS") {
        this.flowvalue = item.flowvalue;
        this.frontPrice = item.frontPrice;
      } else {
        this.flowvalue = item.faceValue;
        this.frontPrice = item.money;
      }
      this.changeflow(item);
    },
    init() {
      this.flowvalue = 0;
      this.frontPrice = 0;
    }
  },
  mounted() {

  },
  updated() {},
  activated() {},
  components: {}
};

export default Flux;
</script>

<style scoped lang="scss">
#flux {
  .much {
    padding-top: 0.3rem;
    background: #fff;
    p {
      color: #999;
      padding: 0.75rem;
      font-size: 0.65rem;
    }
    .how {
      padding: 0 0.75rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        border: 1px solid #eee;
        font-size: 0.6rem;
        color: #333;
        width: 5.2rem;
        line-height: 2.15rem;
        text-align: center;
        margin: 0.375rem 0;
      }
      b {
        width: 5.2rem;
      }
      .active {
        border-color: #ff3737;
        color: #ff3737;
      }
    }
    .pay {
      display: flex;
      justify-content: space-between;
      color: #999;
      b {
        color: #ff3737;
      }
    }
  }
  .gopay {
    padding: 0 0.75rem;
    padding-top: 0.5rem;
    a {
      display: block;
      width: 100%;
      background: #ff3737;
      color: #fff;
      text-align: center;
      line-height: 2.25rem;
      font-size: 0.7rem;
    }
  }
  .dao {
    padding: 0 0.75rem;
    font-size: 0.65rem;
    color: #666;
    padding-top: 0.75rem;
  }
}
</style>
