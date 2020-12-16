import { Document, Model } from 'mongoose';
import { ControllerOptions } from '../types';
export declare const createDefaultController: (controllerOptions: ControllerOptions<Model<Document, any>>) => import("../types").Controller<Model<Document, any>, {
    getOne: import("../types").Router;
    getAll: import("../types").Router;
    post: import("../types").Router;
    put: import("../types").Router;
    patch: import("../types").Router;
    delete: import("../types").Router;
}>;
