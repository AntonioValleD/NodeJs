const authMiddleware = require('./tools/auth.middleware');
const bodyParser = require('body-parser');

const setUpMiddlewares = (app) => {
    app.use(bodyParser.json());
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt);
};

exports.setUpMiddlewares = setUpMiddlewares;