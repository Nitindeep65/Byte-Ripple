import mongoose from "mongoose";

const MessageSchema= new mongoose.Schema(
    {
        senderId : {type:mongoose.Schema.Types.ObjectId , ref : "User" , require : true},
        receiverId : {type:mongoose.Schema.Types.ObjectId , ref : "User" , require : true},
        Content:{type:String , require:true},
         type: { type: String, enum: ["text", "image", "file"], default: "text" },
    read: { type: Boolean, default: false }
    

    },
     { timestamps: true }
);
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;