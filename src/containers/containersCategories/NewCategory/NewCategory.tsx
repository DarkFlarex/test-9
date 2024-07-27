import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCreateCategoryLoading} from "../../../store/categoriesSlice";
import {ApiCategory} from "../../../types";
import {toast} from "react-toastify";
import { createCategory} from "../../../store/categoriesThunk";
import CategoryForm from "../../../components/compoentsCategory/СategoryForm/СategoryForm";

const NewCategory = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreatingCategory = useAppSelector(selectCreateCategoryLoading);

    const onSubmit = async (category: ApiCategory) => {
        try {
            await dispatch(createCategory(category)).unwrap();
            navigate('/categories');
            toast.success('Category created');
        } catch (error) {
            toast.error('Could not create Category!');
        }
    };
    return (
        <div className="row mt-2">
            <div className="col">
                <CategoryForm onSubmit={onSubmit} isLoading={isCreatingCategory}/>
            </div>
        </div>
    );
};

export default NewCategory;