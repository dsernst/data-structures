var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
  // Constant time O(3)
    var node = Node(value);
    if (list.head === null) {
      list.head = node;
    } else {
      list.tail.next = node;
    }
    list.tail = node;
  };

  list.removeHead = function(){
  // Constant time O(3)
    var oldHead = list.head;
    list.head = oldHead.next;
    // Maybe delete the old head node object?
    return oldHead.value;
  };

  list.contains = function(target){
  // Linear time O(n)
    var found = false;
    var position = list.head;
    while (!found && position !== null) {
      if (position.value === target) {
        found = true;
      }
      position = position.next;
    }
    return found;
  };

  return list;
};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
