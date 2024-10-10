import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {console.log('connected to mongoDB')});

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
    const statueCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });

});

app.listen(5000, () => {
  console.log('server is running on port 5000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);