var BinarySearchTree = function(value){

  var thisTree = {};

  thisTree.value = value;
  thisTree.left = null;
  thisTree.right = null;

  extend(thisTree, BinarySearchTreeMethods);

  return thisTree;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var BinarySearchTreeMethods = {
  insert: function (value) {
  // O(log(n))
    this.traverse(value);
  },
  traverse: function (value) {
    if (value === this.value) {
      return this;
    }
    var child = (value > this.value) ? 'right' : 'left';
    if (this[child] === null) {
      this[child] = BinarySearchTree(value);
      return;
    }
    return this.traverse.call(this[child], value);
  },
  contains: function (target) {
  // O(log(n))
    return !!this.traverse(target);
  },
  depthFirstLog: function (callback) {
  // O(n)
    callback(this.value);
    if (this.right !== null) {
      this.depthFirstLog.call(this.right, callback);
    }
    if (this.left !== null) {
      this.depthFirstLog.call(this.left, callback);
    }
  }
}

/*
 * Complexity: What is the time complexity of the above functions?
 */
