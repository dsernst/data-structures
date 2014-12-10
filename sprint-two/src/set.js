var Set = function(){
  var set = Object.create(setPrototype);
  set._storage = undefined;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
};

setPrototype.contains = function(item){
};

setPrototype.remove = function(item){
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
