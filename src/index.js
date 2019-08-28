"use strict";
exports.__esModule = true;
var Aeternity_1 = require("./protocols/Aeternity/Aeternity");
var Wallet = /** @class */ (function () {
    function Wallet() {
        this.Aeternity = new Aeternity_1.Aeternity();
    }
    return Wallet;
}());
exports["default"] = Wallet;
