<template>
  <v-container>
    <v-container id="menu">
      <v-btn
        :disabled="!isIdle"
        rounded
        small
        color="grey"
        @click="visualizeDijkstra"
        class="ma-1 white--text"
      >Visulize Dijkstra</v-btn>
      <v-btn
        :disabled="!isIdle"
        rounded
        small
        color="grey"
        @click="visualizeDfs"
        class="ma-1 white--text"
      >Visulize DFS</v-btn>
      <v-btn
        :disabled="!isIdle"
        rounded
        small
        color="grey"
        @click="visualizeBfs"
        class="ma-1 white--text"
      >Visualise BFS</v-btn>
      <v-btn :disabled="!isIdle" @click="resetGrid" class="ma-1" fab small>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-container>
    <v-container id="main-grid" class="mx-auto align-items-center">
      <!-- iterate through the grid and create nodes for every grid element -->
      <v-row class="grid-row mx-auto" v-for="(rows, r) in grid.length" :key="r">
        <v-col class="grid-col" v-for="(cols, c) in grid.length" :key="c">
          <Node
            v-bind:gridNode="grid[r][c]"
            v-on:mouse-down-event="handleMousedown"
            v-on:mouse-up-event="handleMouseup"
            v-on:mouse-enter-event="handleMouseenter"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Node from "./Node";
import { dijkstra, findDijkstraPath } from "../../algorithms/dijkstra";
import { findDfsPath } from "../../algorithms/dfs";
import { findBfsPath, findShortestBfsPath } from "../../algorithms/bfs";

