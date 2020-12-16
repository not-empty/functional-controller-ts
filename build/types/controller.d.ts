import { Router as ExpressRouter } from 'express';
import { Document, Model as MongoModel } from 'mongoose';
import { CreateRouter, Middleware, MiddlewareFunction, Router } from './router';
interface ProjectionSortQuery {
    [key: string]: number;
}
export interface ControllerOptions<Model = MongoModel<Document, any>> {
    model?: Model;
    path?: string;
    /** Filter and validate payload for insert and update routers */
    validate?: (values: any) => any;
    projection?: ProjectionSortQuery;
    sort?: ProjectionSortQuery;
    filters?: object;
    populate?: [object];
}
export interface ControllerRouters {
    [router: string]: Router;
}
interface setRouters<Model = MongoModel<Document>, OriginalRouters extends ControllerRouters = ControllerRouters, NewRouters extends ControllerRouters = ControllerRouters> {
    (routers: NewRouters | {
        (options: ControllerOptions): NewRouters;
    }): Controller<Model, NewRouters>;
}
export interface Controller<Model = MongoModel<Document>, Routers extends ControllerRouters = ControllerRouters> {
    path: string;
    model?: Model;
    getOptions(): ControllerOptions<Model>;
    addRouter(router: Router, name?: string): Controller<Model, Routers>;
    addMiddleware(middleware: MiddlewareFunction, priority?: number): Controller<Model, Routers>;
    getOrdenedMiddlewares(): MiddlewareFunction[];
    setRouters: setRouters<Model, Routers>;
    getRouters(): ExpressRouter;
    get: CreateRouter;
    post: CreateRouter;
    put: CreateRouter;
    patch: CreateRouter;
    delete: CreateRouter;
    middlewares: Middleware[];
    routers: Record<keyof Routers, Router> & ControllerRouters;
}
export {};
