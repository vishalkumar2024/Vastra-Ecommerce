import {FileModel} from '../Models/file.model.js'


const addProducts = async (req, res) =>{

    const {id, name, image, category,old_price, new_price } = req.body;

    const product = await  FileModel.create({
        id,
        name,
        image,
        category,
        old_price,
        new_price,
    })

    await product.save();

    if(!product){
            return res.status(500).json({
            success:false,
            message:"could not create the product",
        })
    }

    return res.status(200).json({
        success:true,
        message:"Product has been successfully created",
        data:product
    })
}

export {addProducts}