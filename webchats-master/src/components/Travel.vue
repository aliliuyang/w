<template>
  <div id="Travel">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'Travel',
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
    components: {}
  }
</script>

<style scoped lang="scss">
#Travel{
  width: 100%;
  height: 100%;
}

</style>
