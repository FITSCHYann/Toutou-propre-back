const login = require("./login")
const user = require("./user")
const appointment = require("./appointment")

const setupRoutes = (app) => {
    app.use('/login', login);
    app.use('/', user)
    app.use('/', appointment)
};

module.exports = setupRoutes