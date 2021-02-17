[![Latest Version](https://img.shields.io/github/v/release/kiwfy/functional-controller.svg?style=flat-square)](https://github.com/kiwfy/functional-controller/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Functional-Controller

Functional methods to create controllers (routes) for express

## Installation

npm

```
npm install functional-controller
```

yarn

```
yarn add functional-controller
```

## Usage

### Creating a Controller

This method creates a controller with full route crud using a mongoose model.

```ts
import express from 'express';
import { createController } from 'functional-controller';
const app = express();

const middlewareExample = (req, res, next) => {
    next();
};

const home = createController('/home', {});

// Add controller middlewares
home.addMiddleware(middlewareExample);

// define controller router
home.get('/', () => {
    return [];
})
    // Add router middlewares
    .addMiddleware(middlewareExample, 2) // priority
    .addMiddleware(middlewareExample, 1); // priority

app.use(home.getRouters());
```

### Creating a Default Crud Controller

This method creates a controller with full route crud using a mongoose model.

```ts
import express from 'express';
import { createDefaultController } from 'functional-controller';
const app = express();

const User = model('user', new Schema({}));

// Create a default CRUD Controller
const user = createDefaultController({
    model: User,
    path: '/user',
});

// increment in default controller
user.get('/me', async () => {
    const me = await User.findOne({
        /* User logged query */
    });
    return me;
});
```
