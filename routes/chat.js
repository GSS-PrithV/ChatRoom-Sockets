import express from 'express';
import { Router } from 'express';
import {createServer} from 'http';

const router = Router();
const app = express();
const server = createServer(app);

router.route('/')
.get('/', (req,res) => {
    res.send('Hello World');
});


export default router;