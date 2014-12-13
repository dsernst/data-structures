var BTree = function (order) {
  this.order = order;
  this.values = [];
  this.children = [];
};

BTree.prototype.insert = function (value) {
  var slots = this.children.length - 1; // TODO do we need Math.min() to take into account order?
  var destination = this.pickChild(value);
  if (slots - this.values.length > 0) {
    destination = null;
  }
  if ( destination !== null ) {
    this.insert.call(this.children[destination], value);
  } else {
    this.values.push(value);
    this.sortNode();
    if (this.isOverloaded()) {
      this.split();
    }
  }

};

BTree.prototype.sortNode = function() {
  this.values.sort(function(a,b) {return a - b;})
};

BTree.prototype.isOverloaded = function () {
  return this.values.length === this.order;
};

BTree.prototype.split = function () {
  var leftSplit = new BTree(this.order);
  var rightSplit = new BTree(this.order);

  leftSplit.values = this.values.splice(0,1);
  var middle = this.values.splice(0,1)[0];
  rightSplit.values = this.values.splice(0,1);

  for (var i = 0; i < this.children.length; i++) {
    if (i <= this.children.length / 2) {
      this.children[i].parent = leftSplit;
    } else {
      this.children[i].parent = rightSplit;
    }
  }
  leftSplit.children = this.children.splice(0, this.children.length/2);
  rightSplit.children = this.children.splice(0)

  if (this.parent) {
    var parent = this.parent;
    leftSplit.parent = parent;
    rightSplit.parent = parent;
    var destination = parent.pickChild(leftSplit.values[0]);
    parent.children.splice(destination, 1, leftSplit, rightSplit);
    parent.insert(middle);
  } else {
    this.values[0] = middle;
    this.children = [leftSplit, rightSplit]
    leftSplit.parent = this;
    rightSplit.parent = this;
  }
};

BTree.prototype.pickChild = function (value) {
  if (this.children.length !== 0) {
    for (var destination = 0; destination < this.values.length; destination++) {
      if (value < this.values[destination]) {
        break;
      }
    }
    return destination;
  }
  return null;
};

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
