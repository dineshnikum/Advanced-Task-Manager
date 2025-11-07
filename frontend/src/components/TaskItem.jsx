import useTaskStore from "../store/taskStore";
import getDueWarning from "../utils/getDueWarning.js";
import getDueColor from "../utils/getDueColor.js";

const TaskItem = ({ task }) => {
  const {
    handleDeleteTask,
    handleStartTask,
    handleCompleteTask,
    openEditModal,
  } = useTaskStore();

  const warning = getDueWarning(task.dueDate);

  return (
    <div
      className={`${getDueColor(
        task
      )} hover:-translate-y-1 mb-5 rounded-lg p-5 shadow-md hover:shadow-lg transition-all border-l-4 border-slate-700`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">
            {task.title}
          </h4>
          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
            {task.category}
          </span>
        </div>
      </div>

      <p className="text-gray-700 text-sm my-3 leading-relaxed">
        {task.description}
      </p>

      <div className="flex flex-col items-center gap-3 mt-2 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700">
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-sm text-gray-700">
              📅 Due:{" "}
              {new Date(task.dueDate).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        {warning && (
          <div className="flex items-center">
            <span className="text-md">{warning}</span>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {task.status === "todo" && (
            <button
              onClick={() => handleStartTask(task._id)}
              className="cursor-pointer px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Start
            </button>
          )}

          <button
            onClick={() => openEditModal(task)}
            className="cursor-pointer px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Edit
          </button>

          <button
            onClick={() => {
              handleDeleteTask(task._id);
            }}
            className="cursor-pointer px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>

          {task.status !== "completed" && (
            <button
              onClick={() => {
                handleCompleteTask(task._id);
              }}
              className="cursor-pointer px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
