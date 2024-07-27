import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    selectDeleteTransactionLoading,
    selectFetchTransactionsLoading,
    selectTransactions
} from "../../store/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";
import TransactionItem from "../../components/Transaction/TransactionItem";
import {deleteTransaction, fetchTransactions} from "../../store/transactionsThunks";
import {toast} from "react-toastify";

const Transaction = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const deleteTransactionLoading = useAppSelector(selectDeleteTransactionLoading);
    const transactionsLoading = useAppSelector(selectFetchTransactionsLoading);

    const removeTransaction = async (id: string) => {
        try {
            if (window.confirm('Are you sure you want to delete this Transaction?')) {
                await dispatch(deleteTransaction(id));
                await dispatch(fetchTransactions());
                toast.success('Transaction deleted');

            }
        } catch (error) {
            toast.error('Could not delete Transaction!');
        }
    };

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <>
            <h4>Transaction</h4>
            {transactionsLoading ? (
                <Spinner />
            ) : (
                transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onDelete={() => removeTransaction(transaction.id)}
                        deleteLoading={deleteTransactionLoading}
                    />
                ))
            )}
        </>
    );
};

export default Transaction;