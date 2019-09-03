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
  it("Should throw a TypeError otherwise", () => {
    assert.throws(() => {new cl.Color(true)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color(undefined)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color(null)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color(NaN)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color(Infinity)}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color("")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color("this should fail")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
    assert.throws(() => {new cl.Color("ff0000")}, TypeError, "Got unexpcted types or the format of the arguments are incorrect!");
  });
});
