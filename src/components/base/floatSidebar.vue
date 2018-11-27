<template>
  <v-navigation-drawer
      :value="floatDrawer"
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
</template>
<script>
  import store from '@/store'
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      items: [
        { icon: 'contacts', text: 'Users', pathName: 'user' },
        { icon: 'history', text: 'Frequently contacted', pathName: 'home' },
        { icon: 'content_copy', text: 'Duplicates', pathName: 'home' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: false,
          children: [
            { icon: 'add', text: 'Create label', pathName: 'home' }
          ]
        },
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
        { icon: 'settings', text: 'Settings', pathName: 'home' },
        { icon: 'chat_bubble', text: 'Send feedback', pathName: 'home' },
        { icon: 'help', text: 'Help', pathName: 'home' },
        { icon: 'phonelink', text: 'App downloads', pathName: 'home' },
        { icon: 'lock', text: 'Logout', pathName: 'logout' }
      ]
    }),
    computed: mapGetters({
      floatDrawer: 'floatDrawer'
    }),
    props: {
      source: String
    },
    methods: {
      goTo (path) {
        if (path === 'logout') {
          this.$session.destroy()
          window.localStorage.clear()
          store.dispatch('setAuth', false)
          this.$router.push('/login')
        } else {
          this.$router.push({ name: path })
        }
      }
    }
  }
</script>