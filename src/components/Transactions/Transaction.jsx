import React from "react";
import EditIcon from "/edit.svg";
import DeleteIcon from "/delete.svg";
import { useDispatch } from "react-redux";
import { editActive, removeTransaction } from "../../features/transaction/transactionsSlice";

export default function Transaction({ transaction }) {
  const { name, type, amount, id } = transaction;
  const dispatch = useDispatch();
  console.log("transction type", type);

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };
  const handleDelete = (id) => {
    console.log(id)
    dispatch(removeTransaction(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={EditIcon} />
        </button>
        <button className="link">
          <img className="icon" src={DeleteIcon} onClick={()=>handleDelete(id)}/>
        </button>
      </div>
    </li>
  );
}
