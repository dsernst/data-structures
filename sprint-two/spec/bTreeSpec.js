describe('bTree', function() {
  var b;

  beforeEach(function() {
    b = new BTree(3);
  });

  it('should log stuff, allow inserts, sort nodes, handle splits, and pass to children', function() {
    b.insert(50);
    expect(b.values[0]).to.equal(50);
    b.insert(40);
    expect(b.values[0]).to.equal(40);
    b.insert(60);
    expect(b.children.length).to.equal(2);
    expect(b.children[0].values[0]).to.equal(40);
    expect(b.children[1].values[0]).to.equal(60);
    b.insert(30);
    expect(b.children[0].values[0]).to.equal(30);
    b.insert(70);
    expect(b.children[1].values[1]).to.equal(70);
    b.insert(55);
    expect(b.children[1].values[0]).to.equal(55);
    expect(b.children[2].values[0]).to.equal(70);
    expect(b.values[1]).to.equal(60);
    b.insert(35);
    expect(b.print()).to.equal("[[50],[35],[30],[40],[60],[55],[70]]");
    b.insert(68);
    expect(b.print()).to.equal("[[50],[35],[30],[40],[60],[55],[68,70]]");
    b.insert(69);
    expect(b.print()).to.equal("[[50],[35],[30],[40],[60,69],[55],[68],[70]]");
    b.insert(56);
    expect(b.print()).to.equal("[[50],[35],[30],[40],[60,69],[55,56],[68],[70]]");
    // debugger;
    b.insert(57);
    // expect(b.print()).to.equal("[[50,60],[35],[30],[40],[56],[55],[57],[69],[68],[70]]");
  });

});
