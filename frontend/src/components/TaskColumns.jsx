import { useEffect } from "react";
import useTaskStore from "../store/taskStore";
import EmptyTaskList from "./EmptyTasklist";
import TaskItem from "./TaskItem";

const TaskColumns = () => {
  const { filteredTasks, fetchTasks } = useTaskStore();
  const tasks = filteredTasks();

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="p-8 bg-slate-50 text-slate-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* To Do Column */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm text-slate-900">
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-indigo-100">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <span>📋</span> To Do
              <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
                {todoTasks.length}
              </span>
            </h3>
          </div>

          {todoTasks.length > 0 ? (
            todoTasks.map((task) => <TaskItem key={task._id} task={task} />)
          ) : (
            <EmptyTaskList />
          )}
        </div>

        {/* In Progress Column */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 shadow-sm text-amber-900">
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-amber-100">
            <h3 className="text-xl font-bold flex items-center gap-2 text-amber-900">
              <span>🔄</span> In Progress
              <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs">
                {inProgressTasks.length}
              </span>
            </h3>
          </div>

          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <EmptyTaskList />
          )}
        </div>

        {/* Completed Column */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 shadow-sm text-emerald-900">
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-emerald-100">
            <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-900">
              <span>✅</span> Completed
              <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs">
                {completedTasks.length}
              </span>
            </h3>
          </div>

          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          ) : (
            <EmptyTaskList />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskColumns;
