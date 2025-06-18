// Task List
import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import TaskFilter from "../TaskFilter/TaskFilter";
// import TaskFilter from "../TaskFilter/TaskFilter";

//  Static data for mockups
const tasks = [
  {
    id: 1,
    title: "task a",
    description: "acquire the plans to the Death Star",
    status: "completed",
    priority: "low",
    dueDate: "1BBY",
  },
  {
    id: 2,
    title: "task b",
    description: "deliver the plans to the Alliance",
    status: "in-progress",
    priority: "high",
    dueDate: ".75BBY",
  },
  {
    id: 3,
    title: "task c",
    description: "escape Tattooine",
    status: "completed",
    priority: "medium",
    dueDate: ".25BBY",
  },
  {
    id: 4,
    title: "task d",
    description: "attack the Death Star",
    status: "in-progress",
    priority: "medium",
    dueDate: ".1BBY",
  },
  {
    id: 5,
    title: "task e",
    description: "Use the Force Luke",
    status: "pending",
    priority: "high",
    dueDate: "0BBY",
  },
];

function TaskList() {
  //   State variables for dynamic functions
  const [tasksState, setTasksState] = useState(tasks);
  const [filters, setFilters] = useState({});

  //   Used for handling Delete task function
  const handleDelete = (taskId) => {
    const updatedTasks = tasksState.filter((task) => task.id !== taskId);
    setTasksState(updatedTasks);
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
  };

  //  Used to handle Filtering task
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filterTasks = tasksState.filter((task) => {
    const { status, priority } = filters;
    return (status === "all-statuses" || task.status === status) && (priority === "all-priorities" || task.priority === priority);
  });
  console.log("Filtered Tasks:", filterTasks);

  return (
    <div className="task-list m-8">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <TaskFilter onFilterChange={handleFilterChange} />
      <ul>
        {filterTasks.map((task) => (
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
