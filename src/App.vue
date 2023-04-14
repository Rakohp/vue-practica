<style>
.container {
  max-width: 100%
}
</style>
<template>
  <v-app>
    <v-app-bar app color="orange" dense dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="30" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="80"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="80" />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-4">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <HelloWorld/> -->
      <personas-component />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import PersonasComponent from './components/Personas';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    PersonasComponent
  },

  data: () => ({
    //
  }),
};
</script>
