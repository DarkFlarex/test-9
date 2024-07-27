import {Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTransaction, deleteTransaction, fetchTransactions} from "./transactionsThunks";

export interface DishesState {
    items:Transaction[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: false | string;
}

const initialState: DishesState = {
    items:[],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
};

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, { payload: items }) => {
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.fetchLoading = false;
            });

        builder
            .addCase(deleteTransaction.pending, (state, { meta: { arg: dishId } }) => {
                state.deleteLoading = dishId;
            })
            .addCase(deleteTransaction.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.deleteLoading = false;
            });

        builder
        .addCase(createTransaction.pending, (state) => {
            state.createLoading = true;
        })
        .addCase(createTransaction.fulfilled, (state) => {
            state.createLoading = false;
        })
        .addCase(createTransaction.rejected, (state) => {
            state.createLoading = false;
        });
    },
        selectors: {
            selectTransactions: (state) => state.items,
            selectFetchTransactionsLoading: (state) => state.fetchLoading,
            selectDeleteTransactionLoading: (state) => state.deleteLoading,
            selectCreateTransactionLoading: (state) => state.createLoading,
    },
});

export const transactionsReducer = transactionsSlice.reducer;

export const {
    selectTransactions,
    selectFetchTransactionsLoading,
    selectDeleteTransactionLoading,
    selectCreateTransactionLoading,
} = transactionsSlice.selectors;