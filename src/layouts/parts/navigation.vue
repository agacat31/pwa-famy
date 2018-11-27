<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    :clipped-right="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      drawer: store.getters.drawer,
      drawerRight: store.getters.drawerRight,
      floatDrawer: store.getters.floatDrawer
    }),
    props: {
      source: String
    },
    watch: {
      drawer (val) {
        this.setDrawer(this.drawer)
      },
      drawerRight (val) {
        this.setDrawerRight(this.drawerRight)
      },
      floatDrawer (val) {
        this.setFloatDrawer(this.floatDrawer)
      }
    },
    methods: {
      ...mapActions({
        setDrawer: 'template/setDrawer',
        setDrawerRight: 'template/setDrawerRight',
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
