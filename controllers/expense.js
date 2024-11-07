const expenseRecord = require('../model/expenses');

// Get function
const getExp = async (req, res) => {
    try {
        const expense = await expenseRecord.findAll();
        res.json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error' });
    }
};

// Post function
const addExp = async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ success: false, message: "Missing Expense" });
        }

        const expense = await expenseRecord.create({ amount, description, category });
        res.status(201).json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error to add expenses" });
    }
};

// Delete function
const delExp = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await expenseRecord.findByPk(id);

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense ID not found' });
        }

        await expense.destroy();
        res.status(200).json({ success: true, message: 'Expense Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error to delete Expense' });
    }
};

//edit function 
const editExp = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;

        // Check if the expense exists
        const expense = await expenseRecord.findByPk(id);

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense ID not found' });
        }

        // Update the expense with the new data
        expense.amount = amount;
        expense.description = description;
        expense.category = category;

        // Save the updated expense record
        await expense.save();

        res.status(200).json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error to update expense' });
    }
};
module.exports = { getExp, addExp, delExp , editExp };
