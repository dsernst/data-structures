var PrefixTree = function(keypress){
  var newTree = Object.create(prefixTreeMethods);
  newTree.key = keypress;
  newTree.children = [];
  newTree.parent = null;
  return newTree;
};

prefixTreeMethods.addChild = function(value){
// Constant time
  var child = Tree(value);
  child.parent = this;
  this.children.push(child);
};

prefixTreeMethods.contains = function(target){
// Linear time
  var found = false;
  var searchTree = function(node) {
    if (node.value === target) {
      found = true;
      return;
    }
    for (var i = 0; i < node.children.length; i++) {
      searchTree(node.children[i]);
    }
  };
  searchTree(this);
  return found;
};

prefixTreeMethods.traverse = function (callback) {
  callback(this.value);
  for (var i = 0; i < this.children.length; i++) {
    this.traverse.call(this.children[i], callback);
  }
};

prefixTreeMethods.press = function (key) {
  this.addChild(key);
};

prefixTreeMethods.buildWords = function () {
  this.traverse(checkDictionary)
}

var processDictionary = function (CSVfile, charsToProcess) {
  // loops through supplied dictionary file
    // at each word, convert into T9 Encoding
    // push word to array of possible strings for that keycode in Language array of array.
  // saves file to stringified JSON for later lookup.
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
