const Sequelize = require('sequelize') ; 

const sequelize = new Sequelize('expenses' , 'root' , '876722'  , {
    dialect : 'mysql' , 
    host : 'localhost' 
}); 

module.exports = sequelize ; 

