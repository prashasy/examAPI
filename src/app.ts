import express from 'express';
import { json } from 'body-parser';
import router from './Routes';

const app = express();
app.use(json());
app.use(router);
app.listen(4000, () => {
    console.log('server is listening on port 3000');
})