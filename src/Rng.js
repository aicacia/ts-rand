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
    Rng.prototype.iter = function () {
        return new core_1.Iterator(this);
    };
    Rng.prototype.next = function () {
        return core_1.some(this.nextFloat());
    };
    return Rng;
}());
exports.Rng = Rng;
