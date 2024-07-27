import {ApiTransaction, Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    createTransaction,
    deleteTransaction,
    fetchOneTransaction,
    fetchTransactions,
    updateTransaction
} from "./transactionsThunks";

export interface DishesState {
    items:Transaction[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: false | string;
    updateLoading: boolean;
    fetchOneLoading: boolean;
    oneTransaction: null | ApiTransaction;
}

const initialState: DishesState = {
    items:[],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
    updateLoading: false,
    fetchOneLoading: false,
    oneTransaction: null,
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
        builder
            .addCase(fetchOneTransaction.pending, (state) => {
                state.oneTransaction = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneTransaction.fulfilled, (state, { payload: apiTransaction }) => {
                state.oneTransaction = apiTransaction;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneTransaction.rejected, (state) => {
                state.fetchOneLoading = false;
            });

        builder
            .addCase(updateTransaction.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.updateLoading = false;
            });
    },
        selectors: {
            selectTransactions: (state) => state.items,
            selectFetchTransactionsLoading: (state) => state.fetchLoading,
            selectDeleteTransactionLoading: (state) => state.deleteLoading,
            selectCreateTransactionLoading: (state) => state.createLoading,
            selectFetchOneTransactionLoading: (state) => state.fetchOneLoading,
            selectUpdateTransactionLoading: (state) => state.updateLoading,
            selectOneTransaction: (state) => state.oneTransaction,
        },
});

export const transactionsReducer = transactionsSlice.reducer;

export const {
    selectTransactions,
    selectFetchTransactionsLoading,
    selectDeleteTransactionLoading,
    selectCreateTransactionLoading,
    selectFetchOneTransactionLoading,
    selectUpdateTransactionLoading,
    selectOneTransaction,
} = transactionsSlice.selectors;