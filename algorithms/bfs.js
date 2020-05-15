function bfs(grid, startNode, finishNode, visitedInOrder) {
  const queue = [];
  visitedInOrder.push(startNode);
  queue.push(startNode);
  // if the start node and finish node are the same, return immidiately
  if (startNode == finishNode) {
    return true;
  }
  while (queue.length > 0) {
    const currNode = queue.shift();
    const unvisitedNeighbors = getNeighbors(grid, currNode);
    for (const neighbor of unvisitedNeighbors) {
      if (!visitedInOrder.includes(neighbor) && !neighbor.isWall) {
        neighbor.previousNode = currNode;
        neighbor.isVisited = true;
        visitedInOrder.push(neighbor);
        if (neighbor == finishNode) {
          // if finish node is reached, return
          return true;
        }
        queue.push(neighbor);
      }
    }
  }
  // no path found
  return false;
}
// find neighbors for each node i.e up, down, left and right
function getNeighbors(grid, node) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}
// find the bfs path
export function findBfsPath(grid, startNode, finishNode) {
  const visitedInOrder = [];
  bfs(grid, startNode, finishNode, visitedInOrder);
  startNode.previousNode = null;
  return visitedInOrder;
}
// backtracks from the finishNode to find the shortest path.
export function findShortestBfsPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
