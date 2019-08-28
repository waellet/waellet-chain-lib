"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var schema_1 = require("@aeternity/aepp-sdk/es/tx/builder/schema");
var es_1 = require("@aeternity/aepp-sdk/es");
var bignumber_js_1 = require("bignumber.js");
var AeternityTx = /** @class */ (function () {
    function AeternityTx(sdk) {
        var _this = this;
        this.SUPPORTED_ТX_TYPES = [];
        this.MAGNITUDE = 18;
        this.MAX_UINT256 = new bignumber_js_1["default"](2).exponentiatedBy(256).minus(1);
        Object.keys(schema_1.TX_TYPE).forEach(function (key) {
            _this.SUPPORTED_ТX_TYPES.push(schema_1.TX_TYPE[key]);
        });
        this.sdk = sdk;
    }
    AeternityTx.prototype.sign = function (privateKey, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var signature;
            return __generator(this, function (_a) {
                signature = es_1.Crypto.sign(Buffer.concat([Buffer.from(this.sdk.getNetworkId()), transaction]), privateKey);
                // let signature = Crypto.sign(transaction, privateKey)
                return [2 /*return*/, es_1.TxBuilder.buildTx({ encodedTx: transaction, signatures: [signature] }, schema_1.TX_TYPE.signed).tx];
            });
        });
    };
    AeternityTx.prototype.prepare = function (type, values) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, txObject, tx, encodedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.SUPPORTED_ТX_TYPES.includes(type)) {
                            throw new Error("Unsupported tx type");
                        }
                        values.amount = parseInt(new bignumber_js_1["default"](values.amount).shiftedBy(this.MAGNITUDE).toString());
                        values.fee = parseInt(new bignumber_js_1["default"](values.fee).shiftedBy(this.MAGNITUDE).toString());
                        return [4 /*yield*/, this.sdk.getAccount("ak_2ELPCWzcTdiyYuumjaV4D7kE843d1Ts27zH1Y2LBMKDbNtfq1Q")];
                    case 1:
                        nonce = (_a.sent()).nonce;
                        tx = es_1.TxBuilder.buildTx(__assign({}, values, { ttl: 0, nonce: nonce }), type).tx;
                        encodedTx = es_1.Crypto.decodeBase64Check(es_1.Crypto.assertedType(tx, 'tx'));
                        console.log(encodedTx);
                        ;
                        txObject = es_1.TxBuilder.unpackTx(encodedTx, true).tx;
                        console.log(txObject);
                        return [2 /*return*/, es_1.TxBuilder.buildTx(__assign({}, txObject), schema_1.OBJECT_ID_TX_TYPE[txObject.tag]).rlpEncoded];
                }
            });
        });
    };
    AeternityTx.prototype.broadcast = function (signedTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                signedTx = Buffer.from(signedTx).toString('hex');
                console.log(this.sdk.sendTransaction(signedTx));
                return [2 /*return*/, ''];
            });
        });
    };
    return AeternityTx;
}());
exports.AeternityTx = AeternityTx;
