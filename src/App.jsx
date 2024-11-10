import { useState } from 'react'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseTable from './Components/ExpenseTable'
import expenseData from './ExpenseData'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData)
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [editingRowId, setEditingRowId] = useState('');
  console.log(expenses);
  
  return (
    <main>
      <div className='heading'>Expense Tracker</div>
      <div className="expense-tracker">
        <ExpenseForm 
        setExpenses = {setExpenses} 
        expense = {expense}
        setExpense = {setExpense}
        editingRowId={editingRowId}
        setEditingRowId = {setEditingRowId}
        />

        <ExpenseTable 
        expenses = {expenses} 
        setExpenses = {setExpenses} 
        expense = {expense}
        setExpense = {setExpense}
        editingRowId = {editingRowId}
        setEditingRowId = {setEditingRowId}
        />
      </div>
    </main>
  )
}

export default App