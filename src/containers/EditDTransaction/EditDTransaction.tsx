import {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    selectFetchOneTransactionLoading,
    selectOneTransaction,
    selectUpdateTransactionLoading
} from "../../store/transactionsSlice";
import {ApiTransaction} from "../../types";
import {fetchOneTransaction, updateTransaction} from "../../store/transactionsThunks";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const EditDTransaction = () => {
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(selectFetchOneTransactionLoading);
    const isUpdating = useAppSelector(selectUpdateTransactionLoading);
    const transaction = useAppSelector(selectOneTransaction);

    const onSubmit = async (apiTransaction: ApiTransaction) => {
        try {
            await dispatch(updateTransaction({ id, apiTransaction })).unwrap();
            navigate('/');
            toast.success('Transaction updated!');
        } catch (e) {
            toast.error('Could not update Transaction!');
        }
    };

    useEffect(() => {
        dispatch(fetchOneTransaction(id));
    }, [dispatch, id]);

    return (
        <div className="row mt-2">
            <div className="col">
                {isFetching && <Spinner/>}
                {transaction && (
                    <TransactionForm
                        onSubmit={onSubmit}
                        existingTransaction={transaction}
                        isLoading={isUpdating}
                    />
                )}
            </div>
        </div>
    );
};

export default EditDTransaction;