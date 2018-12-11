<template>
  <div>
    <navbarTemplate></navbartemplate>
    <v-content>
	    <v-container fluid>
            <transition name="fade" mode="out-in" :duration="{ enter: 100, leave: 50 }">
                <slot />
            </transition>
        </v-container>
    </v-content>
  </div>
</template>
<script>
  import store from '@/store'
  import Navbar from './parts/navigation.vue'
  export default {
    components: {
      'navbarTemplate': Navbar
    },
    beforeCreate () {
      console.log(this.$vuetify.breakpoint.smAndDown)
    }
  }
</script>