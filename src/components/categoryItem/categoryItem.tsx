import React from 'react';
import {Category} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {Link} from "react-router-dom";

interface Props {
    category: Category;
    onDelete: VoidFunction;
    deleteLoading: false | string;
}


const TransactionItem:React.FC<Props> = ({category ,onDelete,deleteLoading}) => {

    return (
        <div className="card mb-2">
            <div className="row g-0">
                <div className="col-sm-8 ps-2">
                    <h5 className="card-title">{category.type}</h5>
                    <span className="card-text small">{category.name}</span>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-primary" to={`/edit-category/${category.id}`}>
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={onDelete}
                            disabled={deleteLoading ? deleteLoading === category.id : false}
                        >
                            {deleteLoading && deleteLoading === category.id && (<ButtonSpinner/>)}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;