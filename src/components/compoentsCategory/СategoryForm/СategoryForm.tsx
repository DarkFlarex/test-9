import React, { useState } from 'react';
import {ApiCategory, CategoryMutation,} from '../../../types';
import ButtonSpinner from "../../Spinner/ButtonSpinner";
import {Link} from "react-router-dom";

interface Props {
    onSubmit: (category: ApiCategory) => void;
    existingCategory?: ApiCategory;
    isLoading?: boolean;

}

const emptyState: CategoryMutation = {
    type: '',
    name: '',
};

const TypeView = [
    { title: 'Income', id: 'income' },
    { title: 'Expense', id: 'expense' },
];

const NameView = [
    { title: 'Salary', id: 'salary' },
    { title: 'Food', id: 'food' },
    { title: 'Drink', id: 'drink' },
];

const CategoryForm: React.FC<Props> = ({ onSubmit, existingCategory, isLoading }) => {
    const initialState: CategoryMutation = existingCategory
        ? { ...existingCategory} : emptyState;

    const [categoryMutation, setCategoryMutation] = useState<CategoryMutation>(initialState);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCategoryMutation((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit({
            ...categoryMutation
        });
    };

    return (
        <form className="col-5 text-start" onSubmit={onFormSubmit}>
            <h4>{existingCategory ? 'Edit category' : 'Add new category'}</h4>
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    required
                    className="form-control mb-3"
                    value={categoryMutation.type}
                    onChange={onFieldChange}
                >
                    <option value="">Select type</option>
                    {TypeView.map((Type) => (
                        <option key={Type.id} value={Type.title}>
                            {Type.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Name</label>
                <select
                    name="name"
                    required
                    className="form-control mb-3"
                    value={categoryMutation.name}
                    onChange={onFieldChange}
                >
                    <option value="">Select category</option>
                    {NameView.map((name) => (
                        <option key={name.id} value={name.id}>
                            {name.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <Link to={'/'} type="submit" className="btn btn-primary me-5">
                    Cancel
                </Link>

                <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading && <ButtonSpinner/>}
                    {existingCategory ? 'Update' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
