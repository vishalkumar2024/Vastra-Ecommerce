import React, { useState } from "react";
import upload from "../components/Assets/upload-image.png";
import axios from "axios";

function AddProducts() {
    const [image, setImage] = useState(false);
    const [productDetails, setproductDetails] = useState({
        id:"1221",
        name: "",
        image: "",
        category: "men",
        old_price: "",
        new_price: "",
    });

    const onChangeHandler = (e) => {
        setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddProduct = async () => {
        try {

            let product = productDetails;

            const formData = new FormData();
            formData.append("product", image);

            const response = await axios.post(
                "http://localhost:4000/upload",
                formData,
            );

            const responseData = response.data;

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
            }

            const { data } = await axios.post(
                "http://localhost:4000/api/product/addproducts",
                product,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            data.success
                ? alert("Product Added Successfully")
                : alert("Failed to add product");

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="py-2 px-8 m-7 bg-white w-full">
            <div className="w-full mb-8 ">
                <p className="text-[18px] mb-3 font-semibold text-gray-500">
                    Product Title
                </p>
                <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={onChangeHandler}
                    placeholder="Type title"
                    className="border-2 outline-none border-gray-300 w-full p-2 rounded-md"
                />
            </div>

            <div className="w-full  flex gap-10 mb-8">
                <div className="w-[50%]">
                    <p className="text-[18px] mb-3 font-semibold text-gray-500">Price</p>
                    <input
                        type="text"
                        name="old_price"
                        value={productDetails.old_price}
                        onChange={onChangeHandler}
                        placeholder="Type Price"
                        className="border-2 outline-none border-gray-300 w-full p-2 rounded-md"
                    />
                </div>
                <div className="w-[50%] ">
                    <p className="text-[18px] mb-3 font-semibold text-gray-500">
                        Offer Price
                    </p>
                    <input
                        type="text"
                        name="new_price"
                        value={productDetails.new_price}
                        onChange={onChangeHandler}
                        placeholder="Type Price"
                        className="border-2 outline-none border-gray-300 w-full p-2 rounded-md"
                    />
                </div>
            </div>

            <div className=" w-[20%] mb-8">
                <p className="text-[18px] mb-2 font-semibold text-gray-700">
                    Product category
                </p>
                <select
                    value={productDetails.category}
                    onChange={onChangeHandler}
                    className="border-2 border-gray-300 w-[80%] text-gray-500 p-2 rounded-md"
                    name="category"
                    id=""
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className="w-[10%] flex items-baseline justify-center rounded-sm border-2 border-gray-400 cursor-pointer bg-gray-200 mb-5">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload}
                        className="size-20 cursor-pointer text-gray-500"
                    />
                </label>

                <input
                    onChange={handleUpload}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                />
            </div>

            <button
                onClick={handleAddProduct}
                className="text-[17px] uppercase text-white cursor-pointer font-semibold bg-blue-400 rounded-sm  px-10 py-2"
            >
                Add
            </button>
        </div>
    );
}

export default AddProducts;
