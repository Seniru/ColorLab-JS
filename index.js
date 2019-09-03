/**
The MIT License (MIT)

Copyright (c) 2019 Seniru Pasan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/**
  Class which defines methods to create, store and manipulate colors
*/
class Color {
  /**
    Constructor of the class `Color`
    @param args {number|object|string} The values that are provided to instantiate the object. It can be either of type `number` (ie: hexadecimal values), `object` (dictionaries with rgb, hsl or hsv values) or `string` (hexadimal vlues encoded in stirng of format #xxx or #xxxxxx)
    @throws {TypeError} if any of the specified types aren't matching the given types of args
  */
  constructor(args) {
    if (typeof args == 'number' && args >= 0x000000 && args <= 0xFFFFFF) { // if the argument is an integer (in pure hexadecimal format)
      // TODO: Check that hex unpacking method and apply it to here.
    } else if (typeof args == 'object') { // if the arguments are specified using dictionary values
      if (typeof args.r == 'number' && typeof args.g == 'number' && typeof args.b == 'number' && Object.values(args).every(x => x >= 0 && x <= 255)) {
        this.r = args.r;
        this.g = args.g;
        this.b = args.b;
      }
      // TODO: Add constructore methods to add colors of other channels
    } else if (typeof args == "string") { // If the argument provided is encoded in an string
      if (/^#[0-9a-fA-F]{6,6}/gi.test(args)) { // default color contructore with # and 6 hex values
        this.r = parseInt(args.substring(1, 3), 16);
        this.g = parseInt(args.substring(3, 5), 16);
        this.b = parseInt(args.substring(5, 7), 16);
      } else if (/^#[0-9a-fA-F]{3,3}/gi.test(args)) { // color shorthand method with # and 3 hex values
        let vals = args.split("");
        this.r = parseInt((vals[1] + vals[1]), 16);
        this.g = parseInt((vals[2] + vals[2]), 16);
        this.b = parseInt((vals[3] + vals[3]), 16);
      }
    } else {
      throw TypeError("Got unexpcted types or the format of the arguments are incorrect!");
    }
  }
  /**
    @returns {number} The red value of the color
  */
  getR() {
    return this.r
  }
  /**
    @returns {number} The green value of the color
  */
  getG() {
    return this.g
  }
  /**
    @returns {number} The blue value of the color
  */
  getB() {
    return this.b
  }
  /**
    @returns {string} A `string` version of this color
  */
  toString() {
    return "#" + getHex(this.r) + getHex(this.g) + getHex(this.b);
  }
}

/* --- Utility functions ---- */
/**
  A utility function. Inverts the given color.
  @param col {Color} The input color
  @returns {Color} An inveted version of the specified input
  @throws {TypeError} If `col` is not of type `Color`
*/
function invert(col) {
  if (col instanceof Color) {
    return new Color({
      r: 255 - col.getR(),
      g: 255 - col.getG(),
      b: 255 - col.getB()
    })
  }
  throw TypeError("Expected type of 'Color', instead got " + typeof col);
}

/* ---- Supporter functions ---- */
/**
`A supporter function. Gives the hexadecimal value of the given decimal
@param dec {number} The decimal
@returns {number} The hexadeciaml version of the given decimal`
*/
function getHex(dec) {
  let res = dec.toString(16);
  return (res.length == 1 ? res + res : res).toUpperCase();
}

/**
  Color constants that are commonly used in development
*/
const colors = {
  BLACK: new Color("#000000"),
  RED: new Color("#ff0000"),
  GREEN: new Color("#00ff00"),
  BLUE: new Color("#0000ff"),
  WHITE: new Color({
    r: 255,
    g: 255,
    b: 255
  })
}

// Exports the classes, objects and methods to be used as a package.
module.exports = {
  Color,
  colors,
  invert
};
