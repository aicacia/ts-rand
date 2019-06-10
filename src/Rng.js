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
        var tmpBytes = new Uint8Array(4);
        for (var i = 0, il = bytes.length; i < il; i++) {
            var index = i % 4;
            if (index === 0) {
                getBytes(tmpBytes, this.nextInt());
            }
            bytes[i] = tmpBytes[index];
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
function getBytes(bytes, num) {
    bytes[0] = (num & 0xff000000) >> 24;
    bytes[1] = (num & 0x00ff0000) >> 16;
    bytes[2] = (num & 0x0000ff00) >> 8;
    bytes[3] = num & 0x000000ff;
}
