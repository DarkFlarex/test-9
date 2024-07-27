import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, ApiTransactions, Transaction} from "../types";
import {AppDispatch, RootState} from "../app/store";
import axiosApi from "../axiosApi";

export const fetchTransactions = createAsyncThunk<
    Transaction[],
    undefined,
    { dispatch: AppDispatch }
>('transaction/fetchTransaction', async () => {
    const dishesResponse = await axiosApi.get<ApiTransactions | null>('/transaction.json');
    const transactions = dishesResponse.data;

    let newTransaction: Transaction[] = [];

    if (transactions) {
        newTransaction = Object.keys(transactions).map((key: string) => {
            const dish = transactions[key];
            return {
                id: key,
                ...dish,
            };
        });
    }
    return newTransaction;
});

export const deleteTransaction = createAsyncThunk<void, string, { state: RootState }>(
    'transaction/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete('/transaction/' + transactionId + '.json');
    },
);

export const createTransaction = createAsyncThunk<void, ApiTransaction, { state: RootState }>(
    'transaction/create',
    async (apiTransaction) => {
        await axiosApi.post('/transaction.json', apiTransaction);
    },
);