var BTree = function (order) {
  this.order = order;
  this.values = [];
  this.children = [];
};

BTree.prototype.insert = function (value) {
  var emptySlots = this.children.length - this.values.length;
  var destination = this.pickChild(value);
  if (emptySlots > 1) {
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
  if (this.parent) {
    var parent = this.parent;
    var destination = parent.pickChild(leftSplit.values[0]);
    parent.children.splice(destination,1);
    parent.children.splice(destination, 0, leftSplit, rightSplit);
    parent.insert(middle);
  } else {
    this.values[0] = middle;
    this.children = [leftSplit, rightSplit]
  // leftSplit.parent = this;
  // rightSplit.parent = this;
  // this.children.push(leftSplit, rightSplit);
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


BTree.prototype.isLeaf = function () {
  return this.children.length === 0;
};
