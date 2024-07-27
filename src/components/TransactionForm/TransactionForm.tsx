import React, { useState } from 'react';
import { ApiTransaction, TransactionMutation } from '../../types';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {Link} from "react-router-dom";

interface Props {
    onSubmit: (transaction: ApiTransaction) => void;
    existingTransaction?: ApiTransaction;
    isLoading?: boolean;
}

const emptyState: TransactionMutation = {
    type: '',
    category: '',
    amount: '',
    createdAt:'',
};

const TransactionView = [
    { title: 'Income', id: 'income' },
    { title: 'Expense', id: 'expense' },
];

const CategoryView = [
    { title: 'Salary', id: 'salary' },
    { title: 'Food', id: 'food' },
    { title: 'Drink', id: 'drink' },
];

const TransactionForm: React.FC<Props> = ({ onSubmit, existingTransaction, isLoading }) => {
    const initialState: TransactionMutation = existingTransaction
        ? { ...existingTransaction, amount: existingTransaction.amount.toString() }
        : emptyState;

    const [transactionMutation, setTransactionMutation] = useState<TransactionMutation>(initialState);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransactionMutation((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const now = new Date();
        const createdAt = now.toISOString();

        onSubmit({
            ...transactionMutation,
            amount: parseFloat(transactionMutation.amount),
            createdAt: existingTransaction ? existingTransaction.createdAt : createdAt,
        });
    };

    return (
        <form className="col-5 text-start" onSubmit={onFormSubmit}>
            <h4>{existingTransaction ? 'Edit transaction' : 'Add new transaction'}</h4>
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    required
                    className="form-control mb-3"
                    value={transactionMutation.type}
                    onChange={onFieldChange}
                >
                    <option value="">Select type</option>
                    {TransactionView.map((transaction) => (
                        <option key={transaction.id} value={transaction.id}>
                            {transaction.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    required
                    className="form-control mb-3"
                    value={transactionMutation.category}
                    onChange={onFieldChange}
                >
                    <option value="">Select category</option>
                    {CategoryView.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    required
                    className="form-control"
                    value={transactionMutation.amount}
                    onChange={onFieldChange}
                    placeholder="Amount"
                />
                <span> <strong>KGS</strong></span>
            </div>
            <div className="form-group">
                <Link to={'/'} type="submit" className="btn btn-primary me-5">
                    Cancel
                </Link>

                <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading && <ButtonSpinner/>}
                    {existingTransaction ? 'Update' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
