import { Document, Model } from 'mongoose';
import { ControllerOptions, RouterOptions } from '../types';
import { createControllerFabric } from './fabric';
import { Delete, Get, Patch, Post, Put } from './router';

const getModel = (options: ControllerOptions) => {
    if (!options.model) throw Error('Model not defined');
    return options.model as Model<Document>;
};

const createGetRecord = (model: Model<Document>, options: ControllerOptions) => (id: string) => {
    return model.findById(id, options.projection || {}).populate(options.populate || []);
};
const defaultRouterOptions: RouterOptions = { priority: 99999 };

export const createDefaultController = createControllerFabric({}, (options) => {
    const model = getModel(options);
    const getRecord = createGetRecord(model, options);

    return {
        getOne: Get(
            '/:id',
            async (req) => {
                const { id } = req.params;
                return getRecord(id);
            },
            defaultRouterOptions,
        ),
        getAll: Get(
            '/',
            (req) => {
                const { q } = req.query;

                return model.find(
                    {
                        ...((q as object) || {}),
                        ...(options.filters || {}),
                    },
                    options.projection || {},
                );
            },
            defaultRouterOptions,
        ),
        post: Post(
            '/',
            async (req) => {
                const { validate } = options;
                const result = await model.create({
                    ...(validate ? validate(req.body) : req.body),
                });

                return getRecord(result._id);
            },
            defaultRouterOptions,
        ),
        put: Put(
            '/:id',
            async (req) => {
                const { id } = req.params;
                const { validate } = options;

                const payload = validate ? validate(req.body) : req.body;

                await model.updateOne(
                    { _id: id },
                    {
                        $set: {
                            ...payload,
                        },
                    },
                );

                return getRecord(id);
            },
            defaultRouterOptions,
        ),
        patch: Patch(
            '/:id',
            async (req) => {
                const { id } = req.params;
                const { validate } = options;

                const payload = validate ? validate(req.body) : req.body;

                await model.updateOne(
                    { _id: id },
                    {
                        $set: {
                            ...payload,
                        },
                    },
                );

                return getRecord(id);
            },
            defaultRouterOptions,
        ),
        delete: Delete(
            '/:id',
            async (req) => {
                const { id } = req.params;
                await model.findByIdAndDelete(id);
                return null;
            },
            defaultRouterOptions,
        ),
    };
});
