import {Link} from "react-router-dom";

const Categories = () => {
    return (
        <>
            <div className="row col-12 d-flex align-items-center mb-5">
                <h3 className="col-6 text-start">
                    Categories:
                </h3>
                <div className="col-6 text-end">
                    <Link to='/new-categories' className="btn btn-primary">Add new categories</Link>
                </div>
            </div>
        </>
    );
};

export default Categories;