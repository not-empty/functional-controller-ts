import { Method, CreateRouter, Middleware, MiddlewareFunction } from '../types';

export const sortMiddlewares = (middlewares: Middleware[]): MiddlewareFunction[] => {
    return middlewares.sort((a, b) => (a.priority || 9999) - (b.priority || 9999)).map((v) => v.middleware);
};

const router = (method: Method): CreateRouter => (path, callback, options = {}) => ({
    isEnable: true,
    path,
    method,
    callback,
    priority: options.priority || 9999,
    middlewares: [],
    addMiddleware(middleware, priority = 9999) {
        this.middlewares.push({ middleware, priority });
        return this;
    },
    getOrdenedMiddlewares() {
        return sortMiddlewares(this.middlewares);
    },
    disable() {
        this.isEnable = false;
    },
    enable() {
        this.isEnable = true;
    },
});

export const Get = router(Method.GET);
export const Post = router(Method.POST);
export const Put = router(Method.PUT);
export const Patch = router(Method.PATCH);
export const Delete = router(Method.DELETE);
