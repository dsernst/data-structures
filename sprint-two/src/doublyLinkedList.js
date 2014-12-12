var DoublyLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
  // Constant time O(1)
    var node = Node(value);
    if (list.head === null) {
      list.head = node;
    } else {
      list.tail.next = node;
    }
    node.previous = list.tail;
    list.tail = node;
  };

  list.addToHead = function(value) {
    var node = Node(value);
    if (list.head === null) {
      list.head = node;
    } else {
      list.head.previous = node;
    }
    node.next = list.head;
    list.head = node;
  };

  list.removeHead = function(){
  // Constant time O(1)
    var oldHead = list.head;
    list.head.previous = null;
    list.head = oldHead.next;
    return oldHead.value;
  };

  list.removeTail = function() {
    var oldTail = list.tail;
    list.tail.next = null;
    list.tail = oldTail.previous;
    return oldTail.value;
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
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
