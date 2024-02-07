import express from 'express';
import tasks from './routes/tasks.js';
import { connectDB } from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
import { notFound } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
