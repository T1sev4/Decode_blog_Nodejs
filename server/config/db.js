const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/decodeBlog')
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch((e) => {
    console.log('Failed to connect to mongoDB');
  });
