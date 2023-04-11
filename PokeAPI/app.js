const express = require('express');
const middlewares = require('./middlewares');
const app = express();
const port = 3000;


// Adding middlewares to the app
middlewares.setUpMiddlewares(app);

// Routers
const authRoutes = require('./auth/auth.router').router;
const teamRoutes = require('./teams/teams.router').router;
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);


app.get('/', (req, res) => {
    res.status(200).send('Server response at port 3000');
});

// Server
app.listen(port, () => {
    console.log('Server started at port 3000');
});


exports.app = app;