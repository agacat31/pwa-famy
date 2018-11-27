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
  import Navbar from '../components/base/navigation.vue'
  import Sidebar from '../components/base/sidebar.vue'
  import SidebarRight from '../components/base/sidebarRight.vue'
  // import FloatSidebar from './floatSidebar.vue'
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