import { Document, Model as MongoModel } from 'mongoose';
import { Controller, ControllerRouters, ControllerOptions } from '../types';

import { createController } from './controller';

interface DefaultRouters<Model, Routers extends ControllerRouters = ControllerRouters> {
    (options: ControllerOptions<Model>): Routers;
}

interface ControllerFabricOptions<Model, Routers extends ControllerRouters = ControllerRouters> {
    defaultRouters?: DefaultRouters<Model, Routers>;
}

export const createControllerFabric = <
    ModelType = MongoModel<Document, any>,
    Routers extends ControllerRouters = ControllerRouters
>(
    fabricOptions: ControllerFabricOptions<ModelType, Routers>,
    defaultRouters?: DefaultRouters<ModelType, Routers>,
) => (controllerOptions: ControllerOptions<ModelType>): Controller<ModelType, Routers> => {
    const createDefaultRouters = fabricOptions.defaultRouters || defaultRouters;
    const { path } = controllerOptions;

    const routers: Routers = createDefaultRouters ? createDefaultRouters(controllerOptions) : ({} as Routers);

    const controller = createController<ModelType, Routers>(path || '/', routers);

    return controller;
};
