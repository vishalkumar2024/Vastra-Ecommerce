import mongoose from 'mongoose'

const fileSchema = new Schema(
    {
        id: {
            type: string,
            required: true,
        },
        name:{
            type:strig,
            required:true,
        },
        image:{
            type:string,
            required:true
        },
        category:{
            type:string,
            required:true
        },
        old_price:{
            type:Number,
            required:true
        },
        new_price:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        available:{
            type:bool,
            default:true
        }
        
    },

    {
        timestamps: true
    }
)
export const UserModel = mongoose.model("User", userSchema)
