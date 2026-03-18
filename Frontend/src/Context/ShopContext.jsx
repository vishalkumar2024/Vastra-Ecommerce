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
    const [token, setToken] = useState(Cookies.get("token") || null);

    useEffect(() => {

        const getProducts = async () => {

            try {
                const response = await axios.get("http://localhost:4000/api/product/getallproducts");
                setAllProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }

            // Check cookie again on mount for debugging
            const savedToken = Cookies.get("token");
            if (savedToken) {
                setToken(savedToken);
                console.log("Token detected on mount");
            } else {
                console.log("No token found in cookies");
            }

            if (token) {

                try {

                    const cartRes = await axios.post(
                        "http://localhost:4000/api/product/getcart",
                        {}, // Empty body
                        { withCredentials: true } // CRITICAL: This sends the cookie to your middleware
                    );
                    setCartItems(cartRes.data);

                } catch (error) {
                    console.error("Error while adding to cart:", error.response?.data || error.message);
                }
            }
        };

        getProducts();
    }, []);


    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

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

    const contextValue = {
        allProducts,
        cartItems,
        token,
        setToken,
        getTotalItem,
        addToCart,
        removeFromCart,
        getTotalAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;




// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';
// import Cookies from "js-cookie";

// export const ShopContext = createContext(null);

// const getdefaultCart = () => {
//     let cart = {};
//     for (let i = 0; i < 201; i++) {
//         cart[i] = 0;
//     }
//     return cart;
// };

// const ShopContextProvider = (props) => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [cartItems, setCartItems] = useState(getdefaultCart());
//     const [token, setToken] = useState(Cookies.get("token") || null);

//     useEffect(() => {
//         const initializeApp = async () => {
//             // 1. Sync token state with current cookie
//             const savedToken = Cookies.get("token");
//             if (savedToken) setToken(savedToken);

//             try {
//                 // 2. Fetch all products
//                 const productRes = await axios.get("http://localhost:4000/api/product/getallproducts");
//                 setAllProducts(productRes.data.data);

//                 // 3. Fetch Cart (ONLY if token exists)
//                 if (savedToken) {
//                     const cartRes = await axios.post(
//                         "http://localhost:4000/api/product/getcart",
//                         {}, // Empty body
//                         { withCredentials: true } // CRITICAL: This sends the cookie to your middleware
//                     );
//                     setCartItems(cartRes.data);
//                 }
//             } catch (error) {
//                 console.error("Initialization error:", error.response?.data || error.message);
//             }
//         };

//         initializeApp();
//     }, []);

//     const addToCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         if (token) {
//             try {
//                 await axios.post(
//                     "http://localhost:4000/api/product/addcart",
//                     { itemId },
//                     { withCredentials: true }
//                 );
//             } catch (error) {
//                 console.error("Add to cart error:", error);
//             }
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         if (token) {
//             try {
//                 await axios.post(
//                     "http://localhost:4000/api/product/removecart",
//                     { itemId },
//                     { withCredentials: true }
//                 );
//             } catch (error) {
//                 console.error("Remove from cart error:", error);
//             }
//         }
//     };

//     const getTotalAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = allProducts.find((product) => product.id === Number(item));
//                 if (itemInfo) totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         }
//         return totalAmount;
//     };

//     const getTotalItem = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) totalItem += cartItems[item];
//         }
//         return totalItem;
//     };

//     const contextValue = { 
//         allProducts, 
//         cartItems, 
//         token, 
//         setToken, 
//         getTotalItem, 
//         addToCart, 
//         removeFromCart, 
//         getTotalAmount 
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;
