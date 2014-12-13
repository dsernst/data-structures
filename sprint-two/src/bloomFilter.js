var sh1 = function(str){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash;
};

var BloomFilter = function (m, k) {
  this._m = m;
  this._k = k;
  this._filter = Array.apply(null, new Array(m)).map(Number.prototype.valueOf,0);
};

BloomFilter.prototype.getIndices = function (str) {
  var hashes = [];
  var indices = [];
  hashes.push(sh1(str));
  for (var i = 0; i < this._k - 1; i ++) {
    hashes.push( sh1( hashes[i].toString() ) );
  }
  for (var i = 0; i < hashes.length; i++) {
    indices.push(hashes[i] % this._m);
  }
  return indices;
}

BloomFilter.prototype.insert = function (str) {
  var indices = this.getIndices(str);
  for (var i = 0; i < indices.length; i++) {
    this._filter[indices[i]] = 1;
  }
}

BloomFilter.prototype.predict = function (str) {
  var indices = this.getIndices(str);
  var isPresent = true;
  for (var i = 0; i < indices.length; i++) {
    isPresent = isPresent && this._filter[indices[i]];
  }
  return !!isPresent;
}

BloomFilter.prototype.print = function () {
  var output = '';
  for (var i = 0; i < this._filter.length; i++) {
    output += '' + this._filter[i];
  }
  console.log(output);
}
