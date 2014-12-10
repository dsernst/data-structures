var Queue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value){
    var back = someInstance.size();
    storage[back] = value;
  };

  someInstance.dequeue = function(){
    var value = storage[0];
    for (var i = 1; i < someInstance.size(); i++) {
      storage[i-1] = storage[i];
    }
    delete storage[someInstance.size() -1 ];
    return value;
  };

  someInstance.size = function(){
    return Object.keys(storage).length;
  };

  return someInstance;
};
