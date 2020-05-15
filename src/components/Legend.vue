<template>
  <v-container class="col-lg-8 col-xs-8 mx-auto text-center" align-center justify-center>
    <v-row>
      <v-col>
        <h3>Legend</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="node"></div>
        <div class="legend-text">Node</div>
      </v-col>
      <v-col>
        <div class="node node-start"></div>
        <div class="legend-text">Start Node</div>
      </v-col>
      <v-col>
        <div class="node node-finish"></div>
        <div class="legend-text">Finish Node</div>
      </v-col>
      <v-col>
        <div class="node node-wall"></div>
        <div class="legend-text">Wall Node</div>
      </v-col>
      <v-col>
        <div class="node node-visited"></div>
        <div class="legend-text">Visited Node</div>
      </v-col>
      <v-col>
        <div class="node node-path"></div>
        <div class="legend-text">Solution Path Node</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Click and drag to move the start and finish nodes</h3>
        <h3>Drag across the grid to create walls</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Legend"
};
</script>

<style>
.legend-text {
  height: 25px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>