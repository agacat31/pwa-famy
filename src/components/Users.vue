<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="item in breadcrumbs"
        :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="editedItem.name"
                    :rules="rules.nameRules"
                    :counter="10"
                    label="Dessert name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field
                    v-model="editedItem.calories"
                    :rules="rules.caloriesRules"
                    :counter="10"
                    label="Calories"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            :disabled="!valid"
            @click.native="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      v-model="selected"
      item-key="email"
      select-all
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPage"
      :total-items="totalItems"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.firstname }} {{ props.item.lastname }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.city }}</td>
        <td class="text-xs-right">{{ props.item.address.city }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { getUsers } from '../store/utils/api'
  export default {
    data () {
      return {
        // Breadcrumbs
        breadcrumbs: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ],
        // Datatables
        search: '',
        dialog: false,
        totalItems: 0,
        selected: [],
        tableItems: [],
        loading: true,
        pagination: {},
        rowsPerPage: [5, 10, 25, 50, 100],
        headers: [
          { text: 'Name', align: 'left', value: 'firstname' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'City', value: 'city' },
          { text: 'Address', value: 'address.city', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }
        ],
        // Datatables

        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        // Form Rules
        valid: false,
        rules: {
          nameRules: [
            v => !!v || 'Name is required',
            v => (v.length >= 4) || 'Name must have at least 4 letters.'
          ],
          caloriesRules: [
            v => !!v || 'Calories is required',
            v => (v > 10 && v < 50) || 'Must be between 10 and 50'
          ]
        }
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.tableItems = data.items
              this.totalItems = data.total
            })
        },
        deep: true
      },
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    mounted () {
      // this.getDataFromApi()
      //   .then(data => {
      //     this.tableItems = data.items
      //     this.totalItems = data.total
      //   })
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination
          console.log(this.pagination)
          var paginate = {
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
            sort: this.pagination.sortBy,
            order: this.pagination.descending ? 'desc' : 'asc',
            filter: this.search
          }

          let items
          const total = 200
          getUsers(paginate).then((response) => {
            items = response.data
          })

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      editItem (item) {
        this.editedIndex = this.tableItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(this.editedItem)
      },

      deleteItem (item) {
        const index = this.tableItems.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.tableItems.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.$refs.form.resetValidation()
            // this.$refs.form.reset()
            this.editedIndex = -1
        })
      },

      save () {
        var data = JSON.parse(JSON.stringify(this.editedItem))
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          if (this.editedIndex > -1) {
            Object.assign(this.tableItems[this.editedIndex], data)
          } else {
            this.tableItems.push(data)
          }
          this.close()
        }
      }
    }
  }
</script>