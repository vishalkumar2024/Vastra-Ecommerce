import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";

export const ShopContext = createContext(null);


const getdefaultCart = () => {
    let cart = {};

    for (let i = 0; i < 200 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState(getdefaultCart())


    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/product/getallproducts");
                setAllProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }

            if (Cookies.get("token")) {
                console.log("The token is " + Cookies.get("token"))

                try {

                    fetch('http://localhost:4000/api/product/getcart',{
                       method:"POST",
                       headers:{
                           Accept:'application/form-data',
                           'Content-Type':'application/json',
                       },
                       body:"",
                    }).then((response)=>response.json())
                    .then((data)=>{
                        setCartItems(data)
                    })


                    const response = await axios.post(
                        "http://localhost:4000/api/product/getcart",
                        { "itemId": itemId },   // request body
                        {
                            withCredentials: true
                        }
                    );

                    console.log("Success:", response.data);
                } catch (error) {
                    console.error("Error while adding to cart:", error.response?.data || error.message);
                }
            }
        };

        getProducts();
    }, []);


    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

        const token = Cookies.get("token");
        console.log("The token is " + token)
        // console.log(itemId)
        try {
            const response = await axios.post(
                "http://localhost:4000/api/product/addcart",
                { "itemId": itemId },   // request body
                {
                    withCredentials: true
                }
            );

           alert("✅ Product added to cart successfully")
        } catch (error) {
            console.error("Error while adding to cart:", error.response?.data || error.message);
        }
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        const token = Cookies.get("token");
        console.log("The token is " + token)
        // console.log(itemId)
        try {
            const response = await axios.post(
                "http://localhost:4000/api/product/removecart",
                { "itemId": itemId },   // request body
                {
                    withCredentials: true
                }
            );

            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error while adding to cart:", error.response?.data || error.message);
        }
    }


    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }
    const getTotalItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const contextValue = { allProducts, cartItems, getTotalItem, addToCart, removeFromCart, getTotalAmount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
