import { UserModel } from '../Models/user.model.js'
import jwt from 'jsonwebtoken'


// Function to login a user
const login = async (req, res) => {

    // 1. Get user details from frontend ( or from postman).
    // 3. check if email or userName is correct or not.
    // 4. if email is correct, then check the password.
    // 5. assign a jwt token, send it to the client's browser
    // 6. set cookie
    // 7. return th data

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All input fields are not filled",
            })
        }

        const existedUser = await UserModel.findOne({ email: email })

        if (!existedUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist with this email",
            })
        }

        const isPasswordMatch = await existedUser.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }

        const token = jwt.sign(
            { userId: existedUser._id, email: existedUser.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.SECRET === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const userResponse = { ...existedUser.toObject() }
        delete userResponse.password

        return res.status(200).json({
            success: true,
            message: "Successfully login",
            user: userResponse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user could not be logged in",
        })
    }
}

// Function to Register a user
const registerUser = async (req, res) => {

    // 1. Get user details from frontend ( or from postman).
    // 2. Check if user already exist.
    // 3. Created size 200 cartData
    // 4. Creating user by userModel.create (CRUD) to store in database.
    // 5. Generate the cookie
    // 6. Remove password and refresh token field from response. 
    // 7. Check for user creation- if true then return res.


    const { email, name, password } = req.body; //1

    try {
        const existedUser = await UserModel.findOne({email}) //2
        if (existedUser) {
             return res.status(400).json({
                success: false,
                message: "User already exist with this email ",
            })
        }

        let cart = {}; //3
        for(let i=0;i<200;i++){
            cart[i]= 0;
        }

        const user = await UserModel.create({ //4
            email,
            password,
            name,
            cartData:cart,
        })
        await user.save();

        const token = jwt.sign( //5
            { userId: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.SECRET === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const createdUser = await UserModel.findOne(user._id).select( //6
            "-password "
        )

        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "user could not be created",
            })
        }

        return res.status(200).json(createdUser) //7

    } catch (error) {
        return res.status(500).json({
            error: error,
            success: false,
            message: "Something went wrong while registering user",
        })
    }
}



export { login, registerUser }