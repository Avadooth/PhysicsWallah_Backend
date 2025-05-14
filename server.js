import express from 'express';
import cors from 'cors';
const app = express();
import deviceRoutes from './routes/Device.route.js';
import errorRoutes from './routes/Error.route.js';
import syncRoutes from './routes/Sync.route.js';


app.use(cors());
app.use(express.json());

app.use('/api/devices', deviceRoutes);
app.use('/api/errors', errorRoutes);
app.use('/api/sync', syncRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
