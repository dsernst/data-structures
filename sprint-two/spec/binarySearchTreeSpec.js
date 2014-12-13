describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a("function");
    expect(binarySearchTree.contains).to.be.a("function");
    expect(binarySearchTree.depthFirstLog).to.be.a("function");
  });

  it('should insert values at the correct location in the tree', function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function(){
    var array = [];
    var func = function(node){ array.push(node.value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5,2,3]);
  });

  it('has a .breadthFirstLog() method, invokes a callback on the tree\'s nodes using a breadth-first approach.', function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(1);
    binarySearchTree.insert(6);
    binarySearchTree.insert(7);
    binarySearchTree.insert(8);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5,2,6,1,3,7,8]);
  });

  it('has a getBalance function that returns ratio of maxDepth to minDepth', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(1);
    binarySearchTree.insert(3);
    binarySearchTree.insert(4);
    binarySearchTree.insert(8);
    binarySearchTree.insert(12);
    binarySearchTree.insert(22);
    binarySearchTree.insert(67);
    binarySearchTree.insert(7);
    binarySearchTree.insert(11);
    binarySearchTree.insert(6);
    expect(binarySearchTree.getBalance()).to.equal(5 / 3);
  });

  it('rebalance as soon as the max depth is more than twice the minimum depth', function() {
    binarySearchTree.insert(1);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(4);
    binarySearchTree.insert(8);
    binarySearchTree.insert(12);
    binarySearchTree.insert(22);
    binarySearchTree.insert(67);
    binarySearchTree.insert(100);
    binarySearchTree.insert(7);
    binarySearchTree.insert(11);
    binarySearchTree.insert(124);
    binarySearchTree.insert(6);
    binarySearchTree.insert(1243);
    expect(binarySearchTree.getBalance()).to.be.below(2);
  });
});
