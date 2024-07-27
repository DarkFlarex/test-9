import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories, selectDeleteCategoryLoading, selectFetchCategoriesLoading} from "../../store/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";
import {toast} from "react-toastify";
import {deleteCategory, fetchCategories} from "../../store/categoriesThunk";
import {useEffect} from "react";
import CategoryItem from "../../components/categoryItem/categoryItem";



const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const deleteCategoryLoading = useAppSelector(selectDeleteCategoryLoading);
    const categoriesLoading = useAppSelector(selectFetchCategoriesLoading);

    const removeCategory = async (id: string) => {
        try {
            if (window.confirm('Are you sure you want to delete this Category?')) {
                await dispatch(deleteCategory(id));
                await dispatch(fetchCategories());
                toast.success('Transaction deleted');

            }
        } catch (error) {
            toast.error('Could not delete Transaction!');
        }
    };
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
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
            {categoriesLoading ? (
                <Spinner />
            ) : (
                categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onDelete={() => removeCategory(category.id)}
                        deleteLoading={deleteCategoryLoading}
                    />
                ))
            )}


        </>
    );
};

export default Categories;