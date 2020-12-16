"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createControllerFabric = void 0;
var controller_1 = require("./controller");
exports.createControllerFabric = function (fabricOptions, defaultRouters) { return function (controllerOptions) {
    var createDefaultRouters = fabricOptions.defaultRouters || defaultRouters;
    var path = controllerOptions.path;
    var routers = createDefaultRouters ? createDefaultRouters(controllerOptions) : {};
    var controller = controller_1.createController(path || '/', routers);
    return controller;
}; };
//# sourceMappingURL=fabric.js.map