describe('graph', function() {
  var graph;

  beforeEach(function() {
    graph = new Graph();
  });

  it('should have methods named "addNode", "contains", "removeNode", "addEdge", "hasEdge", "removeEdge" and "forEachNode"', function() {
    expect(graph.addNode).to.be.a("function");
    expect(graph.contains).to.be.a("function");
    expect(graph.removeNode).to.be.a("function");
    expect(graph.hasEdge).to.be.a("function");
    expect(graph.addEdge).to.be.a("function");
    expect(graph.removeEdge).to.be.a("function");
    expect(graph.forEachNode).to.be.a("function");
  });

  it('should store values as nodes that were inserted', function() {
    graph.addNode('kittens');
    expect(graph.contains('kittens')).to.equal(true);
  });

  it('should remove nodes that were inserted', function() {
    graph.addNode('puppies');
    expect(graph.contains('puppies')).to.equal(true);
    graph.removeNode('puppies');
    expect(graph.contains('puppies')).to.equal(false);
  });

  it('should create edges between two nodes', function() {
    graph.addNode('puppies');
    graph.addNode('kittens');
    graph.addNode('penguins');
    graph.addEdge('penguins', 'puppies');
    expect(graph.hasEdge('penguins', 'puppies')).to.equal(true);
    expect(graph.hasEdge('penguins', 'kittens')).to.equal(false);
  });

  it('should remove edges between nodes', function() {
    graph.addNode('apples');
    graph.addNode('satsumas');
    graph.addEdge('satsumas', 'apples');
    expect(graph.hasEdge('apples', 'satsumas')).to.equal(true);
  });

  it('should execute a callback on each node in the graph', function() {
    var connectToSatsumas = function(item) {
      graph.addEdge(item, 'satsumas');
    };
    graph.addNode('satsumas');
    graph.addNode('puppies');
    graph.addNode('kittens');
    graph.addNode('penguins');
    graph.forEachNode(connectToSatsumas);
    expect(graph.hasEdge('puppies', 'satsumas')).to.equal(true);
    expect(graph.hasEdge('kittens', 'satsumas')).to.equal(true);
    expect(graph.hasEdge('penguins', 'satsumas')).to.equal(true);
    expect(graph.hasEdge('satsumas', 'satsumas')).to.equal(true);
  });
});
