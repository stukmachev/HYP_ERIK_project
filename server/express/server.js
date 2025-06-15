const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
app.use(cors())
const PORT = 8080;

// db connection
const sequelize = require('./config/database');

app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'public/img')))

//routes
const teacherRoutes = require('./routes/teachers');
const categoryRoutes = require('./routes/categories');
const requestRoutes = require('./routes/requests');
const activityRoutes = require('./routes/activities');

// Routes
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/activities', activityRoutes);

// sync db
sequelize.sync()
    .then(() => {
      console.log('Database synced');

      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error syncing database:', err);
    });
