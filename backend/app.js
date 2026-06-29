import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, data: { status: 'ok' } });
});

app.use('/api/customers', customerRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.use(errorHandler);

export default app;
