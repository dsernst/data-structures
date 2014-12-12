describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree('root');
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function() {
    expect(tree.addChild).to.be.a("function");
    expect(tree.contains).to.be.a("function");
    expect(tree.hasOwnProperty("value")).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function(){
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function(){
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('A .parent property, which refers to the parent node or null when there is no node', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.parent).to.equal(null);
    expect(tree.children[0].children[0].parent.value).to.equal(5);
  });

  it('A .removeFromParent() method, which disassociates the tree with its parent (in both directions)', function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.children[1].removeFromParent();
    expect(tree.children.length).to.equal(1);
  });

  it('Implement a .traverse() method on your tree, that executes a callback on every value', function () {
    tree.addChild(5);
    tree.addChild(6);
    tree.addChild(7);
    tree.children[0].addChild(10);
    tree.children[0].children[0].addChild(false);
    tree.children[0].children[0].addChild('monkey');
    tree.children[1].addChild(8);
    tree.children[1].addChild(9);

    var log = [];
    var pushToLog = function (value) { log.push(value); };
    tree.traverse(pushToLog);

    expect(log.length).to.equal(9);
    expect(log).to.eql( ["root", 5, 10, false, "monkey", 6, 8, 9, 7] );
  });

});
