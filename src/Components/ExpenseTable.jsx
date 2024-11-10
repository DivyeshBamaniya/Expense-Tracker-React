import React, { useState,useEffect } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({ expenses, setExpenses, expense, setExpense, editingRowId, setEditingRowId }) { 
  
  // const [FilteredData,setQuery] = useFilter(expenses, (data)=> data.category);
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
   const [filteredData, setQuery] = useFilter(expenses, (data)=>data.category)
  //***A Better Approach to implement Sorting
  const [sortCallback, setSortCallback] = useState(() => () => {})  

  // Calculates Total Amount
  const totalAmount = filteredData.reduce(
    (total, current)=> total + +current.amount, 0);

    useEffect(() => {
        // Read the value from local storage when the component mounts
        const savedValue = localStorage.getItem('dropdownValue');
        if (savedValue) {
          setSelectedValue(savedValue);
        }
    }, []);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        
        localStorage.setItem('dropdownValue', newValue);
        setQuery(event.target.value.toLowerCase())
    };
  
  return (
    <>
    {/* Context Menu */}
    <ContextMenu 
    menuPosition = {menuPosition} 
    setMenuPosition = {setMenuPosition}
    setExpenses = {setExpenses}
    rowId = {rowId}
    expenses = {expenses}
    expense={expense}
    setExpense = {setExpense}
    setEditingRowId = {setEditingRowId}
    editingRowId = {editingRowId}
    />

    <table className="expense-table" 
      onContextMenu={e=> e.preventDefault()}
      onClick = {()=> {if(menuPosition.left) setMenuPosition({})}
     }
    >
      <thead>
        <tr>
          
          <th>Title</th>
          <th> 
            <select value={selectedValue}
            onChange={handleChange}>
              <option value="" >All</option>
              <option value="grocery">Grocery</option>
              <option value="clothes">Clothes</option>
              <option value="bills">Bills</option>
              <option value="education">Education</option>
              <option value="medicine">Medicine</option>
            </select>
          </th>

          <th className="amount-column">
            <div>
              <span>Amount</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow up-arrow"
                onClick={()=>{
                  setSortCallback(() =>(a,b)=> a.amount - b.amount)
                }}
              >
                <title>Ascending</title>
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                viewBox="0 0 384 512"
                className="arrow down-arrow"
                onClick={()=>{
                  setSortCallback(() =>(a,b) => b.amount - a.amount)
                }}
              >
                <title>Descending</title>
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </div>

          </th>
        </tr>
      </thead>

      <tbody>
        {
            filteredData.sort(sortCallback).map(({id,category,title,amount})=>
                (
                    <tr key = { id } 
                        onContextMenu = {e => {
                        setMenuPosition({left:e.clientX + 6, top:e.clientY + 6})
                        setRowId(id)
                      }}
                    >
                        <td>{title}</td>
                        <td>{category}</td>
                        <td>₹{amount}</td>
                    </tr>
                )
            )
        }
        
        <tr>
         
            <th>Total</th>
            
            <th  onClick={ ()=> setSortCallback(()=>()=>{})}>Clear Sort</th> 
            <th>₹{totalAmount}</th>
        </tr>
      </tbody>
    </table>
    </>
  );
}