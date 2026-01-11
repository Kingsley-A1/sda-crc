/**
 * Live Schedule Component
 * =======================
 * Upcoming service schedule.
 */

export function LiveSchedule() {
  const schedule = [
    { day: "Saturday", time: "9:00 AM", service: "Sabbath School" },
    { day: "Saturday", time: "11:00 AM", service: "Divine Worship" },
    { day: "Saturday", time: "4:00 PM", service: "AY Program" },
    { day: "Wednesday", time: "6:00 PM", service: "Prayer Meeting" },
  ];

  return (
    <div className="space-y-3">
      {schedule.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50"
        >
          <div>
            <p className="font-medium">{item.service}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.day}
            </p>
          </div>
          <span className="text-primary font-semibold">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
