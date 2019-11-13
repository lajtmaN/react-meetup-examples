import * as React from "react";
import { Todo, usePlaceholderTodos } from "level_two/usePlaceholderTodos";

interface ContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleCompleted: (id: number) => void;
  completeAll: () => void;
  isLoading: boolean;
}
const TodoContext = React.createContext<ContextValue | null>(null);

export const TodoContextProvider: React.FC = props => {
  const { todos: placeholderTodos, isLoading } = usePlaceholderTodos();
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    setTodos(currentTodos => [...currentTodos, ...placeholderTodos]);
  }, [placeholderTodos]);

  const addTodo = React.useCallback(
    (title: string) => {
      setTodos(curTodos => [
        ...curTodos,
        { title, completed: false, id: Date.now() }
      ]);
    },
    [setTodos]
  );

  const toggleCompleted = React.useCallback((id: number) => {
    setTodos(curTodos =>
      curTodos.map(x => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  }, []);

  const completeAll = React.useCallback(() => {
    setTodos(curTodos => curTodos.map(x => ({ ...x, completed: true })));
  }, []);

  const value: ContextValue = React.useMemo(
    () => ({ todos, addTodo, toggleCompleted, isLoading, completeAll }),
    [todos, addTodo, toggleCompleted, isLoading, completeAll]
  );
  return <TodoContext.Provider value={value} {...props} />;
};

export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoContextProvider");
  }
  const { todos, addTodo, toggleCompleted, isLoading, completeAll } = context;
  return {
    todos,
    addTodo,
    toggleCompleted,
    isLoading,
    completeAll
  };
};
