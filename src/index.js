"use strict";
exports.__esModule = true;
var ParkMillerRng_1 = require("./ParkMillerRng");
exports.ParkMillerRng = ParkMillerRng_1.ParkMillerRng;
var Rng_1 = require("./Rng");
exports.Rng = Rng_1.Rng;
var XorShiftRng_1 = require("./XorShiftRng");
exports.XorShiftRng = XorShiftRng_1.XorShiftRng;
var constants_1 = require("./constants");
exports.MAX_INT = constants_1.MAX_INT;
exports.PARK_MILLER_RNG = new ParkMillerRng_1.ParkMillerRng();
exports.X_OR_SHIFT_RNG = new XorShiftRng_1.XorShiftRng();
exports.DEFAULT_RNG = exports.PARK_MILLER_RNG;
function random() {
    return exports.DEFAULT_RNG.nextFloat();
}
exports.random = random;
