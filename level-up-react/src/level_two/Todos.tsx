import * as React from "react";
import { usePlaceholderTodos } from "./usePlaceholderTodos";
import { TodoList } from "../TodoList/TodoList";

export const Todos: React.FC = () => {
  const { todos, isLoading } = usePlaceholderTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <TodoList todos={todos} />;
};
