var Stack = function() {
  this.storage = {};
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
};

Stack.prototype.push = function (value) {
  var top = this.size();
  this.storage[top] = value;
};

Stack.prototype.pop = function () {
  var top = this.size() - 1;
  var value = this.storage[top];
  delete this.storage[top];
  return value;
};

Stack.prototype.size = function () {
  return Object.keys(this.storage).length;
};
