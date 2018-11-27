<template>
  <div>
    <sidebarTemplate></sidebartemplate>
    <sidebarRightTemplate></sidebarRightTemplate>
    <navbarTemplate></navbartemplate>
    <!-- <floatSidebarTemplate></floatSidebarTemplate> -->
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
  import Navbar from './parts/navigation.vue'
  import Sidebar from './parts/sidebar.vue'
  import SidebarRight from './parts/sidebarRight.vue'
  // import FloatSidebar from './parts/floatSidebar.vue'
  export default {
    components: {
      'navbarTemplate': Navbar,
      'sidebarTemplate': Sidebar,
      'sidebarRightTemplate': SidebarRight,
      // 'floatSidebarTemplate': FloatSidebar,
    },
    beforeCreate () {
      
    },
    computed: mapGetters({
      // auth: 'auth'
    })
  }
</script>