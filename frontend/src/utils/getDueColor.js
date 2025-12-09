function getDueColor(task) {
  if (task.status === "completed") return "bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-400";
  if (!task.dueDate) return "bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-300";

  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const diffHours = (dueDate - now) / (1000 * 60 * 60);

  if (diffHours < 0) return "bg-gradient-to-br from-rose-50 to-red-100 border-rose-400";
  if (diffHours <= 24) return "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-400";
  return "bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-300";
}

export default getDueColor;
