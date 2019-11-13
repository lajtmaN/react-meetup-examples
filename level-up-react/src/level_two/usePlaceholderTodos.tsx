import React from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const usePlaceholderTodos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(r => r.json())
      .then(todos => todos.slice(0, 5)) // just take the 5 first, it's fine
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []); // Empty dependency array -> Only run once

  return {
    todos,
    isLoading
  };
};

export const useTodo = (id: number) => {
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/" + id)
      .then(r => r.json())
      .then(setTodo)
      .finally(() => setIsLoading(false));
  }, [id]); // Reload if id changes

  return {
    todo,
    isLoading
  };
};
