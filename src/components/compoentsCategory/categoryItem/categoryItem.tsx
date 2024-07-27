import React from 'react';
import {Category} from "../../../types";
import ButtonSpinner from "../../Spinner/ButtonSpinner";
import {Link} from "react-router-dom";

interface Props {
    category: Category;
    onDelete: VoidFunction;
    deleteLoading: false | string;
}

const TransactionItem:React.FC<Props> = ({category ,onDelete,deleteLoading}) => {
    const typeClass = category.type >= 'income'? 'text-success' : 'text-danger';

    return (
            <div className="card mb-2">
                <div className="row col-12">
                    <div className="d-flex col-10 justify-content-between align-items-center col-12 ps-2">
                        <div>
                              <span className="card-text fs-5">
                                {category.name}
                              </span>
                        </div>
                        <div className="d-flex col-2 align-items-center gap-2">
                            <h5 className={typeClass}>{category.type}</h5>
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