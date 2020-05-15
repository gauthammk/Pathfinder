<template>
  <div
    class="node"
    v-bind:class="{
      'node-start': gridNode.isStart,
      'node-finish': gridNode.isFinish,
      'node-visited': gridNode.isVisited,
      'node-wall': gridNode.isWall,
      'node-path': gridNode.isPath,
    }"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseenter="mouseenter"
  ></div>
</template>

<script>
export default {
  name: "Node",
  props: ["gridNode"],
  methods: {
    mousedown() {
      this.$emit("mouse-down-event", this.gridNode.row, this.gridNode.col);
    },
    mouseup() {
      this.$emit("mouse-up-event", this.gridNode.row, this.gridNode.col);
    },
    mouseenter() {
      this.$emit("mouse-enter-event", this.gridNode.row, this.gridNode.col);
    }
  }
};
</script>

<style>
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(0.99, 0.99);
  }
}
.node {
  width: 25px;
  height: 25px;
  outline: 1px solid grey;
  display: inline-block;
}
.node-start {
  background-color: green;
  animation: zoominoutsinglefeatured 0.2s forwards;
}
.node-finish {
  background-color: red;
  animation: zoominoutsinglefeatured 0.2s forwards;
}
.node-visited {
  background-color: blue;
  animation: zoominoutsinglefeatured 0.2s forwards;
}
.node-wall {
  background-color: rgb(167, 167, 167);
  animation: zoominoutsinglefeatured 0.2s forwards;
}
.node-path {
  background-color: yellow;
  animation: zoominoutsinglefeatured 0.2s forwards;
}
</style>
