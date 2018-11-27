<template>
  <v-app id="p-project">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>
<style src="./styles/base.scss" lang="scss"></style>
<script>
  const default_layout = "fullscreen"
  
  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || default_layout) + '-layout'
      }
    },
    beforeCreate () {
      console.log(this.layout)
    },
    mounted() {
      
    },
  }
</script>