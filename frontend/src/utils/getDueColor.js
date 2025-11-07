function getDueColor(task) {
  if (task.status === "completed") return "bg-green-200";
  if (!task.dueDate) return "bg-white";

  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const diffHours = (dueDate - now) / (1000 * 60 * 60);

  if (diffHours < 0) return "bg-red-200";
  if (diffHours <= 24) return "bg-yellow-100";
  return "bg-white";
}

export default getDueColor;
