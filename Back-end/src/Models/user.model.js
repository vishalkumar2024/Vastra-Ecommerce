import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: { 
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
     
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    },

    {
        timestamps: true
    }
)

// Hashing password before saving it
userSchema.pre("save", async function () { 
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Custom method to compare password 
userSchema.methods.isPasswordCorrect = function(password){ 
    return bcrypt.compare(password, this.password)
}


export const UserModel = mongoose.model("User", userSchema)