<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    :clipped-right="$vuetify.breakpoint.mdAndUp"
    :clipped-left="clipped"
  > <!-- :clipped-left="$vuetify.breakpoint.mdAndUp" :clipped-right="$vuetify.breakpoint.mdAndUp" -->
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
</template>

<script>
  import store from '@/store'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      drawer: store.getters['template/drawer'],
      drawerRight: store.getters['template/drawerRight'],
      floatDrawer: store.getters['template/floatDrawer'],
      clipped: store.getters['template/clipped'],
      miniVariant: store.getters['template/miniVariant']
    }),
    props: {
      source: String
    },
    watch: {
      drawer (val) {
        this.setDrawer(val)
      },
      drawerRight (val) {
        this.setDrawerRight(val)
      },
      floatDrawer (val) {
        this.setFloatDrawer(val)
      },
      miniVariant (val) {
        this.setMiniVariant(val)
      },
      clipped (val) {
        this.setClipped(val)
      }
    },
    methods: {
      ...mapActions({
        setDrawer: 'template/setDrawer',
        setDrawerRight: 'template/setDrawerRight',
        setFloatDrawer: 'template/setFloatDrawer',
        setMiniVariant: 'template/setMiniVariant',
        setClipped: 'template/setClipped'
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
