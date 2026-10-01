const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const userRouter = require('./routes/userRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api/auth', userRouter);

// API documentation (Swagger UI)
const swaggerDocument = YAML.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve the React build from the 'view' folder in production
if (process.env.NODE_ENV === 'production') {
  const viewPath = path.join(__dirname, 'view');
  app.use(express.static(viewPath));
  // React Router fallback: any non-API GET returns index.html
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(viewPath, 'index.html'));
    }
    next();
  });
}

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;