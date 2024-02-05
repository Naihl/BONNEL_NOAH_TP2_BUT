const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const port = 3000
const { connectToDB } = require('./services/db/connection');
const omdbRepository = require('./repositories/omdbRepository');
const users = require('./routes/userRoutes');
const items = require('./routes/itemRoutes');
const watchList = require('./routes/watchListRoutes');


app.use(express.json());


async function main() {
    try {
      const movieTitle = 'Inception';
      const movieInfo = await omdbRepository.searchItemByTitle(movieTitle);
      console.log('Movie Information:', movieInfo);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
main();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Home', message: 'Welcome to our website!' });
});



app.use((res,req,next) => {
  return next();
});


app.use('/users', users);
app.use('/items', items);
app.use('/watchList', watchList);

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    try {
      await connectToDB();
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  });