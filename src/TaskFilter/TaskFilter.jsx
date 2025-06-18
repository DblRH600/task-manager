// task filter for parent function: Task List

import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import {
  AdjustmentsHorizontalIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

function TaskFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    status: "all-statuses",
    priority: "all-priorities",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    onFilterChange(filters);
  };

  return (
    <div className="task-filter flex gap-8 mb-4 items-center w-full justify-between">
      <div className="flex flex-col items-left">
        <label htmlFor="status-filter">Status:</label>
        <select
          className="border rounded p-1 bg-slate-300 text-black mt-2"
          id="status-filter"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="all-statuses">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-col items-left">
        <label htmlFor="priority-filter">Priority:</label>
        <select
          className="border rounded p-1 bg-slate-300 text-black mt-2"
          id="priority-filter"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="all-priorities">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button
        style={{
          backgroundColor: "lightblue",
          color: "black",
          border: "none",
          padding: "0.25rem .6rem",
          borderRadius: "0.25rem",
        }}
        onClick={handleFilter}
      >
        <AdjustmentsVerticalIcon className="size-6 text-black" />
      </button>
      <button
        style={{
          backgroundColor: "goldenrod",
          color: "black",
          border: "none",
          padding: "0.25rem .6rem",
          borderRadius: "0.25rem",
        }}
        onClick={() => {
          const resetFilters = {
            status: "all-statuses",
            priority: "all-priorities",
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
      >
        <FunnelIcon className="size-6 text-black" />
      </button>
    </div>
  );
}

export default TaskFilter;
