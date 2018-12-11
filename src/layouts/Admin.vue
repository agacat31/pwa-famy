<template>
  <div>
    <sidebarTemplate></sidebartemplate>
    <sidebarRightTemplate></sidebarRightTemplate>
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
  import Sidebar from './parts/sidebar.vue'
  import SidebarRight from './parts/sidebarRight.vue'
  export default {
    components: {
      'navbarTemplate': Navbar,
      'sidebarTemplate': Sidebar,
      'sidebarRightTemplate': SidebarRight,
    },
    beforeCreate () {
      if (this.$vuetify.breakpoint.smAndDown) {
        store.dispatch("template/setDrawer", false)
        store.dispatch("template/setDrawerRight", false)
      }
    }
  }
</script>