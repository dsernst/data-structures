var HashTable = function(){
  this._limit = 8;
  this._filled = 0;
  this._doubleThreshold = 0.75;
  this._halveThreshold = 0.25;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
// O(n) where n = k.length, or checkSize();
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[i] === undefined) {
    this._storage[i] = {};
  }
  if (this._storage[i][k] !== v) {
    this._storage[i][k] = v;
    this._filled++;
    this.checkSize();
  }
};

HashTable.prototype.retrieve = function(k){
// O(1)
  var i = getIndexBelowMaxForKey(k, this._limit);
  return this._storage[i][k];
};

HashTable.prototype.remove = function(k){
// O(n) where n = k.length, or checkSize();
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[i][k] !== undefined && this._storage[i][k] !== null) {
    this._storage[i][k] = null;
    this._filled--;
    this.checkSize();
  }
};

HashTable.prototype.checkSize = function () {
// O(1), or rehash();
  if (this._filled / this._limit > this._doubleThreshold) {
    this.rehash(2);
  } else if (this._limit > 8 && this._filled / this._limit < this._halveThreshold) {
    this.rehash(.5);
  }
};

HashTable.prototype.rehash = function (multiple) {
// O(n*k), where n = stored items, k = item.length
  var newLimit = this._limit * multiple;
  var newStorage = LimitedArray(newLimit);
  for (index in this._storage) {
    if (typeof this._storage[index] === "object") {
      for (key in this._storage[index]) {
        var i = getIndexBelowMaxForKey(key, newLimit);
        if (newStorage[i] === undefined) {
         newStorage[i] = {};
        }
        newStorage[i][key] = this._storage[index][key];
      }
    }
  }
  this._storage = newStorage;
  this._limit = newLimit;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
