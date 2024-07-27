import React from 'react';
import { Transaction } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

interface Props {
    transaction: Transaction;
    onDelete: VoidFunction;
    deleteLoading: false | string;
    Sign:string;
}

const TransactionItem: React.FC<Props> = ({ transaction, onDelete, deleteLoading,Sign }) => {

    return (
        <div className="card mb-2">
            <div className="row g-0">
                <div className="col-sm-8 ps-2">
                    <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                    <h5 className="card-title">{transaction.type}</h5>
                    <span className="card-text small">{transaction.category}</span>
                    <span className="card-text">
                       {Sign} {transaction.amount} KGS
                    </span>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-primary" to={`/edit-transaction/${transaction.id}`}>
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
