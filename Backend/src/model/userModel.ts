import mongoose,{Schema} from "mongoose"

interface UserInstance{
    _id:string
    email:string
    password:string
    otp:Number,
    expiry_otp:Date,
    verified:Boolean,
    phone:string
}
const userSchema=new Schema({
   email:{
        type:String,
        required:true
    },
    password:{
        type:String,required:true
    }, 
      otp: {
        type:Number,
        required: true,
      },
     expiry_otp: {
        type:Date,
        required: true,
      },
    verified:{
        type:Boolean,
        default:false
    },
    phone:{
      type:String,
      required:true
    }
   
},{  
     toJSON:{
    transform(doc, ret){
        ret.userId = ret._id,
        delete ret._id,
        delete ret.password,
        delete ret.__v
    }
}
  }) 
const User = mongoose.model<UserInstance>("User",userSchema)
export default User