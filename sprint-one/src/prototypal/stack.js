var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  var stackInstance = Object.create(stackMethods);
  stackInstance.storage = {};

  return stackInstance;
};

var stackMethods = {
  push: function (value) {
    var top = this.size();
    this.storage[top] = value;
  },
  pop: function () {
    var top = this.size() - 1;
    var value = this.storage[top];
    delete this.storage[top];
    return value;
  },
  size: function () {
    return Object.keys(this.storage).length;
  }
};


