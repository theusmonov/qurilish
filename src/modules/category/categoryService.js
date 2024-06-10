import {Op} from "sequelize"
import { Category } from "../../models/Category.js";
import { BadRequestError, NotFoundError } from "../../shared/errors/classes.js";
import { Product } from "../../models/Product.js";




const createCategory = async (req, data) => {
    const { filename } = req.file;
    const { categoryName } = data;

    const checkCategory = await Category.findOne({
        where: {
            categoryName: {
                [Op.iLike] : categoryName
            }
        }
    });

    if (checkCategory) {
        throw new BadRequestError('Category already exists');
    }

    const newData = await Category.create({
        categoryName,
        categoryImage: `${filename}`,
    });

    return newData;
};




const getAllCategories = async () => {
    const getData = await Category.findAll({
        include: Product
    });

    if(getData.length === 0) {
        throw new NotFoundError("Category not found");
    }

    const data = getData.map(category => ({
        id: category.id,
        categoryName: category.categoryName,
        categoryImage: `http://localhost:6987/${category.categoryImage}`,
        productCount: category.Products.length
    }));


    return data;
}


const getCategoryById = async (id) => {
    const dataById = await Category.findOne({
        where: {id},
        include: [Product]
    })

    if(!dataById){
        throw new NotFoundError(`Category with id ${id} not found`);
    }

    dataById.categoryImage = `http://localhost:6987/${dataById.categoryImage}`;

    dataById.Products = dataById.Products.map(product => {
        product.img = `http://localhost:6987/${product.img}`;
        return product;
    });

    return dataById;
}



const updateCategoryBy = async (id, data, req) => {
    const { filename } = req.file;
    const updateData = await Category.findByPk(id);
    if(!updateData){
        throw new NotFoundError(`Category with ID ${id} not found`);
    }

    const newUpdateData = {
        categoryName :  data.categoryName ? data.categoryName : updateData.categoryImage,
        categoryImage : filename ? `${filename}` : updateData.categoryImage,
    }

    await updateData.update(newUpdateData);
    return updateData;
}



const deleteAllCategory = async () => {
    const categories = await Category.findAll();
 
    if(!categories.length) {
        throw new NotFoundError("Deleted category not found");
    }
 
    await Category.destroy({where: {}, force: true});
    return {message: "All categories have been deleted", deletedCount: categories.length};
 }
 


 const deleteCategoryById = async (id) => {
    const categoryId = await Category.findByPk(id)

    if(!categoryId){
        throw new NotFoundError(`Category with id ${id} not found`);
    }

    await categoryId.destroy();
    const products = await Product.findAll({ where: { category_id: id } });

    for (const product of products) {
        await product.destroy();
    }
    
    return {message: `Category with id ${id} deleted successfully`};
}




export {createCategory, getAllCategories, getCategoryById, updateCategoryBy, deleteAllCategory, deleteCategoryById}