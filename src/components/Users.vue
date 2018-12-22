<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">">
      <v-icon slot="divider">chevron_right</v-icon>
    </v-breadcrumbs>

    <v-btn color="primary" dark class="mb-2" @click="dialog = true">New User</v-btn>

    <!-- ============= Toolbar ============= -->

    <v-card-title class="pl-0 pr-0">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2">Pdf</v-btn>
      <v-btn color="primary" dark class="mb-2">Xls</v-btn>
    </v-card-title>

    <!-- ============= Datatables ============= -->

    <v-data-table
      :headers="headers"
      :items="tableItems"
      v-model="selected"
      item-key="id"
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
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td>{{ props.item.city }}</td>
        <td>{{ props.item.address.streetAddress }}</td>
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

    <!-- ============= Modal ============= -->

    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-container grid-list-md class="pt-0 pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.firstname" label="Firstname"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.lastname" label="Lastname"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field 
                  v-model="editedItem.username" 
                  :rules="rules.username"
                  label="Username"
                  required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.city" label="City"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field v-model="editedItem.address.streetAddress" label="Address"></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
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
            disabled: false,
            href: 'breadcrumbs_dashboard'
          },
          {
            text: 'Link 1',
            disabled: false,
            href: 'breadcrumbs_link_1'
          },
          {
            text: 'Link 2',
            disabled: true,
            href: 'breadcrumbs_link_2'
          }
        ],
        // =================

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
          { text: 'Name', align: 'left', value: 0 },
          { text: 'Username', value: 1 },
          { text: 'Email', value: 2 },
          { text: 'Phone', value: 3 },
          { text: 'City', value: 4 },
          { text: 'Address', value: 5, width: '10%' },
          { text: 'Actions', value: 6, sortable: false }
        ],
        // =================

        editedIndex: -1,
        editedItem: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          phone: '',
          city: '',
          address: ''
        },
        defaultItem: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          phone: '',
          city: '',
          address: ''
        },
        
        // Form Rules
        valid: false,
        rules: {
          username: [
            v => !!v || 'Username is required',
            v => (v.length >= 4) || 'Username must have at least 4 letters.'
          ],
          email: [
            v => !!v || 'Email is required',
            v => (v.length >= 4) || 'Must be between 10 and 50'
          ]
        }
        // =================
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
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      }
    },
    mounted () {
      
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { 
            sortBy: sort, 
            descending, 
            page, 
            rowsPerPage: length } = this.pagination,
            start = (page - 1) * length,
            order = descending ? 'desc' : 'asc',
            filter = this.search;

          const paginate = {
            sort: sort,
            order: order,
            page: page,
            limit: length,
            filter: filter
          }

          // const paginate = {
          //   "datatable": {
          //       "columns": [{
          //         "data": "name",
          //         "name": "",
          //         "searchable": true,
          //         "orderable": true,
          //         "search": {
          //           "value": "",
          //           "regex": false
          //         }
          //       }],
          //       "order": [{
          //         "column": sort,
          //         "dir": order
          //       }],
          //       "start": start,
          //       "length": length,
          //       "search": {
          //         "value": filter,
          //         "regex": false
          //       }
          //     }
          //   }

          let items = null,
              total = 200
          getUsers(paginate).then((response) => {
            this.loading = false
            resolve({
              items: response.data,
              total: total
            })
          })

          // Dummy
          // setTimeout(() => {
          //   this.loading = false
          //   resolve({
          //     items,
          //     total: 10
          //   })
          // }, 1000)
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
          this.getDataFromApi().then(data => {
            this.tableItems = data.items
            this.totalItems = data.total
            console.log(this.tableItems)
          })
          this.close()
        }
      }
    }
  }
</script>