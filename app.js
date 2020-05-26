const express = require("express");
const useMiddleware = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");
const indexRouter = require("./routes/index");
const servicesRouter = require("./routes/services");
const ordersRouter = require("./routes/orders");
const customerRouter = require("./routes/customer");
const executorRouter = require("./routes/executor");
const {sessionChecker} = require('./middleware/auth')
const app = express();

useMiddleware(app);


// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use("/customer",sessionChecker(), customerRouter);
app.use("/executor",sessionChecker(), executorRouter);
app.use("/services", servicesRouter);
app.use("/orders", ordersRouter);

useErrorHandlers(app);

module.exports = app;
