import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../features/transaction/transactionsSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { isLoading, isError } = useSelector((state) => state.transactions);
  const { editing } = useSelector((state) => state.transactions);

  const dispatch = useDispatch();
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updateFromData = {
        name: name,
        type: type,
        amount: amount,
      };
 
      dispatch(updateTransaction({ id: editing?.id, updateFromData }));
      setEditMode(false)
    } else {
      const updateFromData = {
        name,
        type,
        amount: Number(amount),
      };
      dispatch(createTransaction(updateFromData));
    }

    reset();
  };

  const handleCancelEdit = () => {
    reset();
    setEditMode(false);
  };

  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <label htmlFor="transaction_type">Income</label>
            <input
              type="radio"
              name="transaction_type"
              placeholder="Income"
              checked={type === "Income"}
              value="Income"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              placeholder="Expense"
              checked={type === "Expense"}
              value="Expense"
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`btn ${editMode ? "green" : ""}`}
        >
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <p className="error">There was an error occured</p>
        )}
      </form>
      {editMode && (
        <button className="btn" onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}
