import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { selectCreateTransactionLoading } from '../../store/transactionsSlice';
import { ApiTransaction } from '../../types';
import { createTransaction } from '../../store/transactionsThunks';
import { toast } from 'react-toastify';
import TransactionForm from '../../components/TransactionForm/TransactionForm';

const NewTransaction: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectCreateTransactionLoading);

    const onSubmit = async (transaction: ApiTransaction) => {
        try {
            await dispatch(createTransaction(transaction)).unwrap();
            navigate('/');
            toast.success('Transaction created');
        } catch (error) {
            toast.error('Could not create transaction!');
        }
    };

    return (
        <div className="row mt-2">
            <div className="col">
                <TransactionForm onSubmit={onSubmit} isLoading={isCreating} />
            </div>
        </div>
    );
};

export default NewTransaction;
