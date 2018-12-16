<template>
  <div>
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
  import { mapActions } from 'vuex'
  export default {
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