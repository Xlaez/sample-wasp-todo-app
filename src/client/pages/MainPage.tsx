import { ChangeEvent } from "react";
import getTasks from "@wasp/queries/getTasks";
import { useQuery } from "@wasp/queries";
import { Task } from "@wasp/entities";
import TaskForm from "../components/TaskForm";
import updateTask from "@wasp/actions/updateTask";
import logout from "@wasp/auth/logout";

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  return (
    <div className="container">
      <TaskForm />
      {tasks && <TasksList tasks={tasks} />}

      {isLoading && "Loading..."}
      {error && "Error: " + error}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const Task = ({ task }: { task: Task }) => {
  const handleIsDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      });
    } catch (error: any) {
      window.alert("Error while updating task: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      {task.descr}
    </div>
  );
};

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (!tasks?.length) return <div>No tasks</div>;

  return (
    <div>
      {tasks.map((task, idx) => (
        <Task task={task} key={idx} />
      ))}
    </div>
  );
};

export default MainPage;
