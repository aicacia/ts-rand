"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Rng_1 = require("./Rng");
var XorShiftRng = /** @class */ (function (_super) {
    __extends(XorShiftRng, _super);
    function XorShiftRng(x, y, z, w) {
        if (x === void 0) { x = 0x193a6754; }
        if (y === void 0) { y = 0xa8a7d469; }
        if (z === void 0) { z = 0x97830e05; }
        if (w === void 0) { w = 0x113ba7bb; }
        var _this = _super.call(this) || this;
        _this.x = 0x193a6754;
        _this.y = 0xa8a7d469;
        _this.z = 0x97830e05;
        _this.w = 0x113ba7bb;
        _this.x = x | 0;
        _this.y = y | 0;
        _this.z = z | 0;
        _this.w = w | 0;
        return _this;
    }
    XorShiftRng.prototype.nextInt = function () {
        var x = this.x, t = x ^ (x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        var w = this.w;
        this.w = w ^ (w >> 19) ^ (t ^ (t >> 8));
        return this.w;
    };
    return XorShiftRng;
}(Rng_1.Rng));
exports.XorShiftRng = XorShiftRng;
