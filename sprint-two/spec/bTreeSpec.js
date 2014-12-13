describe('bTree', function() {
  var b;

  beforeEach(function() {
    b = new BTree(3);
  });

  it('should log stuff, allow inserts, and sort root node', function() {
    b.insert(50);
    expect(b.values[0]).to.equal(50);
    b.insert(40);
    expect(b.values[0]).to.equal(40);
    console.log(b);
  });

});
