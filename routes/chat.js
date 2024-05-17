import express from 'express';
import { Router } from 'express';
import {createServer} from 'http';
import path from 'path';

const router = Router();
const app = express();
const server = createServer(app);


router
    .route('/Rooms')

    .get(async (req, res) => {
        res.sendFile(path.resolve('views/rooms.html'));
    })

    .post(async (req, res) => {
        res.sendFile(path.resolve('views/rooms.html'));
    })

router
    .route('/Rooms/:id')
    .get(async (req, res) => {
        res.sendFile(path.resolve('views/index.html'));
    })

    .post(async (req, res) => {
        res.sendFile(path.resolve('views/index.html'));
    });

export default router;