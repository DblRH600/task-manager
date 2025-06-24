// Dashboard component to house all Task-Management Components
import TaskList from "../TaskList/TaskList";


function Dashboard() {
  return (
    <div>
      <h1 className="mx-12">Task Dashboard</h1>

      <TaskList />
    </div>
  );
}

export default Dashboard;
