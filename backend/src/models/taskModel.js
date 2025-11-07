import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    category: String,
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
