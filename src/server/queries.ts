import HttpError from "@wasp/core/HttpError.js";
import { Task } from "@wasp/entities";
import { GetTasks } from "@wasp/queries/types";

export const getTasks: GetTasks<void, Task[]> = async (
  args: any,
  context: any
) => {
  if (!context.user) throw new HttpError(401);

  return context.entities.Task.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: "asc" },
  });
};
