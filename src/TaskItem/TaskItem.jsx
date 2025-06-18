// function to create Task Items
import { TrashIcon } from "@heroicons/react/24/outline";

function TaskItem({ task, onStatusChange, onDelete }) {
  const handleStatusChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  return (
    <div className="task-item flex justify-between items-center p-3 border-slate border-2 rounded mb-4">
      <div className={`flex flex-col gap-2 mr-8`}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <div className="flex flex-col">
          <small
            className={`font-medium 
              ${
                task.priority === "high"
                  ? "text-red-500"
                  : task.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
          >
            Priority: {task.priority}
          </small>
          <small>Due: {task.dueDate}</small>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          className={`border rounded p-2 ${
            task.status === "completed"
              ? "text-green-100"
              : task.status === "in-progress"
              ? "bg-yellow-100"
              : "text-blue-100"
          } text-black`}
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          className="text-red-500 border-none rounded p-2"
          onClick={() => onDelete(task.id)}
        >
          <TrashIcon className="size-6 text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