export default {
  name: "Grid",
  components: {
    Node
  },
  data: () => ({
    // main state vairables used by the program
    grid: [],
    max_rows: 20,
    max_columns: 20,
    start_node_row: 14,
    start_node_col: 5,
    finish_node_row: 2,
    finish_node_col: 15,
    mouseIsPressed: false,
    isIdle: true,
    isStartNodeIdle: true,
    isFinishNodeIdle: true,
    isWallBeingCreated: false
  }),
  created: function() {
    // create the grid once the screen loads
    this.grid = this.createGrid();
  },
  methods: {
    // create an initial grid with start and finish nodes
    createGrid() {
      const newGrid = [];
      for (let row = 0; row < this.max_rows; row++) {
        const currRow = [];
        for (let col = 0; col < this.max_columns; col++) {
          const currNode = this.createNode(row, col);
          currRow.push(currNode);
        }
        newGrid.push(currRow);
      }
      return newGrid;
    },
    // return a node object with the required properties
    createNode(row, col) {
      return {
        row,
        col,
        isStart: row === this.start_node_row && col === this.start_node_col,
        isFinish: row === this.finish_node_row && col === this.finish_node_col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isPath: false,
        previousNode: null
      };
    },
    // reset the grid to the initial state and remove walls
    resetGrid() {
      this.grid = this.createGrid();
    },
    // animate all visited nodes(blue color)
    animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            this.animateSolutionPath(nodesInShortestPathOrder);
          }, 70 * i);
        } else {
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const newGrid = this.grid.slice();
            const newNode = {
              ...node,
              isVisited: true
            };
            newGrid[node.row][node.col] = newNode;
            this.grid = newGrid;
          }, 70 * i);
        }
      }
    },
    // animate solution path(yellow color)
    animateSolutionPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(() => {
            this.isIdle = true;
          }, 70 * i);
        }
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const newGrid = this.grid.slice();
          const newNode = {
            ...node,
            isPath: true
          };
          newGrid[node.row][node.col] = newNode;
          this.grid = newGrid;
        }, 70 * i);
      }
    },
    // implement dijkstra's algorithm using the imported function
    visualizeDijkstra() {
      // set isIdle as false to disable buttons
      this.isIdle = false;
      const tempGrid = this.cloneMainGrid();
      const startNode = tempGrid[this.start_node_row][this.start_node_col];
      const finishNode = tempGrid[this.finish_node_row][this.finish_node_col];
      const visitedNodesInOrder = dijkstra(tempGrid, startNode, finishNode);
      const nodesInShortestPathOrder = findDijkstraPath(finishNode);
      if (visitedNodesInOrder.length > 0) {
        this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
      } else {
        // show the menu if the path is not found
        this.isIdle = true;
      }
    },
    // implement dfs algorithm using the imported function
    visualizeDfs() {
      this.isIdle = false;
      const clonedGrid = this.cloneMainGrid();
      const visitedNodesInOrder = findDfsPath(
        clonedGrid,
        this.start_node_row,
        this.start_node_col,
        this.finish_node_row,
        this.finish_node_col
      );
      if (visitedNodesInOrder.length > 0) {
        this.animateVisitedNodes(visitedNodesInOrder, visitedNodesInOrder);
      } else {
        this.isIdle = true;
      }
    },
    // implement bfs algorithm using the imported function
    visualizeBfs() {
      this.isIdle = false;
      const clonedGrid = this.cloneMainGrid();
      const startNode = clonedGrid[this.start_node_row][this.start_node_col];
      const finishNode = clonedGrid[this.finish_node_row][this.finish_node_col];
      const visitedNodesInOrder = findBfsPath(
        clonedGrid,
        startNode,
        finishNode
      );
      const nodesInShortestPathOrder = findShortestBfsPath(finishNode);
      if (visitedNodesInOrder.length > 0) {
        this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
      } else {
        this.isIdle = true;
      }
    },
    handleMousedown(row, col) {
      if (row === this.start_node_row && col === this.start_node_col) {
        // start node is being moved
        this.isStartNodeIdle = false;
      } else if (row === this.finish_node_row && col === this.finish_node_col) {
        // finish node is being moved
        this.isFinishNodeIdle = false;
      } else {
        // wall is being created
        this.isWallBeingCreated = true;
        this.grid = this.createNewGridWithWallToggled(row, col);
      }
      // set this boolean so that only drags are counted in handleMouseenter
      this.mouseIsPressed = true;
    },
    handleMouseup(row, col) {
      if (!this.isStartNodeIdle) {
        // start node moved to row, col
        this.start_node_row = row;
        this.start_node_col = col;
        this.grid = this.createGrid();
        this.isStartNodeIdle = true;
      } else if (!this.isFinishNodeIdle) {
        // finish node moved to row, col
        this.finish_node_row = row;
        this.finish_node_col = col;
        this.grid = this.createGrid();
        this.isFinishNodeIdle = true;
      } else {
        // wall creation stopped
        this.isWallBeingCreated = false;
      }
      // stop wall toggling
      this.mouseIsPressed = false;
    },
    handleMouseenter(row, col) {
      if (!this.mouseIsPressed) return;
      // do not create a wall over the start or finish node
      if (
        (row == this.start_node_row && col == this.start_node_col) ||
        (row == this.finish_node_row && col == this.finish_node_col)
      ) {
        return;
      }
      if (this.isWallBeingCreated) {
        // continuosuly toggle a wall
        this.grid = this.createNewGridWithWallToggled(row, col);
      }
    },
    // add wall nodes in the grid
    createNewGridWithWallToggled(row, col) {
      const newGrid = this.grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: !node.isWall
      };
      newGrid[row][col] = newNode;
      return newGrid;
    },
    // create a clone of the grid from the state
    cloneMainGrid() {
      const gridClone = [];

      for (var row of this.grid) {
        const currRow = [];
        for (var node of row) {
          const newNode = {
            ...node
          };
          currRow.push(newNode);
        }
        gridClone.push(currRow);
      }
      return gridClone;
    }
  }
};
</script>

<style>
.grid-row {
  padding: 0px !important;
  margin: 0px !important;
  flex: none !important;
  flex-wrap: unset !important;
  height: 25px;
  width: 500px;
  display: inline-block;
}
.grid-col {
  padding: 0px !important;
  margin: 0px !important;
  max-width: 50% !important;
  flex-grow: unset !important;
  display: inline-block;
}
</style>
