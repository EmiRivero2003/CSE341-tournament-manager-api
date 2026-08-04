const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connect');
const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/tournaments', tournamentRoutes);
app.use('/tournaments', tournamentRoutes);
app.use('/teams', teamRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Tournament Manager API is running.'
  });
});

// 404 handler — must remain after all routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found.'
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();