const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 2020;


//define paths for express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.set('views', path.join(__dirname, './views'));

app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require('./routes/pages');
app.use('/', router)


app.listen(PORT, () => {
    console.log('listening on port' + PORT);
})