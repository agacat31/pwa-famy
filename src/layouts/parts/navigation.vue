<template>
  <div>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      fixed
      :clipped-right="clipped"
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

    <!-- Float Sidebar -->
    <v-navigation-drawer
        v-model="floatDrawer"
        temporary
        right
        fixed
      >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(child.pathName)"
              class="grey lighten-3"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="goTo(item.pathName)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      drawer: store.getters['template/drawer'],
      drawerRight: store.getters['template/drawerRight'],
      clipped: store.getters['template/clipped'],
      miniVariant: store.getters['template/miniVariant'],

      // Float Sidebar
      floatDrawer: false,
      items: [
        { icon: 'home', text: 'Home', pathName: 'home' },
        { icon: 'contacts', text: 'Users', pathName: 'user' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import', pathName: 'home' },
            { text: 'Export', pathName: 'home' },
            { text: 'Print', pathName: 'home' },
            { text: 'Undo changes', pathName: 'home' },
            { text: 'Other contacts', pathName: 'home' }
          ]
        },
        { icon: 'lock', text: 'Logout', pathName: 'logout' }
      ]
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
      clipped (val) {
        this.setClipped(val)
      },
      miniVariant (val) {
        this.setMiniVariant(val)
      }
    },
    methods: {
      ...mapActions({
        setDrawer: 'template/setDrawer',
        setDrawerRight: 'template/setDrawerRight',
        setClipped: 'template/setClipped',
        setMiniVariant: 'template/setMiniVariant'
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
