const express = require('express');
const sequelize = require('./model/expenses');
const bodyParser = require('body-parser');
const routes = require('./routes/expens');

const app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/expenses', routes);

sequelize.sync()  
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
