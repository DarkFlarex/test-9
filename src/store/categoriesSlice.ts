import {ApiCategory, Category} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from "./categoriesThunk";

export interface CategoriesState{
    items: Category[];
    createCategoriesLoading: boolean;
    fetchLoading: boolean;
    deleteLoading: false | string;
    updateLoading: boolean;
    fetchOneLoading: boolean;
    oneTransaction: null | ApiCategory;
}

const initialState: CategoriesState = {
    items: [],
    createCategoriesLoading: false,
    fetchLoading: false,
    deleteLoading: false ,
    updateLoading: false,
    fetchOneLoading: false,
    oneTransaction: null ,
};

export const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, { payload: items }) => {
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.fetchLoading = false;
            });

        builder
            .addCase(deleteCategory.pending, (state, { meta: { arg: dishId } }) => {
                state.deleteLoading = dishId;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.deleteLoading = false;
            });

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

        builder
            .addCase(fetchOneCategory.pending, (state) => {
                state.oneTransaction = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneCategory.fulfilled, (state, { payload: apiCategory }) => {
                state.oneTransaction = apiCategory;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneCategory.rejected, (state) => {
                state.fetchOneLoading = false;
            });
        builder
            .addCase(updateCategory.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.updateLoading = false;
            });
        },
    selectors: {
        selectCategories: (state) => state.items,
        selectFetchCategoriesLoading: (state) => state.fetchLoading,
        selectDeleteCategoryLoading: (state) => state.deleteLoading,
        selectCreateCategoryLoading: (state) => state.createCategoriesLoading,
        selectFetchOneCategoryLoading: (state) => state.fetchOneLoading,
        selectUpdateCategoryLoading: (state) => state.updateLoading,
        selectOneCategory: (state) => state.oneTransaction,
    },
});

export const categoriesReducer = categoriesSlice.reducer;


export const {
    selectCategories,
    selectFetchCategoriesLoading,
    selectDeleteCategoryLoading,
    selectCreateCategoryLoading,
    selectFetchOneCategoryLoading,
    selectUpdateCategoryLoading,
    selectOneCategory,
} = categoriesSlice.selectors;