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
  import store from '@/store'
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      auth: 'auth'
    })
  }
</script>