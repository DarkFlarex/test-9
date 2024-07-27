import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction} from "../types";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";


export const createTransaction = createAsyncThunk<void, ApiTransaction, { state: RootState }>(
    'transaction/create',
    async (apiTransaction) => {
        await axiosApi.post('/transaction.json', apiTransaction);
    },
);