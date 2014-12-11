

var Graph = function(){
  this.nodes = {};
};

Graph.prototype.addNode = function(node){
// Constant time
  this.nodes[node] = {};
};

Graph.prototype.contains = function(node){
// O(1)
  return this.nodes.hasOwnProperty(node);
};

Graph.prototype.removeNode = function(node){
// O(n) where n is the count of node's edges
  for (var edge in this.nodes[node]) {
    delete this.nodes[edge][node];
  }
  delete this.nodes[node];
};

Graph.prototype.hasEdge = function(fromNode, toNode){
// O(1)
  return this.nodes[fromNode].hasOwnProperty(toNode);
};

Graph.prototype.addEdge = function(fromNode, toNode){
// O(1)
  this.nodes[fromNode][toNode] = toNode;
  this.nodes[toNode][fromNode] = fromNode;
};

Graph.prototype.removeEdge = function(fromNode, toNode){
// O(1)
  delete this.nodes[fromNode][toNode];
  delete this.nodes[toNode][fromNode];
};

Graph.prototype.forEachNode = function(cb){
// O(n)
  for (var node in this.nodes) {
    cb(node, this.nodes);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */



