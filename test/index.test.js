const cl = require("../index");
const assert = require('assert');

const RED = cl.colors.RED;


describe('Color constructor', () => {
  it('Should create an object when color specified as a hexadeimal string', () => {
    assert.deepEqual(new cl.Color("#ff0000"), RED);
  });
  it('Should create an object when color specified as shorhand hex string', () => {
    assert.deepEqual(new cl.Color("#f00"), RED);
    assert.deepEqual(new cl.Color("#fff"), cl.colors.WHITE);
  });
  it("Should create an object when values specified using an object", () => {
    assert.deepEqual(new cl.Color({r:255, g:0,  b:0}), RED);
    assert.deepEqual(new cl.Color({r:0, g:0, b:0}), cl.colors.BLACK);
  });
  describe("Illegal Types for constructor", () => {
    it("Should throw an error for booleans, undefined and null", () => {
      assert.throws(() => {new cl.Color(true)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
      assert.throws(() => {new cl.Color(undefined)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
      assert.throws(() => {new cl.Color(null)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    });
    it("Should throw an error for NaN types", () => {
      assert.throws(() => {new cl.Color(NaN)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    });
    it("Should throw an error for Infintiy values", () => {
      assert.throws(() => {new cl.Color(Infinity)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
      assert.throws(() => {new cl.Color(-Infinity)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    });
    it("Should throw an error for wrong strings", () => {
      assert.throws(() => {new cl.Color("")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
      assert.throws(() => {new cl.Color("this should fail")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
      assert.throws(() => {new cl.Color("ff0000")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    });
  });
});

describe("Inverting colours", () => {
  it("Should invert white to black (utility)", () => {
    assert.deepEqual(cl.invert(cl.colors.WHITE), cl.colors.BLACK);
  });
  it("Should invert white to black (instance method)", () => {
    assert.deepEqual(cl.colors.WHITE.invert(), cl.colors.BLACK);
  });
  it("Should throw a TypeError if passed argument is not a Color object", () => {
      for (let obj of ["string", "#fff", 0xffffff, null, undefined, NaN, function() {}]) {
          assert.throws(() => cl.invert(obj), TypeError, "Expected type of 'Color', instead got " + typeof obj);
      }
  })
  it("should pass these random tests", () => {
    assert.deepEqual(cl.invert(new cl.Color(0xFF0000)), new cl.Color(0x00FFFF));
    assert.deepEqual(cl.invert(new cl.Color("#111111")), new cl.Color("#EEE"));
    assert.deepEqual(new cl.Color("#333").invert(), new cl.Color("#CCC"));
    for (let i = 0; i < 10; i++) {
      //let c = new cl.Color(math.random())
      // TODO: Create random int function and apply it on this
    }
  });
});

describe("#toString", () => {
    it("Should return a hex version of the color when no argument is provided", () => {
      assert.deepEqual(cl.colors.BLUE.toString(), "#0000FF");
      assert.deepEqual(new cl.Color("#BAD").toString(), "#BBAADD");
    });
    it("Should return a hex version of the color when argument is hex or hexadimal (case insensitive)", () => {
      assert.deepEqual(cl.colors.BLACK.toString("hex"), "#000000");
      assert.deepEqual(cl.colors.WHITE.toString("hexadecimal"), "#FFFFFF");
      assert.deepEqual(new cl.Color("#DAD").toString("HeX"), "#DDAADD");
    });
    it("Should return a rgb version of the color when argument is rgb (case insensitive)", () => {
      assert.deepEqual(cl.colors.BLACK.toString("rgb"), "rgb(0, 0, 0)");
      assert.deepEqual(new cl.Color("#FFF").toString("rgb"), "rgb(255, 255, 255)");
    })
});
