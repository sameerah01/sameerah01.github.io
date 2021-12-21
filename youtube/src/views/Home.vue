<template>
  <v-app id="inspire">
    <v-app-bar
      app
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetube</v-toolbar-title>
    </v-app-bar>

    <v-main class="white lighten-2 pa-5 ">
      <v-container>
        <v-toolbar class="ma-5 pa-2">
          <v-text-field
            v-model="search"
            label="Search....."
            prepend-icon="mdi-magnify"
          ></v-text-field>
        </v-toolbar>

        <v-row>
          <template v-for="item in searchVideo">
            <v-col :key="item.title" cols="5" md="3">
              <v-hover v-slot="{ hover }" open-delay="0">
                <v-card
                  height="270"
                  class="mt-4 pa-1 pb-0"
                  :elevation="hover ? 16 : 2"
                >
                  <v-dialog max-width="800px" max-height="520px">
                    <template v-slot:activator="{ on }">
                      <v-img
                        :src="require(`../assets/${item.img}.jpg`)"
                        height="200"
                        v-on="on"
                      ></v-img>
                      <p class="ma-2 px-2 font-weight-regular">
                        {{ item.title }}
                      </p>
                    </template>
                    <v-card ma-4 pa-5 width="800" height="540">
                      <iframe
                        width="800"
                        height="400"
                        :src="`${item.link}`"
                        allowfullscreen
                      ></iframe>
                      <v-card-actions>
                        <v-flex>
                          <p class="mb-0 font-italic font-weight-light">
                            {{ item.tag }}
                          </p>
                        </v-flex>
                        <v-flex class="text-right">
                          <v-btn type="button" @click="doCopy(item.link)"
                            >Copy!</v-btn
                          >
                        </v-flex>
                      </v-card-actions>
                      <p class="mx-2 px-2 mb-1  font-weight-medium">
                        {{ item.title }}
                      </p>
                      <p class="mx-2 px-2 font-weight-regular">
                        {{ item.description }}
                      </p>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    async getData() {
      const res = await fetch("http://localhost:3000/users/");
      const data = await res.json();
      console.log(data);
      this.$store.commit("SET_ITEMS", data.users);
    },

    doCopy(item) {
      navigator.clipboard.writeText(item);
    },
  },

  created() {
    this.getData();
  },

  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit("update", value);
      },
    },

    items() {
      return this.$store.state.items;
    },

    searchVideo() {
      if (this.$store.state.search == "") {
        return this.items.filter(item => item.tag.match(this.$store.state.search));
      } else {
        return this.items.filter((item) => {
          if (item.tag.match(this.$store.state.search) != null) {
            return item.tag.match(this.$store.state.search);
          } else {
            return item.title
              .toLowerCase()
              .match(this.$store.state.search.toLowerCase());
          }
        });
      }
    },
  },
};
</script>
