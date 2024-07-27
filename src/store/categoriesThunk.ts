import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategory} from "../types";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";

export const createCategory = createAsyncThunk<void, ApiCategory, { state: RootState }>(
    'categories/create',
    async (apiCategories) => {
        await axiosApi.post('/categories.json', apiCategories);
    },
);