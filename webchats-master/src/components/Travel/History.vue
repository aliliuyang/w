<template>
  <div class="history">
    <div class="all">
      <div class="historylist" v-for="item in day">
        <a :href='"#/travel/oneday/"+item.day'>
          <p class="date"><span>{{item.day}}</span><span class="iconfont icon-jiantou-copy"></span></p>
        </a>
        <div class="allnumber">
          <p><b>{{item.count}}</b><span>笔数</span></p>
          <p><b>{{item.coutMoney}}</b><span>金额（元）</span></p>
        </div>
      </div>
    </div>
    <p class="line"><b></b><span>月度收入</span><b></b></p>
    <div class="historylist" v-for="item1 in month">
      <!--<a :href='"#/travel/onday/"+item.day'>-->
      <p class="date"><span>2018年{{item1.month}}月</span><span></span></p>
      <!--</a>-->
      <div class="allnumber">
        <p><b>{{item1.count}}</b><span>笔数</span></p>
        <p><b>{{item1.coutMoney}}</b><span>金额（元）</span></p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'History',
    data() {
      return {
        day: [],
        month: []
      }
    },
    methods: {},
    mounted() {
      document.title='订单记录'
      var that = this
      var token = localStorage.getItem('tenant')
      axios.post(BASE_URL + '/index.php?r=YinjiaStage/TestOrder', qs.stringify({
        token: token
      })).then(function (res) {
        var data = JSON.parse(Base64.decode(res.data))
        if (data.code == 10000) {
          if (data.data.err == 10000) {
            that.day = data.data.days
            that.month = data.data.month
          }
        }
      }).catch(function (err) {

      })

    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .history {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .all {
      padding: 0.75rem;
    }
    .historylist {
      background: #fff;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      .date {
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
        line-height: 1.7rem;
        font-size: 0.7rem;
        border-bottom: 1px solid #eeeeee;
      }
      .allnumber {
        padding: 1.25rem 0;
        display: flex;
        justify-content: space-around;
        p {

          display: flex;
          flex-flow: column;
          text-align: center;
          b {
            font-size: 1.25rem;
            color: #333;
          }
          span {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }
    }
    .line {
      border-top: 1px solid #ddd;
      width: 100%;
      margin-bottom: 1rem;
      text-align: center;
      padding-top: -0.5rem;
      display: flex;
      justify-content: space-around;
      span {
        display: block;
        font-size: 0.8rem;
        height: 1rem;
        color: #999;
        padding: 0 15px;
        margin-top: -0.5rem;
        background: #f5f5f5;
      }
    }

  }


</style>
