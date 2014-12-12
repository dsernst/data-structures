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
    this._storage[i] = [];
  }
  if (this.searchBucket(i, k) === undefined) {
    this._storage[i].push([k, v]);
    this._filled++;
    this.checkSize();
  }
};

HashTable.prototype.searchBucket = function (index, key) {
  if (this._storage[index] !== undefined) {
    for (var j = 0; j < this._storage[index].length; j++) {
      if (this._storage[index][j][0] === key) {
        return j;
      }
    }
  }
}

HashTable.prototype.retrieve = function(k){
// O(1)
  var i = getIndexBelowMaxForKey(k, this._limit);
  var j = this.searchBucket(i, k);
  if (j !== undefined) {
    return this._storage[i][j][1];
  } else {
    return null;
  }
};

HashTable.prototype.remove = function(k){
// O(n) where n = k.length, or checkSize();
  var i = getIndexBelowMaxForKey(k, this._limit);
  var j = this.searchBucket(i, k);

  if (j !== undefined) {
    this._storage[i].splice(j, 1);
    this._filled--;
    if (this._storage[i].length === 0) {
      delete this._storage[i];
    }
    this.checkSize();
  }
};

HashTable.prototype.checkSize = function () {
// O(1), or rehash();
  if (this._filled / this._limit > this._doubleThreshold) {
    this.rehash(this._limit * 2);
  } else if (this._limit > 8 && this._filled / this._limit < this._halveThreshold) {
    this.rehash(this._limit * .5);
  }
};

HashTable.prototype.rehash = function (newLimit) {
// O(n*k), where n = stored items, k = item.length
  var newStorage = LimitedArray(newLimit);
  for (index in this._storage) {
    if (typeof this._storage[index] === "object") {
      for (var j = 0; j < this._storage[index].length; j++) {
        var keyVal = this._storage[index][j];
        var i = getIndexBelowMaxForKey(keyVal[0], newLimit);
        if (newStorage[i] === undefined) {
          newStorage[i] = [];
        }
        newStorage[i].push(keyVal);
      }
    }
  }
  this._storage = newStorage;
  this._limit = newLimit;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
