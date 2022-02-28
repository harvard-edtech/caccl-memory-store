"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import libs
var locks_1 = __importDefault(require("locks"));
var CACCLMemoryStore = /** @class */ (function () {
    /**
     * Create a new memory store instance
     * @author Gabe Abrams
     * @param minLifespanSec the minimum number of seconds that the store will
     *   keep entries
     */
    function CACCLMemoryStore(minLifespanSec) {
        var _this = this;
        // Initialize state
        this.primaryStore = new Map();
        this.secondaryStore = new Map();
        this.mutex = locks_1.default.createMutex();
        // Calculate a swap interval
        var swapIntervalSec = Math.ceil(minLifespanSec / 2);
        // Start a swap process
        setInterval(function () {
            _this.rotate();
        }, swapIntervalSec);
    }
    /**
     * Rotate primary store and secondary store
     * @author Gabe Abrams
     */
    CACCLMemoryStore.prototype.rotate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.mutex.lock(function () {
                    _this.secondaryStore = new Map(_this.primaryStore);
                    _this.primaryStore = new Map();
                    _this.mutex.unlock();
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Look up an entry in the store
     * @author Gabe Abrams
     * @param key the key to use in the lookup
     * @returns JSON value object
     */
    CACCLMemoryStore.prototype.get = function (key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                // Look up in either store
                return [2 /*return*/, ((_b = (_a = this.primaryStore.get(key)) !== null && _a !== void 0 ? _a : this.secondaryStore.get(key)) !== null && _b !== void 0 ? _b : undefined)];
            });
        });
    };
    /**
     * Add/overwrite an entry in the store
     * @author Gabe Abrams
     * @param key the key to use for lookups
     * @param value JSON value object
     * @returns previously stored value if there was one
     */
    CACCLMemoryStore.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        // Set in primary store
                        _this.mutex.lock(function () {
                            var prevValue = _this.get(key);
                            _this.primaryStore.set(key, value);
                            _this.mutex.unlock();
                            // Finish
                            resolve(prevValue !== null && prevValue !== void 0 ? prevValue : undefined);
                        });
                    })];
            });
        });
    };
    return CACCLMemoryStore;
}());
exports.default = CACCLMemoryStore;
//# sourceMappingURL=CACCLMemoryStore.js.map