
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const initialCredential = {
        email: "",
        userName: "",
        password: ""
    };

    const [credential, setCredential] = useState(initialCredential);

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const { email, userName, password } = credential;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/user/signup",
                { userName, email, password },
                { withCredentials: true },
            );

            if (response.data.success) {
                alert(' ✅ ' + "You are successfully registered");
                window.location.href = "/";
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            alert(message);
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans px-4 py-24'>
            
            {/* Soft Background Accents */}
             <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[120px]" />
            
            {/* Main Container */}
            <div className='relative z-10 w-full max-w-[950px] flex bg-white rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white'>
                
                {/* Left Side: Branding / Visual */}
                <div className='hidden md:flex w-[40%] bg-[#2fafbd] relative p-12 flex-col justify-between overflow-hidden'>
                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className='relative z-10'>
                        <h2 className='text-white text-4xl font-black leading-tight'>
                            Join the <br /> Vashtra <br /> Community.
                        </h2>
                        <p className='text-emerald-100 mt-6 font-medium'>Experience fashion that redefines your everyday style.</p>
                        <div className='w-32 h-1.5 bg-white mt-8 rounded-full'></div>
                    </div>

                    <div className='relative z-10'>
                        <p className='text-emerald-100 text-xs tracking-widest uppercase font-bold'>Premium Quality Guaranteed</p>
                    </div>

                    {/* Aesthetic Floating Element */}
                    <div className='absolute bottom-[-7%] right-[-20%] w-72 h-72 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm'></div>
                </div>

                {/* Right Side: Signup Form */}
                <div className='w-full md:w-[60%] p-8 md:p-8'>
                    <div className="mb-8">
                           <h1 className='text-3xl text-center font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent tracking-tight mb-2'>
                                VASHTRA
                            </h1>
                        <p className='text-gray-500 mt-2 font-medium'>Sign up to start your fashion journey with Vashtra.</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        {/* User Name Field */}
                        <div className='relative group'>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Your Name'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Full Name
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className='relative group'>
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Email'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Email Address
                            </label>
                        </div>

                        {/* Password Field */}
                        <div className='relative group'>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Password'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Password
                            </label>
                        </div>

                        {/* Terms Checkbox */}
                        <div className='flex items-start gap-3 pt-1'>
                            <input 
                                type="checkbox" 
                                id="agree" 
                                required 
                                className='mt-1 accent-[#059669] w-4 h-4 cursor-pointer' 
                            />
                            <label htmlFor="agree" className='text-xs text-gray-500 leading-tight cursor-pointer'>
                                By continuing, I agree to the <span className='text-[#059669] font-bold underline'>Terms of Use</span> and <span className='text-[#059669] font-bold underline'>Privacy Policy</span>.
                            </label>
                        </div>

                        <button
                            type='submit'
                            className='w-full h-13 rounded-xl text-white bg-[#26b3c8] cursor-pointer mt-3 font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300'
                        >
                            Create Account
                        </button>
                    </form>

                    <p className='text-center text-gray-400 text-sm font-medium mt-6'>
                        Already have an account? 
                        <Link to="/login" className='text-[#059496] font-black ml-2 hover:underline'>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;


















// import react, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'


// function Signup() {

//     const initialCredential = {
//         email: "",
//         userName: "",
//         password: ""
//     }

//     const [credential, setCredential] = useState(initialCredential)

//     const handleChange = (e) => {
//         setCredential({ ...credential, [e.target.name]: e.target.value })
//     }

//    const {email, userName, password} = credential

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
            
//             const response = await axios.post(
//                 "http://localhost:4000/api/user/signup", // url
//                 { userName,email , password },  // data
//                 { withCredentials: true }, // configuration
//             );

//             if (response.data.success) {
//                 alert(' ✅ ' + "You are successfully registered");
//                 console.log("Successfully");

//                 window.location.href = "/";
//             }

//         } catch (error) {
//             const message = error.response?.data?.message || "Something went wrong";
//             alert(message);
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <div id="login" className='w-[100%]   border-b bg-linear-to-b from-[#94f5e5] to-[#e1ffea22]  pt-[120px] pb-32'>
//                 <div id="login-inner" className='w-[550px] h-fit rounded  bg-white/70 m-auto py-5 px-15 max-sm:w-[450px]'>
//                     <h1 className='my-4 mx-0 text-3xl font-semibold capitalize'>Sign up</h1>
//                     <form onSubmit={handleSubmit} className='flex flex-col gap-5  '>
//                         <input
//                             type="text"
//                             name="userName"
//                             placeholder='Your name'
//                             value={userName}
//                             onChange={handleChange}
//                             id="name"
//                             className='w-[100%] rounded-[4px] h-[52px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
//                             required
//                         />

//                         <input
//                             type="email"
//                             name='email'
//                             placeholder='Your Email'
//                             value={email}
//                             onChange={handleChange}
//                             id="email"
//                             className='w-[100%] rounded-[4px] h-[52px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
//                             required
//                         />

//                         <input
//                             type="password"
//                             name='password'
//                             placeholder='Your password'
//                             value={password}
//                             onChange={handleChange}
//                             id="password"
//                             className='w-[100%] rounded-[4px] h-[52px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
//                             required
//                         />
//                         <input
//                             type="submit"
//                             value="Signup"
//                             id="submit"
//                             className='w-[100%] rounded-[8px] h-[60px] text-white bg-[#ff4141] mt-1 border-none text-[24px] font-semibold cursor-pointer'

//                         />
//                     </form>

//                     <p id="para1" className='mt-4 text-[#5c5c5c] text-[18px] font-semibold'>Alreay have an account? <Link to="/login" className='text-amber-600 font-semiboldbold underline '>Login here</Link></p>
//                     <div className='flex items-center mt-6 gap-5 text-[#5c5c5c] text-4'>
//                         <input type="checkbox" className='cursor-pointer' name='' id='' />
//                         <p id="para2">By continuing, i agree to the terms of use and privacy policy.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signup

