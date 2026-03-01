import React, { useState } from 'react'
import upload from '../components/Assets/upload-image.png'


function AddProducts() {

    const [image, setImage] = useState(false)
    const handleUpload = (e) =>{
        setImage(e.target.files[0])
    }

    return (
        <div className='m-6 py-10 px-10 bg-white w-full'>

            <div className='w-full mb-5 '>
                <p className='text-[18px] mb-2 font-semibold text-gray-500'>Product Title</p>
                <input
                    type="text"
                    name="name"
                    placeholder='Type title'
                    className='border-2 outline-none border-gray-300 w-full p-2 rounded-md'
                />
            </div>

            <div className='w-full  flex gap-10 mb-5'>
                <div className='w-[50%]'>
                    <p className='text-[18px] mb-2 font-semibold text-gray-500'>Price</p>
                    <input
                        type="text"
                        name="old_price"
                        placeholder='Type Price'
                        className='border-2 outline-none border-gray-300 w-full p-2 rounded-md'
                    />
                </div>
                <div className='w-[50%] '>
                    <p className='text-[18px] mb-2 font-semibold text-gray-500'>Offer Price</p>
                    <input
                        type="text"
                        name="new_price"
                        placeholder='Type Price'
                        className='border-2 outline-none border-gray-300 w-full p-2 rounded-md'
                    />
                </div>
            </div>

            <div className=' w-[20%] mb-5'>
                <p className='text-[18px] mb-2 font-semibold text-gray-700'>Product category</p>
                <select className='border-2 border-gray-300 w-[80%] text-gray-500 p-2 rounded-md' name="category" id="">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className='w-[10%] flex items-baseline justify-center rounded-sm border-2 border-gray-400 cursor-pointer bg-gray-200 mb-5'>
                <label htmlFor="file-input">
                    <img 
                    src={image?URL.createObjectURL(image):upload}
                    className='size-20 cursor-pointer text-gray-500' />
                </label>

                <input
                    onChange={handleUpload}
                    type="file"
                    name='image'
                    id='file-input'
                    hidden
                />
            </div>

            <button className='text-[17px] uppercase text-white cursor-pointer font-semibold bg-blue-400 rounded-sm  px-10 py-2'>Add</button>
        </div>

    )
}

export default AddProducts
