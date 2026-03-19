import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import removeIcon from "../Components/Assets/cart_cross_icon.png";

function CartItem() {
    const { allProducts, cartItems, getTotalAmount, removeFromCart } = useContext(ShopContext);

    return (
        <div className='min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4 md:px-10'>
            <div className='max-w-[1200px] mx-auto'>

                {/* Header Section */}
                <div className='mb-10'>
                    <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Shopping <span className='text-cyan-600'>Bag</span></h1>
                    <p className='text-gray-500 font-medium mt-2'>Review your selected items before checkout.</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-10'>

                    {/* Left Side: Product List */}
                    <div className='w-full lg:w-[65%] space-y-4'>
                        <div className='hidden sm:grid grid-cols-6 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400'>
                            <p className='col-span-2'>Product</p>
                            <p className='text-center'>Price</p>
                            <p className='text-center'>Quantity</p>
                            <p className='text-center'>Total</p>
                            <p className='text-right'>Action</p>
                        </div>

                        {allProducts.map((item) => {
                            if (cartItems[item.id] > 0) {
                                return (
                                    <div key={item.id} className='group bg-white rounded-3xl p-5 mb-4 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-white hover:border-[#059669]/30 transition-all duration-300'>

                                        <div className='flex flex-col sm:grid sm:grid-cols-6 items-center gap-4'>

                                            {/* 1. Product Image & Info */}
                                            <div className='w-full sm:col-span-2 flex items-center gap-4'>

                                                <div className='w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100'>
                                                    <img src={item.image} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='font-bold text-gray-900 text-sm sm:text-base leading-tight'>{item.name}</p>

                                                </div>

                                                {/*  Remove Button  */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className='sm:hidden p-2 bg-red-50 text-red-500 rounded-xl'
                                                >
                                                    <img src={removeIcon} className='w-3 h-3' alt="Remove" />
                                                </button>
                                            </div>

                                            <div className='w-full  sm:contents flex items-center justify-between pt-4 px-3 border-t border-gray-50 sm:border-0 sm:mt-0 sm:pt-0'>

                                                {/* Price*/}
                                                <p className='hidden sm:block text-center font-bold text-gray-600'>${item.new_price}</p>

                                                {/* Quantity Selector */}
                                                <div className='flex items-center gap-2 sm:justify-center'>
                                                    <span className='sm:hidden text-[10px] font-bold text-gray-400 uppercase'>Qty:</span>
                                                    <div className='flex items-center justify-center w-10 h-8 sm:w-12 sm:h-10 bg-gray-50 rounded-xl border border-gray-200 font-black text-gray-700 text-sm'>
                                                        {cartItems[item.id]}
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className='text-right sm:text-center'>
                                                    <span className='sm:hidden block text-[10px] font-bold text-[#059496] uppercase'>Total</span>
                                                    <p className='font-black text-[#059496] text-base sm:text-lg'>
                                                        ${item.new_price * cartItems[item.id]}
                                                    </p>
                                                </div>

                                                <div className='hidden sm:flex justify-end'>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className='p-3 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors group/btn'
                                                    >
                                                        <img src={removeIcon} className='w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity' alt="Remove" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Right Side: Summary & Checkout */}
                    <div className='w-full lg:w-[35%] space-y-6'>
                        <div className='bg-white rounded-[32px] p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-white'>
                            <h2 className='text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight'>Order Summary</h2>

                            <div className='space-y-4'>
                                <div className='flex justify-between text-gray-500 font-medium'>
                                    <p>Subtotal</p>
                                    <p className='text-gray-900'>${getTotalAmount()}</p>
                                </div>
                                <div className='flex justify-between text-gray-500 font-medium'>
                                    <p>Shipping Fee</p>
                                    <p className='text-[#059496] font-bold'>FREE</p>
                                </div>
                                <div className='h-[1px] bg-gray-100 my-4'></div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-lg font-black text-gray-900 uppercase'>Total</p>
                                    <p className='text-2xl font-black text-[#059496]'>${getTotalAmount()}</p>
                                </div>
                            </div>

                            <button className='w-full h-16 bg-[#11a3a5] text-white rounded-2xl mt-8 font-black uppercase tracking-widest shadow-[0_10px_25px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300'>
                                Proceed To Checkout
                            </button>
                        </div>

                        {/* Promo Code Card */}
                        <div className='bg-white rounded-3xl p-6 shadow-sm border border-gray-100'>
                            <p className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-4'>Have a promo code?</p>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    placeholder='Code'
                                    className='flex-1 bg-gray-50 border w-[60%] border-gray-100 rounded-xl px-4 outline-none focus:border-[#059669] transition-all'
                                />
                                <button className='bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors'>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;


















// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import removeIcon from "../Components/Assets/cart_cross_icon.png"
// function CartItem() {
//     const { allProducts, cartItems,getTotalAmount, removeFromCart } = useContext(ShopContext)

//     return (
//         <div id='cartItem' className='w-[86%] mx-auto  pt-[100px] pb-32 max-lg:pt-[70px] max-md:w-[90%] '>
//             <div id="cartItem-first" className='flex mt-20 pb-5 max-md:text-[15px] '>
//                 <div className='flex  gap-44 w-[40%]  justify-start max-md:gap-24 max-sm:gap-18 max-sm:text-[14px]'>
//                     <p>Product</p>
//                     <p >Title</p>
//                 </div>
//                 <div className='flex  w-[60%]  justify-evenly  max-md:px-3 max-sm:text-[14px] '>
//                     <p>Price</p>
//                     <p>Quantity</p>
//                     <p>Total</p>
//                     <p>Remove</p>
//                 </div>
//             </div>

//             <hr id='first-hr' className='h-[4px] border-2 rounded-2xl text-[#a09797] ' />

//             <div  id="cartItem-second" className='mt-4'>
//                 {allProducts.map((item) => {
//                     if (cartItems[item.id] > 0) {
//                         return (
//                             <div key={item.id} >
//                                 <div id='cartItem-second-inner' className='flex mt-5 ml-2 mb-7 '>

//                                     <div id='cartItem-second-inner-first' className='flex  gap-36 text-[14px] w-[40%]  justify-start items-center max-lg:gap-30 max-md:gap-18 max-sm:gap-14'>
//                                         <img src={item.image} alt="" className='size-[90px] max-md:size-[70px] max-sm:size-[60px] ' />
//                                         <p className='max-lg:text-[14px] max-sm:text-[12px] '>{item.name}</p>
//                                     </div>

//                                     <div id='cartItem-second-inner-second' className='flex w-[60%] items-center justify-evenly max-md:text-[14px] max-sm:text-[13px] '>
//                                         <p className=' px-4 font-semibold text-green-600 '>$ {item.new_price}</p>

//                                         <button className='py-3 px-5 border border-gray-300 cursor-pointer rounded-[6px] max-md:py-[4px] max-md:px-[12px] max-sm:p-[8px] '>{cartItems[item.id]}</button>

//                                         <p className='max-md'>${item.new_price * cartItems[item.id]}</p>

//                                         <img src={removeIcon} className='w-[15px] cursor-pointer my-0 mx-[40px] max-md:mx-[24px] ' onClick={() => { removeFromCart(item.id) }} alt="" />
//                                     </div>

//                                 </div><hr className='h-[2px] border-2 rounded-2xl text-[#cbc6c6] ' />
//                             </div>
//                         )
//                     }

//                     return null;

//                 })}
//                 <div id="cartItem-third" className='flex  my-100px  mx-0 py-14 pl-2 max-md:flex-col max-sm:pl-0'>

//                     {/* Left Part */}
//                     <div id='cartItem-third-first' className='flex  flex-col  w-[50%] mr-[100px]  gap-[20px] max-md:w-[100%] max-md:px-[80px] max-md:mb-14 '>
//                         <h1 className='text-3xl text-black font-bold uppercase '>Cart Totals</h1>
//                         <div >
//                             <div className='flex justify-between py-4 px-0'>
//                                 <p>SubTotal</p>
//                                 <p>${getTotalAmount()}</p>
//                             </div>

//                             <hr className='h-[4px] border-2 rounded-2xl text-[#a09797] ' />

//                             <div className='flex justify-between py-4 px-0'>
//                                 <p>Shipping Fee</p>
//                                 <p>Free</p>
//                             </div>

//                             <hr className='h-[4px] border-2 rounded-2xl text-[#a09797] ' />

//                             <div className='flex justify-between py-4 px-0 text-[18px] font-semibold'>
//                                 <h3>Total</h3>
//                                 <h3>${getTotalAmount()}</h3>
//                             </div>
//                         </div>
//                         <button className='w-[260px] h-[60px] outline-none border-none rounded  bg-[#ff5a5a] text-white text-[16px] font-bold cursor-pointer max-md:w-[200px] max-md:h-[50px] '>Proceed to checkout</button>

//                     </div>

//                   {/* Right Part */}
//                     <div id='cartItem-third-second' className='mt-2  max-md:pl-[80px] '>
//                         <p className='text-[#555] max-md:text-[22px] '>If you have  a promo code, Enter it here</p>
//                         <div id='cartItem-third-second-input' className='w-[400px] h-[58px]  mt-4  flex max-lg:w-[280px]  max-md:w-[330px] '>
//                             <input id='input-1' className='w-[340px] h-[50px] bg-zinc-300 pl-3 border-0 outline-none text-[16px] max-lg:h-[45px] max-md:w-[350px] ' type="text" placeholder='Enter you promo code' />

//                             <input id='input-2' className='w-[170px] h-[50px] rounded-br-[4px] rounded-tr-[4px] bg-black text-[16px] text-white cursor-pointer max-lg:h-[45px]' type="submit" value="submit" />
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartItem
