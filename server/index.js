const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../client/dist/')});
  })

app.use('/api', router);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})

module.exports = app;