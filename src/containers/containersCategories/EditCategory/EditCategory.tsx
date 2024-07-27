import {useEffect} from 'react';
import Spinner from "../../../components/Spinner/Spinner";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    selectFetchOneCategoryLoading,
    selectOneCategory,
    selectUpdateCategoryLoading
} from "../../../store/categoriesSlice";
import {ApiCategory} from "../../../types";
import {toast} from "react-toastify";
import {fetchOneCategory, updateCategory} from "../../../store/categoriesThunk";
import CategoryForm from "../../../components/compoentsCategory/СategoryForm/СategoryForm";

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(selectFetchOneCategoryLoading);
    const isUpdating = useAppSelector(selectUpdateCategoryLoading);
    const category = useAppSelector(selectOneCategory);

    const onSubmit = async (apiCategory: ApiCategory) => {
        try {
            await dispatch(updateCategory({ id, apiCategory })).unwrap();
            navigate('/categories');
            toast.success('Category updated!');
        } catch (e) {
            toast.error('Could not update Category!');
        }
    };

    useEffect(() => {
        dispatch(fetchOneCategory(id));
    }, [dispatch, id]);

    return (
        <div className="row mt-2">
            <div className="col">
                {isFetching && <Spinner/>}
                {category && (
                    <CategoryForm
                        onSubmit={onSubmit}
                        existingCategory={category}
                        isLoading={isUpdating}
                    />
                )}
            </div>
        </div>
    );
};

export default EditCategory;