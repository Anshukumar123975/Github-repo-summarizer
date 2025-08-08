import express from 'express';
import { lightCrawl } from '../controllers/crawl.controllers.js';

const router = express.Router();

router.post('/light', lightCrawl);

export default router;
