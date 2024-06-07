import express from 'express';
import { publicRouter } from './route/public-api';
import { errorMiddleware } from './middleware/error-middleware';
import { apiRouter } from './route/api';

const app = express();
const port = 3000;

app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})