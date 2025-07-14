import express from 'express';
import { handleRepoSummarization } from '../controllers/summarize.controllers.js';

const router = express.Router();

router.post('/summarize', handleRepoSummarization);

export default router;
