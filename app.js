import express from 'express';
import cors from "cors"
import crawlRoutes from './routes/crawl.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/crawl', crawlRoutes);

export default app;
