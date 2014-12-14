var RedBlackTree = function(value){

  var thisTree = Object.create(RedBlackTreeMethods);

  thisTree.value = value;
  thisTree.color = 'red';
  thisTree.left = null;
  thisTree.right = null;
  thisTree.parent = null;

  return thisTree;
};

var RedBlackTreeMethods = {
  insert: function (value) {
  // O(log(n))
    this.traverse(value);
    this.checkBalance();
  },
  traverse: function (value) {
    if (value === this.value) {
      return this;
    }
    var child = (value > this.value) ? 'right' : 'left';
    if (this[child] === null) {

      this[child] = RedBlackTree(value);
      return;
    }
    return this.traverse.call(this[child], value);
  },
  contains: function (target) {
  // O(log(n))
    return !!this.traverse(target);
  },
  depthFirstLog: function (callback, depth) {
  // O(n)
    callback(this, depth);
    if (this.right !== null) {
      this.depthFirstLog.call(this.right, callback, depth + 1);
    }
    if (this.left !== null) {
      this.depthFirstLog.call(this.left, callback, depth + 1);
    }
  },
  breadthFirstLog: function (callback) {
    var nodesQueue = new Queue();
    nodesQueue.enqueue(this);
    var scan = function () {
      var node = nodesQueue.dequeue();
      callback(node.value);
      if (node.left !== null) {
        nodesQueue.enqueue(node.left);
      }
      if (node.right !== null) {
        nodesQueue.enqueue(node.right);
      }
      if (nodesQueue.size() > 0) {
        scan();
      }
    };
    scan();
  },
  getBalance: function () {
    var branchLengths = [];
    var countDepth = function (node, depth) {
      if (node.left === null && node.right === null) {
        branchLengths.push(depth);
      }
    };
    this.depthFirstLog(countDepth, 1);
    var minDepth = Math.min.apply(null, branchLengths);
    var maxDepth = Math.max.apply(null, branchLengths);
    return maxDepth / minDepth;
  },
  checkBalance: function () {
    if (this.getBalance() > 2) {
      this.rebalance();
    }
  },
  rebalance: function () {
    var allValues = [];
    var parseValue = function (node) {
      allValues.push(node.value);
    };
    this.depthFirstLog(parseValue);
    allValues.sort(function(a,b){return a - b;});

    var makeBalancedTree = function (values) {
      if (values.length === 0) {
        return;
      }
      var medianIndex = Math.floor(values.length / 2);
      var leftArr = values.splice(0,medianIndex);
      var root = values.splice(0, 1)[0];
      var rightArr = values.slice(0);
      if (leftArr.length > 0) {
        this.left = RedBlackTree();
      }
      if (rightArr.length > 0) {
        this.right = RedBlackTree();
      }
      this.value = root;
      makeBalancedTree.call(this.left, leftArr);
      makeBalancedTree.call(this.right, rightArr);
    }

    this.left = null;
    this.right = null;

    makeBalancedTree.call(this, allValues);
  }

}

/*
 * Complexity: What is the time complexity of the above functions?
 */
