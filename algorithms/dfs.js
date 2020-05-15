function dfs(grid, x, y, fr, fc, visitedInOrder) {
  // check for boundary conditions
  if (
    x >= 0 &&
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length &&
    grid[x][y].isVisited == false &&
    grid[x][y].isWall == false
  ) {
    const currNode = grid[x][y];
    currNode.isVisited = true;
    visitedInOrder.push(currNode);
    if (x == fr && y == fc) {
      // if the finish node is reached, return
      return true;
    }
    // try paths up, down, left and right
    if (
      dfs(grid, x - 1, y, fr, fc, visitedInOrder) ||
      dfs(grid, x + 1, y, fr, fc, visitedInOrder) ||
      dfs(grid, x, y - 1, fr, fc, visitedInOrder) ||
      dfs(grid, x, y + 1, fr, fc, visitedInOrder)
    ) {
      return true;
    } else {
      // backtracking part : if no path is found at a node, remove it from the solution path
      grid[x][y].isVisited = true;
      visitedInOrder.pop();
      return false;
    }
  } else {
    // no path found
    return false;
  }
}
// find the visited nodes
export function findDfsPath(
  grid,
  start_node_row,
  start_node_col,
  finish_node_row,
  finish_node_col
) {
  const visitedInOrder = [];
  dfs(
    grid,
    start_node_row,
    start_node_col,
    finish_node_row,
    finish_node_col,
    visitedInOrder
  );
  return visitedInOrder;
}
