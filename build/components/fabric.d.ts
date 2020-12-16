import { Document, Model as MongoModel } from 'mongoose';
import { Controller, ControllerRouters, ControllerOptions } from '../types';
interface DefaultRouters<Model, Routers extends ControllerRouters = ControllerRouters> {
    (options: ControllerOptions<Model>): Routers;
}
interface ControllerFabricOptions<Model, Routers extends ControllerRouters = ControllerRouters> {
    defaultRouters?: DefaultRouters<Model, Routers>;
}
export declare const createControllerFabric: <ModelType = MongoModel<Document, any>, Routers extends ControllerRouters = ControllerRouters>(fabricOptions: ControllerFabricOptions<ModelType, Routers>, defaultRouters?: DefaultRouters<ModelType, Routers> | undefined) => (controllerOptions: ControllerOptions<ModelType>) => Controller<ModelType, Routers>;
export {};
