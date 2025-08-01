const express = require("express");
const app = express();
const connectDB = require('./connect');
const router = require('./routes/experiencesRoutes');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/v1/experiences', router);

const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log("Server is running..."));
    } catch (err) {
        console.log(err);
    }
}

start();