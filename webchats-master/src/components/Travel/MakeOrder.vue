<template>

</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Indicator, MessageBox} from 'mint-ui'

  export default {
    name: 'MakeOrder',
    data() {
      return {
        sign:''
      }
    },
    methods: {},
    mounted() {
      var Tsign=(this.$route.params.sign).split('&')
      this.sign= this.$route.params.sign
      var token=(Tsign[1].split('=')[1]).replace(/@/g,'/')
      Indicator.open()
      axios.post(BASE_URL + '/index.php?r=YinjiaStage/PlaceOrder', qs.stringify({
        sign:this.sign,
        token:token
      })).then(res => {
        Indicator.close()
        var resdata = JSON.parse(Base64.decode(res.data))
        if (resdata.code == 10000) {
          window.location.href=decodeURIComponent(resdata.data.signUrl)
        } else {
          MessageBox.alert(resdata.data.info)
        }
      }).catch(err => { Indicator.close()})

    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">


</style>
