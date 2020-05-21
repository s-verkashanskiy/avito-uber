const express = require("express");
const useMiddleware = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");
const indexRouter = require("./routes/index");
const customerRouter = require("./routes/customer");
const executorRouter = require("./routes/executor");
const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use("/customer", customerRouter);
app.use("/executorR", executorRouter);

useErrorHandlers(app);

module.exports = app;
