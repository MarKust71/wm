const mongoose = require('mongoose');

let mongoUrl;
if (process.env.MODE === 'dev') {
  mongoUrl = process.env.DB_DEV;
} else {
  mongoUrl = process.env.DB;
}

const connectionOnSuccessHandler = connection => {
  console.log(`[MongoDB] Connection to ${mongoUrl} established`);
  return connection;
};

const connectionOnErrorHandler = e => {
  console.log(`[MongoDB] Connection to ${mongoUrl} failed with error: ${e}`);
  return Promise.reject(e);
};

const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };

const connect = (options = defaultOptions) => {
  return mongoose.createConnection(`${mongoUrl}`, options)
    .then(connectionOnSuccessHandler, connectionOnErrorHandler);
};

module.exports = connect;
