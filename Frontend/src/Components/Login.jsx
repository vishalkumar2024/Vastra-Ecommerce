import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const initialCredential = { email: "", password: "" };
    const [credential, setCredential] = useState(initialCredential);

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const { email, password } = credential;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/user/login",
                { email, password },
                { withCredentials: true },
            );
            if (response.data.success) {
                alert(' ✅ ' + response.data.message);
                window.location.href = "/";
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans py-24 px-4'>
            
            {/* Background Aesthetic Elements */}
               <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[120px]" />
            
            {/* The Main Container */}
            <div className='relative z-10 w-full max-w-[900px] flex bg-white rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white'>
                
                {/* Left Side: Visual/Branding (Visible on MD+) */}
                <div className='hidden md:flex w-1/2 bg-[#2fafbd] relative p-12 flex-col justify-between overflow-hidden'>
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className='relative z-10'>
                        <h2 className='text-white text-4xl font-bold leading-tight'>
                            Step into <br /> Exclusive Fashion.
                        </h2>
                        <div className='w-32 h-1.5 bg-white mt-6 rounded-full'></div>
                    </div>

                    <div className='relative z-10'>
                        <p className='text-emerald-100 text-sm'>© 2026 VASHTRA E-COMMERCE</p>
                    </div>

                    {/* Decorative Image Overlap */}
                    <div className='absolute bottom-[-20px] right-[-40px] w-64 h-80 bg-cyan-300/20 rounded-2xl rotate-12 backdrop-blur-lg border border-white/20'></div>
                </div>

                {/* Right Side: The Form */}
                <div className='w-full md:w-1/2 px-8 md:p-11'>
                    <div className="mb-8">
                            <h1 className='text-3xl text-center font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent tracking-tight mb-2'>
                                VASHTRA
                            </h1>
                       <p className='text-gray-500 font-medium'>Welcome back! Please login to your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div className='relative group'>
                            <input
                                type="email"
                                name='email'
                                value={credential.email}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Email'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[#26b3c8] peer-focus:text-xs pointer-events-none'>
                                Email Address
                            </label>
                        </div>

                        <div className='relative group'>
                            <input
                                type="password"
                                name='password'
                                value={credential.password}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Password'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[#26b3c8] peer-focus:text-xs pointer-events-none'>
                                Password
                            </label>
                        </div>

                        <div className='mt-8 flex flex-col items-center gap-4'>
                        <div className='flex items-center gap-3 w-full px-1'>
                            <input 
                                type="checkbox" 
                                id="agree"
                                required 
                                className='w-4 h-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] cursor-pointer' 
                            />
                            <label htmlFor="agree" className="text-xs text-gray-500 cursor-pointer">
                                I agree to the <span className='text-[#059669] font-semibold underline'>Terms</span> and <span className='text-[#059669] font-semibold underline'>Privacy Policy</span>.
                            </label>
                        </div>
                    </div>

                        <button
                            type='submit'
                            className='w-full h-14 rounded-xl cursor-pointer text-white bg-[#26b3c8] mt-4 font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300'
                        >
                            Login
                        </button>
                    </form>

                    <p className='text-center text-gray-400 text-sm font-medium mt-10'>
                        Don't have an account? 
                        <Link to="/signup" className='text-[#058a96] font-black ml-2 hover:underline'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;











// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//     const initialCredential = {
//         email: "",
//         password: ""
//     }

//     const [credential, setCredential] = useState(initialCredential);

//     const handleChange = (e) => {
//         setCredential({ ...credential, [e.target.name]: e.target.value });
//     }

//     const { email, password } = credential;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 "http://localhost:4000/api/user/login",
//                 { email, password },
//                 { withCredentials: true },
//             );

//             if (response.data.success) {
//                 alert(' ✅ ' + response.data.message);
//                 window.location.href = "/";
//             }
//         } catch (error) {
//             const message = error.response?.data?.message || "Something went wrong";
//             alert(message);
//             console.log(error);
//         }
//     };

//     return (
//         <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#e8fff5] to-white relative overflow-hidden font-sans px-4 py-28'>
            
//             {/* Soft decorative background circles to match your hero section */}
//            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-300/40 rounded-full blur-[120px]" />
//             <div className="absolute -bottom-70 right-0 w-[350px] h-[600px] bg-emerald-300/40 rounded rotate-45 blur-[100px]" />

//             <div className='relative z-10 w-full max-w-[450px]'>
//                 <div className='bg-white backdrop-blur-md border border-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
                    
//                     <div className="text-center mb-6">
 
                        // <h1 className='text-3xl font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent tracking-tight mb-2'>
                        //     VASHTRA <span className='text-[#059669]'>.</span>
                        // </h1>
//                         <p className='text-gray-500 font-medium'>Welcome back! Please login to your account.</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
//                         <div className='space-y-2'>
//                             <label className='text-sm font-bold text-gray-700 ml-1'>Email </label>
//                             <input
//                                 type="email"
//                                 name='email'
//                                 placeholder='yourname@mail.com'
//                                 value={credential.email}
//                                 onChange={handleChange}
//                                 className='w-full bg-gray-100 border border-gray-100 rounded-2xl h-[54px] px-5 outline-none text-gray-700 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/5 transition-all duration-200 placeholder:text-gray-400'
//                                 required
//                             />
//                         </div>

//                         <div className='space-y-2'>
//                             <label className='text-sm font-bold text-gray-700 ml-1'>Password</label>
//                             <input
//                                 type="password"
//                                 name='password'
//                                 placeholder='••••••••'
//                                 value={credential.password}
//                                 onChange={handleChange}
//                                 className='w-full bg-gray-100 border border-gray-100 rounded-2xl h-[54px] px-5 outline-none text-gray-700 focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/5 transition-all duration-200 placeholder:text-gray-400'
//                                 required
//                             />
//                         </div>

//                         <button
//                             type='submit'
//                             className='w-full h-[52px] cursor-pointer rounded-full text-white bg-[#059669] mt-4 text-lg font-bold shadow-lg shadow-[#059669]/20 hover:bg-[#047857] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300'
//                         >
//                             Login
//                         </button>
//                     </form>

                    // <div className='mt-8 flex flex-col items-center gap-4'>
                    //     <div className='flex items-center gap-3 w-full px-1'>
                    //         <input 
                    //             type="checkbox" 
                    //             id="agree"
                    //             required 
                    //             className='w-4 h-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] cursor-pointer' 
                    //         />
                    //         <label htmlFor="agree" className="text-xs text-gray-500 cursor-pointer">
                    //             I agree to the <span className='text-[#059669] font-semibold underline'>Terms</span> and <span className='text-[#059669] font-semibold underline'>Privacy Policy</span>.
                    //         </label>
                    //     </div>

                    //     <p className='text-gray-500 text-sm font-medium'>
                    //        Don't have an account? <Link to="/signup" className='text-[#059669] font-bold hover:underline underline-offset-4 ml-1'>Signup here</Link>                         </p>
                    // </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;











// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// function login() {

//     const initialCredential = {
//         email: "",
//         password: ""
//     }

//     const [credential, setCredential] = useState(initialCredential)

//     const handleChange = (e) => {
//         setCredential({ ...credential, [e.target.name]: e.target.value })
//     }

//     const email = credential.email
//     const password = credential.password

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {

//             const response = await axios.post(
//                 "http://localhost:4000/api/user/login", // url
//                 { email, password },  // data
//                 { withCredentials: true }, // configuration
//             );

//             const message = response.data.message;

//             if (response.data.success) {
//                 alert(' ✅ ' + message);
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
//         <div id="login" className='w-[100%]   border-b bg-linear-to-b from-[#94f5e5] to-[#e1ffea22] pt-[120px] pb-32'>
//             <div id="login-inner" className='w-[550px] h-fit rounded  bg-white/70 m-auto py-5 px-15 max-sm:w-[450px]'>

//                 <h1 className='my-4 mx-0 text-3xl font-semibold capitalize'>Login</h1>
//                 <form action="/login" method="post" className='flex flex-col gap-7  '>
//                     <input
//                         type="email"
//                         name='email'
//                         placeholder='Your Email'
//                         value={credential.email}
//                         onChange={handleChange}
//                         id="email"
//                         className='w-[100%] rounded-[4px] h-[52px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
//                         required
//                     />

//                     <input
//                         type="password"
//                         name='password'
//                         placeholder='Your password'
//                         value={credential.password}
//                         onChange={handleChange}
//                         id="password"
//                         className='w-[100%] h-[52px] rounded-[4px] pl-5 outline-none border border-[#c9c9c9] text-[#5c5c5c] text-[18px]'
//                         required
//                     />

//                     <input
//                         type='submit'
//                         value="Login"
//                         id="submit"
//                         onClick={handleSubmit}
//                         className='w-[100%] h-[60px] rounded-[8px] text-white bg-green-500 mt-7 border-none text-[24px] font-semibold cursor-pointer'
//                     />

//                 </form>
//                 <p id="para1" className='mt-5 text-[#5c5c5c] text-[18px] font-semibold'>Don't have an account? <Link to="/signup" className='text-amber-600 font-semiboldbold underline '>Signup here</Link></p>
//                 <div className='flex items-center mt-6 gap-3 text-[#5c5c5c] text-4'>
//                     <input
//                     type="checkbox"
//                     required className='cursor-pointer' />
//                     <p id="para2">By continuing, i agree to the terms of use and privacy policy.</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default login
