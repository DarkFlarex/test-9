import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, ApiTransactions, Transaction} from "../types";
import {AppDispatch, RootState} from "../app/store";
import axiosApi from "../axiosApi";

export const fetchTransactions = createAsyncThunk<
    Transaction[],
    undefined,
    { dispatch: AppDispatch }
>('transactions/fetchTransactions', async () => {
    const transactionsResponse = await axiosApi.get<ApiTransactions | null>('/transactions.json');
    const transactions = transactionsResponse.data;

    let newTransactions: Transaction[] = [];

    if (transactions) {
        newTransactions = Object.keys(transactions).map((key: string) => {
            const transaction = transactions[key];
            return {
                id: key,
                ...transaction,
            };
        });
    }
    return newTransactions;
});

export const deleteTransaction = createAsyncThunk<void, string, { state: RootState }>(
    'transactions/deleteTransaction',
    async (transactionId) => {
        await axiosApi.delete('/transactions/' + transactionId + '.json');
    },
);

export const createTransaction = createAsyncThunk<void, ApiTransaction, { state: RootState }>(
    'transactions/create',
    async (apiTransaction) => {
        await axiosApi.post('/transactions.json', apiTransaction);
    },
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string, { state: RootState }>(
    'transactions/fetchOne',
    async (id) => {
        const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
            `/transactions/${id}.json`,
        );

        if (transaction === null) {
            throw new Error('Not found');
        }

        return transaction;
    },
);

export interface UpdateTransactionArg {
    id: string;
    apiTransaction: ApiTransaction;
}

export const updateTransaction = createAsyncThunk<void, UpdateTransactionArg, { state: RootState }>(
    'transactions/update',
    async ({ id, apiTransaction }) => {
        await axiosApi.put(`/transactions/${id}.json`, apiTransaction);
    },
);