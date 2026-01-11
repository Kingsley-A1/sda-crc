/**
 * Events Calendar Component
 * =========================
 * Calendar view of events.
 */

"use client";

import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
}

export function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=100");
        const data = await res.json();
        setEvents(data.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    fetchEvents();
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split("T")[0];

    return events.filter((event) => {
      const eventStart = new Date(event.startDate).toISOString().split("T")[0];
      return eventStart === dateStr;
    });
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-800 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          →
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="p-2 h-24 border-b border-r" />
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day}
              className="p-2 h-24 border-b border-r hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <span className="text-sm">{day}</span>
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="text-xs truncate bg-primary/10 text-primary px-1 rounded mt-1"
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
