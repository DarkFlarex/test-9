import {Category} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory} from "./categoriesThunk";


export interface CategoriesState{
    items: Category[];
    createCategoriesLoading: boolean;
}

const initialState: CategoriesState = {
    items: [],
    createCategoriesLoading: false,
};

export const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.createCategoriesLoading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.createCategoriesLoading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.createCategoriesLoading = false;
            });
        },
    selectors: {
        selectCreateCategoryLoading: (state) => state.createCategoriesLoading,
    },
});

export const categoriesReducer = categoriesSlice.reducer;


export const {
    selectCreateCategoryLoading,
} = categoriesSlice.selectors;