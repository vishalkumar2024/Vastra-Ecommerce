import React from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";


function AddProducts() {
    return (
        <div>
            <div>
                <div>
                    <p>Product Title</p>
                    <input type="text" name="name" placeholder='Type title' />
                </div>
            </div>

            <div>
                <div>
                    <p>Price</p>
                    <input type="text" name="old_price" placeholder='Type Price' />
                </div>
                <div>
                    <p>Offer Price</p>
                    <input type="text" name="new_price" placeholder='Type Price' />
                </div>
            </div>

            <div>
                <p>Product category</p>
                <select name="category" id="">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div>
                <label htmlFor="file-input">
                    <IoCloudUploadOutline />
                </label>
                <input type="file" name='image' id='file-input' hidde />
            </div>
            
            <button>Add</button>
        </div>

    )
}

export default AddProducts
