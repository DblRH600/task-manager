// Task Form Component
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  const validation = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validation();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onAddTask({ ...formData, id: Date.now() });
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
    });

    setErrors({});
  };

  return (
    <div className="task-form border m-auto mb-2 p-4 rounded">
      <form
        className="flex flex-col gap-2 m-2"
        action=""
        onSubmit={handleSubmit}
      >
        <label htmlFor="title"></label>
        <div className="flex gap-2 justify-between">
          <input
            className="border rounded p-2 w-full"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <small className="text-red-500">{errors.title}</small>
          )}
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              padding: "0.25rem 0.6rem",
              borderRadius: "0.25rem",
            }}
          >
            <PencilSquareIcon className="h-7 w-7 text-blue-500" />
          </button>
        </div>

        <label htmlFor="description"></label>
        <textarea
          className="border rounded p-2 w-full"
          name="description"
          id="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <small className="text-red-500">{errors.description}</small>
        )}
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col w-full">
            <label htmlFor="dueDate"></label>
            <input
              className="border rounded p-2 w-full"
              type="date"
              name="dueDate"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && (
              <small className="text-red-500">{errors.dueDate}</small>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="priority"></label>
            <select
              className="border rounded p-2 w-full"
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
