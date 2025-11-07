function getDueWarning(dueDateStr) {
  if (!dueDateStr) return "";

  const now = new Date();
  const dueDate = new Date(dueDateStr);
  const diffMs = dueDate - now;
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0) return "⚠️ Task is overdue!";
  if (diffHours <= 1) return "⚠️ Task due within an hour!";
  if (diffHours <= 24) return "⚠️ Task due within a day!";
  return "";
}

export default getDueWarning;
