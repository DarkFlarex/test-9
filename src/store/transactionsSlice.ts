import {Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTransaction} from "./transactionsThunks";

export interface DishesState {
    items:Transaction[];
    createLoading: boolean;
}

const initialState: DishesState = {
    items:[],
    createLoading: false,
};

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
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
            selectCreateTransactionLoading: (state) => state.createLoading,
    },
});

export const transactionsReducer = transactionsSlice.reducer;

export const {
    selectCreateTransactionLoading,
} = transactionsSlice.selectors;