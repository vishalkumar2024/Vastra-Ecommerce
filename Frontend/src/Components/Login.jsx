import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function login() {

    const initialCredential = {
        email: "",
        password: ""
    }

    const [credential, setCredential] = useState(initialCredential)

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const email = credential.email
    const password = credential.password

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:4000/api/user/login", // url
                { email, password },  // data
                { withCredentials: true }, // configuration
            );

            const message = response.data.message;

            if (response.data.success) {
                alert(' ✅ ' + message);
                console.log("Successfully");

                window.location.href = "/";
            }

        } catch (error) {

            const message = error.response?.data?.message || "Something went wrong";
            alert(message);
            console.log(error);
        }
    };

    return (
        <div id="login" className='w-[100%]   border-b bg-linear-to-b from-[#94f5e5] to-[#e1ffea22] pt-[120px] pb-32'>
            <div id="login-inner" className='w-[550px] h-fit rounded  bg-white/70 m-auto py-5 px-15 max-sm:w-[450px]'>

                <h1 className='my-4 mx-0 text-3xl font-semibold capitalize'>Login</h1>
                <form action="/login" method="post" className='flex flex-col gap-7  '>
                    <input
                        type="email"
                        name='email'
                        placeholder='Your Email'
                        value={credential.email}
                        onChange={handleChange}
                        id="email"
                        className='w-[100%] rounded-[4px] h-[52px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
                        required
                    />

                    <input
                        type="password"
                        name='password'
                        placeholder='Your password'
                        value={credential.password}
                        onChange={handleChange}
                        id="password"
                        className='w-[100%] h-[52px] rounded-[4px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
                        required
                    />

                    <input
                        type='submit'
                        value="Login"
                        id="submit"
                        onClick={handleSubmit}
                        className='w-[100%] h-[60px] rounded-[8px] text-white bg-green-500 mt-7 border-none text-[24px] font-semibold cursor-pointer'
                    />

                </form>
                <p id="para1" className='mt-5 text-[#5c5c5c] text-[18px] font-semibold'>Don't have an account? <Link to="/signup" className='text-amber-600 font-semiboldbold underline '>Signup here</Link></p>
                <div className='flex items-center mt-6 gap-3 text-[#5c5c5c] text-4'>
                    <input
                    type="checkbox"
                    required className='cursor-pointer' />
                    <p id="para2">By continuing, i agree to the terms of use and privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default login
