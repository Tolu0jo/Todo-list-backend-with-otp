import mongoose,{Schema} from "mongoose"

interface UserInstance{
    _id:string
    email:string
    password:string
}
const userSchema=new Schema({
   email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
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