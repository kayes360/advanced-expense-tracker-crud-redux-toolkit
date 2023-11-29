import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, editTransaction, deleteTransaction } from "./transactionsAPI";

//initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
  editing: {},
};

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (formData) => {
    const transaction = await addTransaction(formData);
    return transaction;
  }
);
 
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    console.log("transactions slice", transactions);
    return transactions;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updateFromData }) => {
    
    const transaction = await editTransaction(id, updateFromData);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
      //create transaction slice
      .addCase(createTransaction.pending, (state) => {
        (state.isError = false), (state.isLoading = true);
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        (state.isError = false),
          (state.isLoading = false),
          state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error?.message),
          (state.transactions = []);
      })
      // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

      //fetch transaction slice
      .addCase(fetchTransactions.pending, (state) => {
        (state.isError = false), (state.isLoading = true);
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        (state.isError = false),
          (state.isLoading = false),
          (state.transactions = action.payload);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error?.message),
          (state.transactions = []);
      });
  },
});

export default transactionsSlice.reducer;
export const { editActive, editInActive } = transactionsSlice.actions;
