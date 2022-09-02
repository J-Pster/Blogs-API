const express = require('express');

// ...

const app = express();

app.use(express.json());

// Middlewares
const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const categoriesRouter = require('./routers/categoriesRouter');

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

// Error Middlwares
const errorMiddleware = require('./middlewares/genericErrors');

app.use(errorMiddleware.errJoi);
app.use(errorMiddleware.errNotJoi);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
