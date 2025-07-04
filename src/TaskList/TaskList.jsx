// Task List
import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import TaskStats from "../TaskStats.jsx/TaskStats";

//  Static data for mockups
const tasks = [
  {
    id: 1,
    title: "task a",
    description: "acquire the plans to the Death Star",
    status: "completed",
    priority: "low",
    dueDate: "2025-06-12",
  },
  {
    id: 2,
    title: "task b",
    description: "deliver the plans to the Alliance",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-06-25",
  },
  {
    id: 3,
    title: "task c",
    description: "escape Tattooine",
    status: "completed",
    priority: "medium",
    dueDate: "2025-06-06",
  },
  {
    id: 4,
    title: "task d",
    description: "attack the Death Star",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-06-30",
  },
  {
    id: 5,
    title: "task e",
    description: "Use the Force Luke",
    status: "pending",
    priority: "high",
    dueDate: "2025-06-30",
  },
];

// used to interact with local storage
const getInitialTasks = () => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    console.log("Loaded from localStorage:", storedTasks);
    return storedTasks ? JSON.parse(storedTasks) : tasks;
  } catch {
    console.error("Failed to parse tasks from localStorage");
    return tasks; // Fallback to default tasks if parsing fails
  }
};

function TaskList() {
  //   State variables for dynamic functions
  const [tasksState, setTasksState] = useState(getInitialTasks());
  console.log("Initial task state:", tasksState);
  const [filters, setFilters] = useState({
    status: "all-statuses",
    priority: "all-priorities",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("priority");

  // used to interact with local storage
  const updateStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //   Used for handling Add task function
  //   This function is called from the TaskForm component
  const handleAddTask = (newTask) => {
    // setTasksState((prev) => [...prev, newTask]);
    const updatedTasks = [...tasksState, { ...newTask, id: Date.now() }];
    setTasksState(updatedTasks);
    updateStorage(updatedTasks);
  };

  //   Used for handling Delete task function
  const handleDelete = (taskId) => {
    const updatedTasks = tasksState.filter((task) => task.id !== taskId);
    setTasksState(updatedTasks);
    updateStorage(updatedTasks);
  };

  //   Used to handle Task Status function
  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasksState.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }

      return task;
    });

    setTasksState(updatedTasks);
    updateStorage(updatedTasks); // Update local storage after status change
  };

  //  Used to handle Filtering task
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredTasks = tasksState
    .filter((task) => {
      const status = filters.status || "all-statuses";
      const priority = filters.priority || "all-priorities";
      // const { status, priority } = filters;
      const matchesStatus = status === "all-statuses" || task.status === status;
      const matchesPriority =
        priority === "all-priorities" || task.priority === priority;
      const matchesSearchTerm = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortField === "priority") {
        return a.priority.localeCompare(b.priority);
      } else if (sortField === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortField === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  console.log("Filtered Tasks:", filteredTasks);

  return (
    <div className="task-list m-4 p-4 border rounded">
      <TaskStats tasks={tasksState} />

      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <div className="flex gap-4 mb-4 items-justify-between">
        <input
          className="border p-2 rounded w-full"
          type="text"
          placeholder="Search Task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          onChange={(e) => setSortField(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <TaskFilter onFilterChange={handleFilterChange} />
      <TaskForm onAddTask={handleAddTask} />
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
