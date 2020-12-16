import { Document, Model as MongoModel } from 'mongoose';
import { Controller, ControllerRouters } from '../types';
export declare const createController: <ModelType = MongoModel<Document, any>, Routers extends ControllerRouters = ControllerRouters>(path: string, routers: Routers) => Controller<ModelType, Routers>;
