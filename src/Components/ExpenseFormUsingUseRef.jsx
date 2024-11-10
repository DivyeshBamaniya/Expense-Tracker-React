import React, { useRef, useState } from 'react'

export default function ExpenseForm({ setExpenses }) {

  // const [expense, setExpense] = useState({});

  const titleRef = useRef()
  const categoryRef = useRef()
  const amountRef = useRef()

  const handleSubmit = e => {
    e.preventDefault();
    
    setExpenses((prevState) => ([...prevState, {
      id : crypto.randomUUID(),
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount : amountRef.current.value
  }])) 
  }
  
  // console.log(titleRef.current);
  
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      
      {/* Title */}
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input id="title" name="title"
        //  value={titleRef.current.value} 
        ref={ titleRef }
        //  onChange={e=> setExpense(prevExpense => ({...prevExpense, title: titleRef.current.value}))}
        />
      </div>

      {/* Category */}
      <div className="input-container">
        <label htmlFor="category">Category</label>
        
        <select id="category" name="category" ref={categoryRef}
        //  value={expense.category} 
        //  onChange={e=> setExpense(prevExpense => ({...prevExpense, category: e.target.value}))}
        >
          <option value="" hidden> Select Category </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>

      {/* Amount */}
      <div className="input-container">

        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" ref={amountRef}
        //  value={expense.amount}
        //  onChange={e=> setExpense(prevExpense => ({...prevExpense, amount:e.target.value}))}
         />

      </div>

      <button className="add-btn">Add</button>
    </form>
  )
}