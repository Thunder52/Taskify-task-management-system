import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Joi from "joi";

export const getTask = async (req, res) => {
  try {
    const id = req.id;
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const tasks = await Task.find().skip(skip).limit(limit);
    const total = await Task.countDocuments();
    const user = await User.findById(id);

    return res
      .status(200)
      .json({
        success: true,
        tasks,
        user,
        totalPage: Math.ceil(total / limit),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wents wrong" });
  }
};

export const getHighPrioritytask = async (req, res) => {
  try {
    const id = req.id;
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const tasks = await Task.find({ priority: "high" }).skip(skip).limit(limit);
    const total = await Task.countDocuments({ priority: "high" });
    const user = await User.findById(id);

    return res
      .status(200)
      .json({
        success: true,
        tasks,
        user,
        totalPage: Math.ceil(total / limit),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wents wrong" });
  }
};

export const getCompletedTask = async (req, res) => {
  try {
    const id = req.id;
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const tasks = await Task.find({ status: "completed" })
      .skip(skip)
      .limit(limit);
    const total = await Task.countDocuments({ status: "completed" });
    const user = await User.findById(id);

    return res
      .status(200)
      .json({
        success: true,
        tasks,
        user,
        totalPage: Math.ceil(total / limit),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wents wrong" });
  }
};

export const getIncompletetask = async (req, res) => {
  try {
    const id = req.id;
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const tasks = await Task.find({ status: "pending" })
      .skip(skip)
      .limit(limit);
    const total = await Task.countDocuments({ status: "pending" });
    const user = await User.findById(id);

    return res
      .status(200)
      .json({
        success: true,
        tasks,
        user,
        totalPage: Math.ceil(total / limit),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wents wrong" });
  }
};
export const addTask = async (req, res) => {
  try {
    const taskSchema = Joi.object({
      title: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(10).max(1000).required(),
      dueDate: Joi.date().greater("now").required(),
      priority: Joi.string().required(),
    });
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { title, description, dueDate, priority } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.id,
    });
    await newTask.save();
    return res
      .status(200)
      .json({
        success: true,
        task: newTask,
        message: "task added successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "something wents wrong!" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = task.status === "pending" ? "completed" : "pending";
    await task.save();

    return res
      .status(200)
      .json({ success: true, task, message: "Status updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something wents wrong" });
  }
};
export const updateTask=async (req,res)=>{
  try {
    const {id}=req.params;
    const taskSchema = Joi.object({
      title: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(10).max(1000).required(),
      dueDate: Joi.date().greater("now").required(),
      priority: Joi.string().required(),
    });
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { title, description, dueDate, priority } = req.body;
    const task=await Task.findByIdAndUpdate(id,{title,description,dueDate,priority},{new:true});
    return res.status(200).json({success:true,message:"task updated successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something wents wrong" })
  }
}