import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  dueDate:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  priority:{
    type:String,
    enum:['normal','high'],
    default:'normal'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, { timestamps: true });

const Task=mongoose.model("Task", taskSchema)
export default Task;