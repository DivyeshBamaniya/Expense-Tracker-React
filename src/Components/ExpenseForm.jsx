import React, { useRef, useState } from "react";
import Input from "./Input";
import SelectMenu from "./SelectMenu";

export default function ExpenseForm({ setExpenses, expense, setExpense,editingRowId,setEditingRowId }) {
  
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 3, message: "Title should be at least 3 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [{ required: true, message: "Please enter an amount" },
      {minAmt: 1, message: 'amount must be greater than 0'}
    ],
    email: [
      { required: true, message: "Please enter an email" },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter a valid email",
      },
    ],
  };

  const validate = (formData) => { 
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        console.log(key,value, value.length);

        if (rule.minLength && value.length < 3) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }

        if(rule.minAmt && parseInt(value)<=0){
          errorsData[key] = rule.message;
          return true
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validator function call
    const validateResult = validate(expense);

    // If errors are there then return, No need to submit
    if (Object.keys(validateResult).length) return;

    // if(editingRowId){
    //   setExpenses(prevState =>
    //     prevState.map(singleElement =>{
    //       if(singleElement.id === editingRowId){
    //         return {...expense, id : editingRowId}
    //       }
    //       return prevState
    // }))
    // setExpense({
    //   title:'',
    //   amount : '',
    //   category : ''
    // })
    // setEditingRowId("")
    // return
    // }
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    // Reset input fields after submission
    setExpense({ title: "", category: "", amount: "" });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
    setErrors({});
  };
  
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {/* Title */}
      <Input
        label="Title"
        id="title"
        name="title"
        value = {expense.title}
        onChange={changeHandler}
        error={errors.title}
      />

      {/* Category */}
      <SelectMenu
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={changeHandler}
        error={errors.category}
        defaultOption="Select Category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />

      {/* Amount */}
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={changeHandler}
        error={errors.amount}
      />

      <button className="add-btn">{editingRowId? 'Save' : 'Add'}</button>
    </form>
  );
}
