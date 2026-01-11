/**
 * Worker Categories Component
 * ===========================
 * Navigation tabs for worker categories.
 */

"use client";

import { useState } from "react";

const categories = [
  { id: "all", label: "All Workers" },
  { id: "leadership", label: "Leadership" },
  { id: "pastoral", label: "Pastoral" },
  { id: "elders", label: "Elders" },
  { id: "deacons", label: "Deacons" },
  { id: "music", label: "Music" },
  { id: "youth", label: "Youth" },
  { id: "departments", label: "Departments" },
];

export function WorkerCategories() {
  const [active, setActive] = useState("all");

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActive(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === category.id
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
