var Tree = function(value){
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];
  newTree.parent = null;
  extend(newTree, treeMethods);

  return newTree;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var treeMethods = {};

treeMethods.addChild = function(value){
// Constant time
  var child = Tree(value);
  child.parent = this;
  this.children.push(child);
};

treeMethods.contains = function(target){
// Linear time
  var found = false;

  var searchTree = function(node) {
    if (node.value === target) {
      found = true;
      return;
    }
    for (var i = 0; i < node.children.length; i++) {
      searchTree(node.children[i]);
    }
  };

  searchTree(this);

  return found;
};

treeMethods.removeFromParent = function() {
  var parent = this.parent;
  for (var i = 0; i < parent.children.length; i++){
    if (parent.children[i] === this) {
      parent.children.splice(i, 1);
    }
  }
  return this;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
