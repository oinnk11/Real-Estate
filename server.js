const express = require('express');
const sequelize = require('./database/connection.js');
const route = require('./route/route.js'); // Ensure this is an Express router
const bcrypt = require('bcrypt'); // Import bcrypt

const path = require('path');

const session = require('express-session');


const User = require('./database/models/users.js');
const Booking = require('./database/models/bookings.js');
const Notification = require('./database/models/notifications.js');
const Property = require('./database/models/properties.js');
const Review = require('./database/models/reviews.js');
const Status = require('./database/models/status.js');
const Upload = require('./database/models/uploads.js');
const Role = require('./database/models/role.js');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory (optional if views are in a custom folder)
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set `secure: true` if using HTTPS
}));


// Test database connection and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync the models with the database
    await sequelize.sync();

    // Register middleware/routes BEFORE starting the server
    app.use(express.json()); // Optional: For JSON request bodies
    app.use('/', route); // Ensure `route` is an Express router

    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
