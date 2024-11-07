document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let editingExpense = null;  // To track the expense being edited

    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = expenseForm['amount'].value;
        const description = expenseForm['description'].value;
        const category = expenseForm['category'].value;

        try {
            if (editingExpense) {
                //edit function
                const response = await axios.put(`/expenses/${editingExpense.id}`, { amount, description, category });
                if (response.data && response.data.expense) {
                    console.log("Expense updated:", response.data.expense);
                    displayExpense(response.data.expense);  
                    editingExpense = null;  
                    expenseForm.reset();  
                }
            } else {
                // post funtion
                const response = await axios.post('/expenses', { amount, description, category });
                if (response.data && response.data.expense) {
                    console.log("Expense added:", response.data.expense);
                    displayExpense(response.data.expense);  
                    expenseForm.reset();  // Clear the form after adding
                }
            }
        } catch (error) {
            console.log("Error adding/editing expense:", error.message);
        }
    });

    async function fetchExpenses() {
        try {
            //get function
            const response = await axios.get('/expenses');
            const expenses = response.data.expense;

            if (expenses && Array.isArray(expenses)) {
                expenseList.innerHTML = '';  
                console.log("Expenses fetched successfully:", expenses);
                expenses.forEach(expense => displayExpense(expense));  // Display each expense
            } else {
                console.log("No expenses found or unexpected data format:", response.data);
            }
        } catch (error) {
            console.log("Error fetching expenses:", error.message);
        }
    }

    function displayExpense(expense) {
        const expenseContainer = document.createElement('li');

        if (!expense.amount || !expense.description || !expense.category || !expense.id) {
            console.log("Incomplete expense data:", expense);
            return;
        }

        const expenseText = document.createElement('span');
        expenseText.textContent = `${expense.amount}, ${expense.description}, ${expense.category}`;

        const editBtn = document.createElement('button');
        editBtn.setAttribute('data-id', expense.id);
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('data-id', expense.id);
        deleteBtn.textContent = 'Delete';

        expenseContainer.appendChild(expenseText);
        expenseContainer.appendChild(editBtn);
        expenseContainer.appendChild(deleteBtn);
        expenseList.appendChild(expenseContainer);

    
        editBtn.addEventListener('click', () => {
            expenseForm['amount'].value = expense.amount;
            expenseForm['description'].value = expense.description;
            expenseForm['category'].value = expense.category;
            editingExpense = expense;  
        });

        // delete function
        deleteBtn.addEventListener('click', async () => {
            try {
                const response = await axios.delete(`/expenses/${expense.id}`);
                if (response.data && response.data.success) {
                    console.log("Expense deleted:", expense.id);
                    expenseContainer.remove();  // Remove the expense from the list
                } else {
                    console.log("Error deleting expense:", response.data);
                }
            } catch (error) {
                console.log("Error deleting expense:", error.message);
            }
        });
    }

    fetchExpenses(); 
});
