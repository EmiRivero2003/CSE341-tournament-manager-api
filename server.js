const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const connectDB = require('./db/connect');
const passport = require('./config/passport');

const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const authRoutes = require('./routes/authRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// Required for secure cookies on Render
app.set('trust proxy', 1);

// General middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Authentication routes
app.use('/auth', authRoutes);

// API routes
app.use('/tournaments', tournamentRoutes);
app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);
app.use('/matches', matchRoutes);

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