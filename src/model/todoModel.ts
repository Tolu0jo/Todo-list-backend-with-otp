import mongoose,{Schema} from "mongoose"

interface todoInstance{
    _id:string
    description:string
    status:boolean
    title:string
    userId: string
}

const todoSchema=new Schema({
    description:{
        type:String,required:true
    },
    title:{
        type:String,required:true
    },
    status:{
        type:Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
   
},{  timestamps: true,
     toJSON:{
    transform(doc, ret){
        ret.id = ret._id,
        delete ret._id,
        delete ret.password,
        delete ret.__v
    }
}
  }) 
const Todo = mongoose.model<todoInstance>("Todo",todoSchema)
export default Todo