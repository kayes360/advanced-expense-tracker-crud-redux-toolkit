import axiosInstance from "../../utils/axios";
 
export const addTransaction = async (transaction) => {
  const response = await axiosInstance.post("transactions", transaction);
  return response.data;
}; 

export const getTransactions = async () => {
  const response = await axiosInstance.get("transactions"); 
  return response.data;
};
export const editTransaction = async (id, updateFromData) => {
    console.log("updateapi id",id)
    console.log("updateapi id",updateFromData)
  const response = await axiosInstance.put(`transactions/${id}`, updateFromData);
  return response.data;
};
export const deleteTransaction = async (id) => {
  const response = await axiosInstance.delete(`transactions/${id}`);
  return response.data;
};
