const express = require('express');
const helmet = require('helmet');
const path = require('path');
const db = require('../backend/db');
const routerHome = require('./routes/home');

const main = async () => {

  if (!process.env.JWTPRIVATEKEY) {
    console.error('Nie zdefiniowano "jwtPrivateKey"');
    process.exit(1);
  }

  const app = express();

  // database
  const connection = await db.connect();

  // global middlewares
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  console.log();
  app.use(express.static(path.join(__dirname, 'public')));
  
  // routes
  app.use('/', routerHome);

  // listening
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => { console.log(`[App] Server listening on http://${host}:${port}`) } );

}

main();
