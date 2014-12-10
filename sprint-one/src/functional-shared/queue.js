var Queue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  var queueInstance = {};
  queueInstance.storage = {};
  _.extend(queueInstance, queueMethods);

  return queueInstance;
};

var queueMethods = {
  enqueue: function (value) {
    var back = this.size();
    this.storage[back] = value;
  },
  dequeue: function () {
    var value = this.storage[0];
    for (var i = 1; i < this.size(); i++) {
      this.storage[i-1] = this.storage[i];
    }
    delete this.storage[this.size() - 1];
    return value;
  },
  size: function () {
    return Object.keys(this.storage).length;
  }
};



