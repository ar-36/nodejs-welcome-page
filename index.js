const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('welcome', {
    version: process.versions.node,
    os: process.platform
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});