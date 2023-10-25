import { FormEvent } from "react";
import createTask from "@wasp/actions/createTask";

const TaskForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const descr = target.description.value;
      target.reset();
      await createTask({ descr });
    } catch (e: any) {
      window.alert("Error: " + e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" defaultValue="" />
      <input type="submit" value="Add new task" />
    </form>
  );
};

export default TaskForm;
