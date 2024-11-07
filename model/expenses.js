const Sequelize = require('sequelize');
const sequelize = require('../util/databases');

const expenseRecord = sequelize.define('expensetable', {
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'expensetables', 
    timestamps: true
});

module.exports = expenseRecord;

