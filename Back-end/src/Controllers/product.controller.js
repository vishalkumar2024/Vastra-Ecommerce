import { FileModel } from '../Models/file.model.js'

// Function to add products to the database
const addProducts = async (req, res) => {
    try {

        const { id, name, image, category, old_price, new_price } = req.body;

        const product = await FileModel.create({
            id,
            name,
            image,
            category,
            old_price,
            new_price,
        })

        await product.save();

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "could not create the product",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product has been successfully created",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "could not create the product in the database",
        })
    }
}

// Function to remove products from the database
const removeProduct = async (req, res) => {
    try {
        const deletedProduct = await FileModel.findOneAndDelete({ id: req.body.id })

        return res.status(200).json({
            success: true,
            message: "Successfully removed the product",
            deletedProduct:deletedProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not remove the product",
        })
    }



}

// Function to fetch all the products
const getAllProducts = async (req, res) => {
    try {
        const products = await FileModel.find()

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the products",
            data: products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
        })
    }
}

export { addProducts, removeProduct, getAllProducts }