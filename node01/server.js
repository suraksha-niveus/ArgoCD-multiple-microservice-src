'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('CICD using Argocd and jenkin .................. ');
  
});


app.get('/error', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
