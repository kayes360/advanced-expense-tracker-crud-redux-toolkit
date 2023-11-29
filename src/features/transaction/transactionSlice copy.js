import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionAPI";

//initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
};

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async () => {
  const transactions = await getTransactions();
  return transactions;
});

export const createTransaction = createAsyncThunk("transactions/createTransaction", async (formData) => {
  const transaction = await addTransaction(formData);
  return transaction;
});

export const updateTransaction = createAsyncThunk("transactions/updateTransaction", async ({id, updateData}) => {
  const transaction = await editTransaction(id, updateData);
  return transaction;
});

export const removeTransaction = createAsyncThunk("transactions/removeTransaction", async (id) => {
  const transaction = await deleteTransaction(id);
  return transaction;
});

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
        //fetch transaction slice
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false,
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false,
        state.isLoading = false,
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true,
        state.error = action.error?.message,
        state.transactions = [];
      })
        //create transaction slice
      .addCase(createTransaction.pending, (state) => {
        state.isError = false,
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => { 
        state.isError = false,
        state.isLoading = false,
        state.transactions.push(action.payload.transactions);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true,
        state.error = action.error?.message,
        state.transactions = [];
      })
        //update transaction slice
      .addCase(updateTransaction.pending, (state) => {
        state.isError = false,
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isError = false,
        state.isLoading = false;
        const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id)
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true,
        state.error = action.error?.message,
        state.transactions = [];
      })
        //remove transaction slice
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false,
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false,
        state.isLoading = false;
        state.transactions = state.transactions.filter(t => t.id !== action.payload) 
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true,
        state.error = action.error?.message,
        state.transactions = [];
      });
  },
});

export default transactionsSlice.reducer;

