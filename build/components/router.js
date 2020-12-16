"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.sortMiddlewares = void 0;
var types_1 = require("../types");
exports.sortMiddlewares = function (middlewares) {
    return middlewares.sort(function (a, b) { return (a.priority || 9999) - (b.priority || 9999); }).map(function (v) { return v.middleware; });
};
var router = function (method) { return function (path, callback, options) {
    if (options === void 0) { options = {}; }
    return ({
        isEnable: true,
        path: path,
        method: method,
        callback: callback,
        priority: options.priority || 9999,
        middlewares: [],
        addMiddleware: function (middleware, priority) {
            if (priority === void 0) { priority = 9999; }
            this.middlewares.push({ middleware: middleware, priority: priority });
            return this;
        },
        getOrdenedMiddlewares: function () {
            return exports.sortMiddlewares(this.middlewares);
        },
        disable: function () {
            this.isEnable = false;
        },
        enable: function () {
            this.isEnable = true;
        },
    });
}; };
exports.Get = router(types_1.Method.GET);
exports.Post = router(types_1.Method.POST);
exports.Put = router(types_1.Method.PUT);
exports.Patch = router(types_1.Method.PATCH);
exports.Delete = router(types_1.Method.DELETE);
//# sourceMappingURL=router.js.map