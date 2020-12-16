import { Router as ExpressRouter } from 'express';
import { Document, Model as MongoModel } from 'mongoose';

import { Controller, ControllerRouters, CreateRouter, MiddlewareFunction, Method } from '../types';
import { Get, Post, Put, Patch, Delete, sortMiddlewares } from './router';

const setInRouter = (router: ExpressRouter, method: Method) => {
    const methods = {
        [Method.GET]: (path: string, ...middlewares: MiddlewareFunction[]) => router.get(path, middlewares),
        [Method.POST]: (path: string, ...middlewares: MiddlewareFunction[]) => router.post(path, middlewares),
        [Method.PUT]: (path: string, ...middlewares: MiddlewareFunction[]) => router.put(path, middlewares),
        [Method.PATCH]: (path: string, ...middlewares: MiddlewareFunction[]) => router.patch(path, middlewares),
        [Method.DELETE]: (path: string, ...middlewares: MiddlewareFunction[]) => router.delete(path, middlewares),
    };

    return methods[method];
};

const wrapperResponse = (cb: MiddlewareFunction): MiddlewareFunction => async (req, res, next) => {
    try {
        const data = await cb(req, res, next);

        if (res.writableEnded) return;

        if (data !== undefined) {
            res.status(200).json(data);
        }
    } catch (error) {
        if (!res.writableEnded) {
            res.status(500).json({ error });
        }
    }
};

const defaultGetRouters = function (this: Controller) {
    const router = ExpressRouter();
    const routers = Object.values(this.routers)
        .filter((v) => v.isEnable)
        .sort((a, b) => (a.priority || 9999) - (b.priority || 9999));

    routers.forEach((v) => {
        const path = `/${this.path}/${v.path}`.replace(/\/\/+/g, '/');
        setInRouter(router, v.method)(
            path,
            ...this.getOrdenedMiddlewares(),
            ...v.getOrdenedMiddlewares(),
            wrapperResponse(v.callback),
        );
    });

    return router;
};

const createControllerRouter = (cb: CreateRouter): CreateRouter =>
    function (this: Controller, path, callback, options) {
        const router = cb(path, callback, options);
        this.addRouter(router);
        return router;
    };

export const createController = <
    ModelType = MongoModel<Document, any>,
    Routers extends ControllerRouters = ControllerRouters
>(
    path: string,
    routers: Routers,
): Controller<ModelType, Routers> => ({
    routers,
    middlewares: [],
    addRouter(router, name) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.routers[name || `${router.method} ${router.path}`] = router;
        return this;
    },
    addMiddleware(middleware, priority = 9999) {
        this.middlewares.push({ middleware, priority });
        return this;
    },
    getOrdenedMiddlewares() {
        return sortMiddlewares(this.middlewares);
    },
    // eslint-disable-next-line no-shadow
    setRouters(routers) {
        const newRouters = typeof routers === 'object' ? routers : routers({ path: this.path });

        this.routers = {
            ...this.routers,
            ...newRouters,
        };

        return this;
    },
    path: path || '/',
    getRouters: defaultGetRouters,
    getOptions() {
        return { path: this.path, model: this.model };
    },
    get: createControllerRouter(Get),
    post: createControllerRouter(Post),
    put: createControllerRouter(Put),
    patch: createControllerRouter(Patch),
    delete: createControllerRouter(Delete),
});
