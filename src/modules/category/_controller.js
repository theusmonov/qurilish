import { createCategory, deleteAllCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryBy } from "./categoryService.js";



const AddCategory = async (req, res, next) => {
    try {
        const data = await createCategory(req, req.body);
        return res.status(201).json({message: 'Category added', newCategory: data});
    } catch (err) {
        next(err)
    }
}



const GetAllCategory = async (req, res, next) => {
    try {
        const data = await getAllCategories();
        return res.status(200).json({message: 'Category list', allCategory: data});
    } catch (err) {
        next(err)
    }
}



const GetCategoryById = async (req, res, next) => {
    try{
        const dataById = await getCategoryById(req.params.id);
        return res.status(200).json({message: 'Category with by ID', getCategoryById: dataById});
    } catch (err) {
        next(err)
    }
}

const UpdateCategory = async (req, res, next) => {
    try {
        const data = await updateCategoryBy(req.params.id, req.body, req);
        return res.status(200).json({message: 'Category updated', updatedData: data});
    } catch (err) {
        next(err)
    }
}


const DeleteAllCategory = async (req, res, next) => {
    try {
       const data = await deleteAllCategory()
        return res.status(200).json({message: 'All category deleted', deleteAllCategory: data});
    } catch (err) {
        next(err)
    }
}


const DeleteCategoryById = async (req, res, next) => {
    try {
        const dataDelById = await deleteCategoryById(req.params.id);
        return res.status(200).json({message: 'Category with deleted by ID', dataDeletedById: dataDelById});
    } catch (err) {
        next(err)
    }
}


export {AddCategory, GetAllCategory, GetCategoryById, UpdateCategory, DeleteAllCategory, DeleteCategoryById}