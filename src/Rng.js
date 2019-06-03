"use strict";
exports.__esModule = true;
var core_1 = require("@stembord/core");
var constants_1 = require("./constants");
var Rng = /** @class */ (function () {
    function Rng() {
    }
    Rng.prototype.nextFloat = function () {
        return this.nextInt() / constants_1.MAX_INT;
    };
    Rng.prototype.fillBytes = function (bytes) {
        for (var i = 0, il = bytes.length / 4; i < il; i++) {
            fillByte(bytes, i, this.nextInt());
        }
        return bytes;
    };
    Rng.prototype.iter = function () {
        return new core_1.Iterator(this);
    };
    Rng.prototype.next = function () {
        return core_1.some(this.nextFloat());
    };
    return Rng;
}());
exports.Rng = Rng;
function fillByte(array, index, num) {
    array[index] = (num & 0xff000000) >> 24;
    array[index + 1] = (num & 0x00ff0000) >> 16;
    array[index + 2] = (num & 0x0000ff00) >> 8;
    array[index + 3] = num & 0x000000ff;
}
