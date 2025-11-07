import { useState } from "react";
import useTaskStore from "../store/taskStore";

const TaskForm = () => {
    const { addTask } = useTaskStore();
    const [newTask, setNewTask] = useState({
        title: "",
        category: "",
        priority: "",
        description: "",
        dueDate: "",
    });

    const handleSubmit = () => {
        if (!newTask.title.trim()) return;
        addTask(newTask);
        setNewTask({
            title: "",
            category: "",
            priority: "",
            description: "",
            dueDate: "",
        });
    };

    return (
        <>
            <div className="flex mt-7 gap-4 mb-5 flex-wrap">
                <div className="flex-1 min-w-48">
                    <label className="block text-md font-medium text-slate-200 mb-2">
                        Task Title
                    </label>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                        }
                        placeholder="Enter Task Title..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                    />
                </div>
                <div className="flex-1 min-w-48">
                    <label className="block text-md font-medium text-slate-200 mb-2">
                        Category
                    </label>
                    <select
                        onChange={(e) =>
                            setNewTask({ ...newTask, category: e.target.value })
                        }
                        value={newTask.category}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                    >
                        <option className="text-black" value="work">
                            Work
                        </option>
                        <option className="text-black" value="personal">
                            Personal
                        </option>
                        <option className="text-black" value="shopping">
                            Shopping
                        </option>
                        <option className="text-black" value="health">
                            Health
                        </option>
                        <option className="text-black" value="education">
                            Education
                        </option>
                        <option className="text-black" value="other">
                            Other
                        </option>
                    </select>
                </div>

                <div className="flex-1 min-w-48">
                    <label className="block text-md font-medium text-slate-200 mb-2">
                        Priority
                    </label>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                        value={newTask.priority}
                        onChange={(e) =>
                            setNewTask({ ...newTask, priority: e.target.value })
                        }
                    >
                        <option className="text-black" value="medium">
                            Medium
                        </option>
                        <option className="text-black" value="low">
                            Low
                        </option>
                        <option className="text-black" value="high">
                            High
                        </option>
                    </select>
                </div>
                <div className="flex-1 min-w-48">
                    <label className="block text-md font-medium text-slate-200 mb-2">
                        Due Date
                    </label>
                    <input
                        type="datetime-local"
                        step="60"
                        value={newTask.dueDate}
                        onChange={(e) =>
                            setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                    />
                </div>
            </div>

            <div className="mb-5">
                <label className="block text-md font-medium text-slate-200 mb-2">
                    Description
                </label>
                <textarea
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                    placeholder="Task description (optional)..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                />
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full max-w-40 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-6"
            >
                Add Task
            </button>
        </>
    );
};

export default TaskForm;
