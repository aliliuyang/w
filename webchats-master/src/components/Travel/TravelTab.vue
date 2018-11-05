<template>
  <footer class="navtab">
    <router-link to="/travel/index" :class="selectedpage=='商品'? 'isactive' :''"><span class="iconfont icon-shangcheng"></span><b>商品</b></router-link>
    <router-link to="/travel/main" :class="selectedpage=='我的'? 'isactive' :''"><span class="iconfont icon-wode"></span><b>我的</b></router-link>
  </footer>
</template>
<script>
  export default{
    name: 'TravelTab',
    props:['selectedpage',],
    data() {
      return {}
    },
    methods: {},
    mounted() {


    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .navtab{
    width: 100%;
    height: 2.5rem;
    position: absolute;
    bottom: 0rem;
    display: flex;
    background: #fff;
    border-top:1px solid #eee;
  }
  a{
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: #999;
  }
  b{
    font-weight: normal;
    font-size: 0.5rem;
    margin-top:-0.5rem;
  }
  span{
    font-weight: normal;
    color: #999;
    font-size: 1.25rem;
  }
  .isactive{
    span{
      color: #000;
    }
    b{
      color: #000;
    }
  }

</style>
