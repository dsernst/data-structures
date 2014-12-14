describe('redBlackTree', function() {
  var b;

  beforeEach(function() {
    b = new RedBlackTree(30);
  });

  it('should allow inserts', function() {
    b.insert(50);
    b.insert(20);
    expect(b.value).to.equal(30);
    expect(b.right.value).to.equal(50);
    expect(b.left.value).to.equal(20);

  });


});
