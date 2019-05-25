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
var constants_1 = require("./constants");
var Rng_1 = require("./Rng");
var ParkMillerRng = /** @class */ (function (_super) {
    __extends(ParkMillerRng, _super);
    function ParkMillerRng(seed) {
        if (seed === void 0) { seed = 0x193a6754; }
        var _this = _super.call(this) || this;
        _this.seed = 0x193a6754;
        _this.seed = seed;
        return _this;
    }
    ParkMillerRng.prototype.nextInt = function () {
        this.seed = Math.imul(48271, this.seed) | 0 % constants_1.MAX_INT;
        return this.seed & constants_1.MAX_INT;
    };
    return ParkMillerRng;
}(Rng_1.Rng));
exports.ParkMillerRng = ParkMillerRng;
