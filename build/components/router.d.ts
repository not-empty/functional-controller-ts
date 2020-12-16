import { CreateRouter, Middleware, MiddlewareFunction } from '../types';
export declare const sortMiddlewares: (middlewares: Middleware[]) => MiddlewareFunction[];
export declare const Get: CreateRouter;
export declare const Post: CreateRouter;
export declare const Put: CreateRouter;
export declare const Patch: CreateRouter;
export declare const Delete: CreateRouter;
