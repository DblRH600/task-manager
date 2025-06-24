// task stat component

import { ClockIcon } from "@heroicons/react/16/solid";
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

function TaskStats({ tasks }) {
  // variables to configure stats & stat filtering
  const statList = tasks || [];
  const total = statList.length;
  const completed = statList.filter((t) => t.status === "completed").length;
  const inProgress = statList.filter((t) => t.status === "in-progress").length;
  const pending = statList.filter((t) => t.status === "pending").length;

  return (
    <div className="items-center task-stats border p-4 m-4">
      <h2 className="text-xl font-semibold mb-2">Task Stats</h2>
      <div className="flex gap-5">
        <h2>Total: <strong>{total}</strong> </h2>
        <ul className="space-y-1 border rounded p-2 w-full">
          <li className="flex items-center gap-2">
            <CheckBadgeIcon className="h-3 w-3 text-green-500" />
            Completed: {completed}
          </li>
          <li className="flex items-center gap-2">
            <ShieldExclamationIcon className="h-3 w-3 text-orange-500" />
            In Progress: {inProgress}
          </li>
          <li className="flex items-center gap-2">
            <ClockIcon className="h-3 w-3 text-slate-500" />
            Pending: {pending}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TaskStats;
