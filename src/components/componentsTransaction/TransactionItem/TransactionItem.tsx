import React from 'react';
import { Transaction } from "../../../types";
import ButtonSpinner from "../../Spinner/ButtonSpinner";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

interface Props {
    transaction: Transaction;
    onDelete: VoidFunction;
    deleteLoading: false | string;
    Sign:string;
}

const TransactionItem: React.FC<Props> = ({ transaction, onDelete, deleteLoading,Sign }) => {

    const amountClass = transaction.type === 'expense' ? 'text-danger' : 'text-success';

    return (
        <div className="card mb-2">
            <div className="row d-flex align-items-center">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column flex-sm-row flex-grow-1">
                        <span className="fs-5 me-3">{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                        <span className="fs-5">{transaction.category}</span>
                    </div>
                    <div className="d-flex align-items-center">
                    <span className={`fs-5 ${amountClass} me-3`}>
                        {Sign} {transaction.amount} KGS
                    </span>
                        <Link className="btn btn-primary me-2" to={`/edit-transaction/${transaction.id}`}>
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={onDelete}
                            disabled={deleteLoading ? deleteLoading === transaction.id : false}
                        >
                            {deleteLoading && deleteLoading === transaction.id && (<ButtonSpinner />)}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
