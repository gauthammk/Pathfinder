<template>
  <v-app>
    <v-container fluid class="text-center main-workspace white--text">
      <h1 class="main-heading">Pathfinder</h1>
      <Grid />
      <Legend />
    </v-container>
  </v-app>
</template>

<script>
import Grid from "./components/Grid";
import Legend from "./components/Legend";

export default {
  name: "App",
  components: {
    Grid,
    Legend
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.main-workspace {
  background-color: black !important;
}
.main-heading {
  font-family: "Press Start 2P";
  font-size: 40px;
}
</style>

