import { Request, Response, NextFunction } from 'express';

export interface MiddlewareFunction {
    (req: Request, res: Response, next: NextFunction): Promise<any> | any;
}

export interface Middleware {
    middleware: MiddlewareFunction;
    priority?: number;
}

export interface RouterOptions {
    priority?: number;
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export interface Router {
    isEnable: boolean;
    callback: MiddlewareFunction;
    path: string;
    method: Method;
    priority?: number;
    addMiddleware(middleware: MiddlewareFunction, priority?: number): Router;
    getOrdenedMiddlewares(): MiddlewareFunction[];
    disable(): void;
    enable(): void;
    middlewares: Middleware[];
}

export interface CreateRouter {
    (path: string, callback: MiddlewareFunction, options?: RouterOptions): Router;
}
