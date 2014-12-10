var Stack = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value){
    var top = someInstance.size();
    storage[top] = value;
  };

  someInstance.pop = function(){
    var top = someInstance.size() - 1;
    var value = storage[top];
    delete storage[top];
    return value;
  };

  someInstance.size = function(){
    //count the number of keys in storage obj
    return Object.keys(storage).length;
  };

  return someInstance;
};
