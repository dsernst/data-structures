var BTree = function (order) {
  this.order = order;
  this.values = [];
  this.children = [];
};

BTree.prototype.insert = function (value) {
  if ( this.canInsert() ) {
    this.values.push(value);
    this.sortNode();
  }
  // else
    // find child to push to
    // insert.call(this.child[found], value);

};

BTree.prototype.isLeaf = function () {
  return this.children.length === 0;
};

BTree.prototype.sortNode = function() {
  this.values.sort(function(a,b) {return a - b;})
};

BTree.prototype.canInsert = function () {
  return this.values.length < this.order;
};
