import { Task } from "@wasp/entities";
import { CreateTask, UpdateTask } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

type CreateTaskPayload = Pick<Task, "descr">;

export const createTask: CreateTask<CreateTaskPayload, Task> = async (
  args: any,
  context: any
) => {
  if (!context.user) throw new HttpError(401);
  console.log(context.user);
  return context.entities.Task.create({
    data: { descr: args.descr, user: { connect: { id: context.user.id } } },
  });
};

type UpdateTaskPayload = Pick<Task, "id" | "isDone">;

export const updateTask: UpdateTask<
  UpdateTaskPayload,
  { count: number }
> = async ({ id, isDone }, context: any) => {
  if (!context.user) throw new HttpError(401);

  return context.entities.Task.updateMany({
    where: { id, user: { id: context.user.id } },
    data: {
      isDone,
    },
  });
};
