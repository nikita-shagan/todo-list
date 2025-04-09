import { getDb, Stores } from "@/shared/api";
import { Todo } from "../model/list-slice";

export async function addOrUpdateTodos(
  todos: Todo[],
  dbName?: string,
): Promise<void> {
  if (!todos?.length) {
    return;
  }
  const db = await getDb(dbName);
  const tx = db.transaction(Stores.TODOS, "readwrite");
  const putPromises = todos.map((todo) => tx.store.put(todo, todo.id));
  await Promise.all([...putPromises, tx.done]);
}

export async function getTodos(dbName?: string): Promise<Todo[]> {
  const db = await getDb(dbName);
  return await db.getAll(Stores.TODOS);
}

export async function deleteTodosByIds(
  ids: string[],
  dbName?: string,
): Promise<void> {
  const db = await getDb(dbName);
  const tx = db.transaction(Stores.TODOS, "readwrite");
  const deletePromises = ids.map((id) => tx.store.delete(id));
  await Promise.all([...deletePromises, tx.done]);
}
