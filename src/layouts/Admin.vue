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
  import { mapActions } from 'vuex'
  export default {
    components: {
      'navbarTemplate': Navbar
    },
    beforeCreate () {
      // console.log(this.$vuetify.breakpoint.smAndDown)
    },
    created () {
      this.setMobile(this.$vuetify.breakpoint.smAndDown)
    },
    methods: {
      ...mapActions({
        setMobile: 'template/setMobile'
      })
    }
  }
</script>