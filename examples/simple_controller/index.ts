import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
import { User, startMongoConnection } from './mongo';
import { createDefaultController } from '../../build';

startMongoConnection();

const app = express();

const user = createDefaultController({
    model: User,
    path: '/user',
});

user.get('/me', async () => {
    const me = await User.findOne({});
    return me;
});

app.use(bodyParser());
app.use(user.getRouters());

app.listen(4000, () => {
    console.log('Api started');
});
