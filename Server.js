const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const toDoRoutes = require('./routes/ToDoRoute');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on : ${PORT}`));



