
import { UserModel } from '../Models/user.model.js'


// Function to login a user
const login = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 2. validation - check if any input field (specially email and password) is empty or in wrong format.
    // 3. check if email or userName is correct or not.
    // 4. if email is correct, then check the password.
    // 5. assign a jwt token, send it to the client's browser
    // 6. set cookie
    // 7. return th data

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            throw new ApiError(404, "All input fields are not filled")
        }

        const existedUser = await UserModel.findOne({ email: email })

        if (!existedUser) {
            throw new ApiError(404, 'User does not exist with this email')
        }

        const isPasswordMatch = await existedUser.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            return res.error(400).send("Password is incorrect")
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
        throw new ApiError(500, "Cannot login the user ", error)
    }
}

// Function to Register a user
const registerUser = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 3. Check if user already exist.
    // // 4. Check if user give his avatar image or not
    // 6. Creating user by userModel.create (CRUD) to store in database.
    // 7. Remove password and refresh token field from response. 
    // 8. Check for user creation- if true then return res.


    const { email, fullName, userName, password } = req.body;

    try {
        const existedUser = await UserModel.findOne({ 
            $or: [{ email }, { userName }]
        })
        if (existedUser) {
             return res.status(400).json({
                success: false,
                message: "User already exist with this email or userName ",
            })
        }

        const user = await UserModel.create({ 
            email,
            password,
            fullName,
            userName: userName.toLowerCase(),

        })

        const createdUser = await UserModel.findOne(user._id).select( 
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "user could not be created",
            })
        }

        return res.status(200).json(createdUser) //.8
    } catch (error) {
        return res.status(500).json({
            error: error,
            success: false,
            message: "Something went wrong while registering user",
        })
    }
}

export { login, registerUser }