import mongoose, { Schema, model } from 'mongoose';

const mongoUrl = 'mongodb://root:password@127.0.0.1:27020/fcontroller?authSource=admin';

export const startMongoConnection = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: true,
        keepAlive: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected');
    });

    mongoose.connection.on('open', () => {
        console.log('Mongoose open');
    });

    mongoose.connection.on('error', (data) => {
        console.log('Mongo error: ', data);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongo disconnected');
    });
};

const userSchema = new Schema({
    name: {
        type: String,
    },
});

export const User = model('user', userSchema);
