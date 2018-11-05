<template>
  <div class="refund">
    <ul>
      <li><a href="#/travel/backmoney/0"><i class="recode"></i><span>申请退款<b class="iconfont icon-jiantou-copy"></b></span></a></li>
      <li><a href="#/travel/refundrecord"><i class="refund"></i><span>退款记录<b class="iconfont icon-jiantou-copy"></b></span></a></li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: 'Refund',
    data() {
      return {}
    },
    methods: {},
    mounted() {
      document.title='分期业务'


    },
    updated() {

    },
    activated() {

    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  .refund {
    width: 100%;
    height: 100%;
    background: #fff;
    ul {
      a{
        padding-left:0.75rem;
        font-size: 0.75rem;
        color: #333;
        display: flex;
        justify-content:space-between;
        background: #fff;
        height: 2.5rem;
        line-height: 2.5rem;
        span{
          display: flex;
          flex: 1;
          height: 100%;
          align-items: center;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f5f5f5;
          padding-right: 0.75rem;
        }
        i{
          width: 1rem;
          height: 100%;
          display: flex;
          display: inline-block;
          margin-right: 0.75rem;
        }
        .recode{
          background-image: url("../../assets/images/travel/addfound.png");
          -webkit-background-size: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .refund{
          background-image: url("../../assets/images/travel/refondlist.png");
          -webkit-background-size: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        b{
          color: #dedede;
        }
      }

    }

  }

</style>
