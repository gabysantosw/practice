describe("pow", function() {

  // initial testing: manually it blocks
  // we use the assert from chai.assert
  it("2 raised to power 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 raised to power 3 is 27", function() {
    assert.equal(pow(3, 3), 27);
  });

  // generated it testing blocks
  // we use a nested describe to separate tests in subgroups
  describe("raises x to power 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  // test for negative n values
  it("for negative n the result is NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  // test for for invalid numbers of n
  it("for non-integer n the result is NaN", function() {
    assert.isNaN(pow(2, 1.5));
  });

});
