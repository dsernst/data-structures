var BTree = function (order) {
  this.order = order;
  this.values = [];
  this.children = [];
};

BTree.prototype.insert = function (value) {
  var destination = this.pickChild(value);
  if (typeof destination === "number") {
    this.insert.call(this.children[destination], value);
  } else {
    this.values.push(value);
    this.sortNode();
    if (this.isOverloaded()) {
      this.split();
    }
  }
};

BTree.prototype.sortNode = function () {
  this.values.sort(function (a, b) {return a - b; });
};

BTree.prototype.isOverloaded = function () {
  return this.values.length === this.order;
};

BTree.prototype.split = function () {
  var leftSplit = new BTree(this.order);
  var rightSplit = new BTree(this.order);

  leftSplit.values = this.values.splice(0, Math.ceil(this.values.length / 2) - 1);
  var median = this.values.splice(0, 1)[0];
  rightSplit.values = this.values.splice(0);

  for (var i = 0; i < this.children.length; i++) {
    if (i + 1 <= this.children.length / 2) {
      this.children[i].parent = leftSplit;
    } else {
      this.children[i].parent = rightSplit;
    }
  }
  leftSplit.children = this.children.splice(0, this.children.length / 2); //TODO
  rightSplit.children = this.children.splice(0);

  if (this.parent) {
    var parent = this.parent;
    leftSplit.parent = parent;
    rightSplit.parent = parent;
    var destination = parent.pickChild(leftSplit.values[0]);
    parent.children.splice(destination, 1, leftSplit, rightSplit);
    parent.insert(median);
  } else {
    this.values[0] = median;
    this.children = [leftSplit, rightSplit];
    leftSplit.parent = this;
    rightSplit.parent = this;
  }
};

BTree.prototype.pickChild = function (value) {
  var hasOpenSlots = ((this.children.length - 1) - this.values.length) > 0;
  if (this.children.length !== 0 && !hasOpenSlots) {
    for (var destination = 0; destination < this.values.length; destination++) {
      if (value < this.values[destination]) {
        break;
      }
    }
    return destination;
  }
  return null;
};

BTree.prototype.contains = function (value) {
  var found = false;
  this.traverse(function (node) {
    for (var i = 0; i < node.values.length; i++){
      found = found || value === node.values[i];
    }
  });
  return found;
}

BTree.prototype.traverse = function (callback) {
  callback(this);
  for (var i = 0; i < this.children.length; i++) {
    this.traverse.call(this.children[i], callback);
  }
};

BTree.prototype.print = function () {
  var results = [];
  this.traverse(function (node) {
    results.push(node.values);
  });
  return JSON.stringify(results);
};

BTree.prototype.multiInsert = function() {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this.insert(args[i]);
  }
};

BTree.prototype.printParents = function () {
  var parents = [];
  this.traverse(function (node) {
    parents.push(node.parent.values);
  });
  return JSON.stringify(parents);
};
