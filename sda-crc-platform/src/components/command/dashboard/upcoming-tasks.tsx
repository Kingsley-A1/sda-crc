/**
 * Upcoming Tasks Component
 * ========================
 * List of upcoming tasks and reminders.
 */

import { Card } from "@/components/ui/card";

export async function UpcomingTasks() {
  // In a real implementation, this would fetch from the database
  const tasks = [
    { id: 1, title: "Review new member applications", due: "Today", priority: "high" },
    { id: 2, title: "Upload last Sabbath's sermon", due: "Tomorrow", priority: "medium" },
    { id: 3, title: "Update event calendar for next month", due: "This week", priority: "low" },
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 rounded" />
              <span>{task.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{task.due}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  priorityColors[task.priority as keyof typeof priorityColors]
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
