import mongoose, {Schema} from 'mongoose'

const fileSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true
        },
        category:{
            type:String,
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
            type:Boolean,
            default:true
        }
        
    },

    {
        timestamps: true
    }
)
export const FileModel = mongoose.model("File", fileSchema)
