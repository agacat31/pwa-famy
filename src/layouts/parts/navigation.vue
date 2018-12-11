<template>
  <div>
    <!-- Left Drawer -->
    <v-navigation-drawer
      fixed
      app
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      mobile-break-point="1024"
    >
      <menuList></menuList>
    </v-navigation-drawer>

    <!-- Right Drawer -->
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      :clipped="clipped"
      app
      mobile-break-point="1024"
    >
      <menuList></menuList>
    </v-navigation-drawer>

    <!-- Float Sidebar -->
    <v-navigation-drawer
        v-model="floatDrawer"
        temporary
        right
        fixed
      >
      <menuList></menuList>
    </v-navigation-drawer>

    <!-- Top Navbar -->
    <v-toolbar
      color="blue darken-3"
      dark
      app
      fixed
      :clipped-right="clipped"
      :clipped-left="clipped"
    > 
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
          icon
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          @click.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <span class="">P-Project</span> <!-- hidden-sm-and-down -->
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawerRight = !drawerRight">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn icon @click.stop="floatDrawer = !floatDrawer">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="@/assets/logo.png"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapActions } from 'vuex'
  import MenuList from './menuList.vue'
  export default {
    components: {
      'menuList': MenuList
    },
    data: () => ({
      drawer: store.getters['template/drawer'],
      drawerRight: store.getters['template/drawerRight'],
      clipped: store.getters['template/clipped'],
      miniVariant: store.getters['template/miniVariant'],
      floatDrawer: store.getters['template/floatDrawer']
    }),
    watch: {
      drawer (val) {
        this.setDrawer(val)
      },
      drawerRight (val) {
        this.setDrawerRight(val)
      },
      clipped (val) {
        this.setClipped(val)
      },
      miniVariant (val) {
        this.setMiniVariant(val)
      },
      floatDrawer (val) {
        this.setFloatDrawer(val)
      }
    },
    methods: {
      ...mapActions({
        setDrawer: 'template/setDrawer',
        setDrawerRight: 'template/setDrawerRight',
        setClipped: 'template/setClipped',
        setMiniVariant: 'template/setMiniVariant',
        setFloatDrawer: 'template/setFloatDrawer'
      }),
      goTo (path) {
        this.$router.push({ name: path })
      }
    }
  }
</script>

<style lang="scss">
  .v-input__slot {
    margin-bottom: 0;
  }
</style>
