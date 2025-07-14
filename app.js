import express from 'express';
import cors from "cors"
import summarizeRoutes from './routes/summarize.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', summarizeRoutes);

export default app;
