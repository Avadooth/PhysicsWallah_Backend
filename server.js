import express from 'express';
import cors from 'cors';
import deviceRoutes from './routes/Device.route.js';
import errorRoutes from './routes/Error.route.js';
import syncRoutes from './routes/Sync.route.js'; // ✅ Add this

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/devices', deviceRoutes);
app.use('/api/errors', errorRoutes);
app.use('/api/sync', syncRoutes); // ✅ Use sync routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
