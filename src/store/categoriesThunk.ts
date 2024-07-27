import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategories, ApiCategory, Category} from "../types";
import {AppDispatch, RootState} from "../app/store";
import axiosApi from "../axiosApi";



export const fetchCategories = createAsyncThunk<
    Category[],
    undefined,
    { dispatch: AppDispatch }
>('categories/fetchCategories', async () => {
    const categoriesResponse = await axiosApi.get<ApiCategories | null>('/categories.json');
    const categories = categoriesResponse.data;

    let newCategories: Category[] = [];

    if (categories) {
        newCategories = Object.keys(categories).map((key: string) => {
            const category = categories[key];
            return {
                id: key,
                ...category,
            };
        });
    }
    return newCategories;
});

export const deleteCategory = createAsyncThunk<void, string, { state: RootState }>(
    'categories/deleteCategory',
    async (CategoryId) => {
        await axiosApi.delete('/categories/' + CategoryId + '.json');
    },
);



export const createCategory = createAsyncThunk<void, ApiCategory, { state: RootState }>(
    'categories/create',
    async (apiCategories) => {
        await axiosApi.post('/categories.json', apiCategories);
    },
);