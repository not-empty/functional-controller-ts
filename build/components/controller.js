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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = void 0;
var express_1 = require("express");
var types_1 = require("../types");
var router_1 = require("./router");
var setInRouter = function (router, method) {
    var _a;
    var methods = (_a = {},
        _a[types_1.Method.GET] = function (path) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            return router.get(path, middlewares);
        },
        _a[types_1.Method.POST] = function (path) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            return router.post(path, middlewares);
        },
        _a[types_1.Method.PUT] = function (path) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            return router.put(path, middlewares);
        },
        _a[types_1.Method.PATCH] = function (path) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            return router.patch(path, middlewares);
        },
        _a[types_1.Method.DELETE] = function (path) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            return router.delete(path, middlewares);
        },
        _a);
    return methods[method];
};
var wrapperResponse = function (cb) { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cb(req, res, next)];
            case 1:
                data = _a.sent();
                if (res.writableEnded)
                    return [2 /*return*/];
                if (data !== undefined) {
                    res.status(200).json(data);
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (!res.writableEnded) {
                    res.status(500).json({ error: error_1 });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
var defaultGetRouters = function () {
    var _this = this;
    var router = express_1.Router();
    var routers = Object.values(this.routers)
        .filter(function (v) { return v.isEnable; })
        .sort(function (a, b) { return (a.priority || 9999) - (b.priority || 9999); });
    routers.forEach(function (v) {
        var path = ("/" + _this.path + "/" + v.path).replace(/\/\/+/g, '/');
        setInRouter(router, v.method).apply(void 0, __spreadArrays([path], _this.getOrdenedMiddlewares(), v.getOrdenedMiddlewares(), [wrapperResponse(v.callback)]));
    });
    return router;
};
var createControllerRouter = function (cb) {
    return function (path, callback, options) {
        var router = cb(path, callback, options);
        this.addRouter(router);
        return router;
    };
};
exports.createController = function (path, routers) { return ({
    routers: routers,
    middlewares: [],
    addRouter: function (router, name) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.routers[name || router.method + " " + router.path] = router;
        return this;
    },
    addMiddleware: function (middleware, priority) {
        if (priority === void 0) { priority = 9999; }
        this.middlewares.push({ middleware: middleware, priority: priority });
        return this;
    },
    getOrdenedMiddlewares: function () {
        return router_1.sortMiddlewares(this.middlewares);
    },
    // eslint-disable-next-line no-shadow
    setRouters: function (routers) {
        var newRouters = typeof routers === 'object' ? routers : routers({ path: this.path });
        this.routers = __assign(__assign({}, this.routers), newRouters);
        return this;
    },
    path: path || '/',
    getRouters: defaultGetRouters,
    getOptions: function () {
        return { path: this.path, model: this.model };
    },
    get: createControllerRouter(router_1.Get),
    post: createControllerRouter(router_1.Post),
    put: createControllerRouter(router_1.Put),
    patch: createControllerRouter(router_1.Patch),
    delete: createControllerRouter(router_1.Delete),
}); };
//# sourceMappingURL=controller.js.map