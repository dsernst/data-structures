describe('bTree', function() {
  var b;

  describe('order 3', function() {

    beforeEach(function() {
      b = new BTree(3);
    });

    it('should allow inserts', function() {
      b.insert(50);
      expect(b.values[0]).to.equal(50);
    });

    it('should sort nodes', function() {
      b.multiInsert(50, 40);
      expect(b.values[0]).to.equal(40);
    });

    it('should handle splitting overloaded nodes', function() {
      b.multiInsert(50, 40, 60);
      expect(b.print()).to.equal("[[50],[40],[60]]");
    });

    it('should pass new values to children nodes', function() {
      b.multiInsert(50, 40, 60, 30, 70);
      expect(b.children[0].values[0]).to.equal(30);
      expect(b.children[1].values[1]).to.equal(70);
    });

    it('should pass split nodes up to parent', function() {
      b.multiInsert(50, 40, 60, 30, 70, 55);
      expect(b.print()).to.equal("[[50,60],[30,40],[55],[70]]");
    });

    it('should split root node and create new root', function() {
      b.multiInsert(50, 40, 60, 30, 70, 55, 35);
      expect(b.print()).to.equal("[[50],[35],[30],[40],[60],[55],[70]]");
      b.insert(35);
    });

    it('should be able to pass to deeper child nodes', function() {
      b.multiInsert(50, 40, 60, 30, 70, 55, 35, 68);
      expect(b.print()).to.equal("[[50],[35],[30],[40],[60],[55],[68,70]]");
    });

    it('should be complete for order 3', function() {
      b.multiInsert(50, 40, 60, 30, 70, 55, 35, 68, 69);
      expect(b.print()).to.equal("[[50],[35],[30],[40],[60,69],[55],[68],[70]]");
      b.insert(56);
      expect(b.print()).to.equal("[[50],[35],[30],[40],[60,69],[55,56],[68],[70]]");
      b.insert(57);
      expect(b.print()).to.equal("[[50,60],[35],[30],[40],[56],[55],[57],[69],[68],[70]]");
      b.insert(53);
      expect(b.print()).to.equal("[[50,60],[35],[30],[40],[56],[53,55],[57],[69],[68],[70]]");
      b.insert(54);
      expect(b.print()).to.equal("[[50,60],[35],[30],[40],[54,56],[53],[55],[57],[69],[68],[70]]");
      b.multiInsert(52,51);
      expect(b.print()).to.equal("[[54],[50],[35],[30],[40],[52],[51],[53],[60],[56],[55],[57],[69],[68],[70]]");
    });
  });

});
