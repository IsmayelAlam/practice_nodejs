const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('get from the server'));
app.post('/', (req, res) => res.send('post data to the server'));

const port = 3000;

app.listen(port, () => console.log('app running'));
