import * as React from "react";
import { Todo, usePlaceholderTodos } from "level_two/usePlaceholderTodos";

interface ContextValue {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
  isLoading: boolean;
}
const TodoContext = React.createContext<ContextValue | null>(null);

type Actions =
  | { type: "add"; payload: Pick<Todo, "title" | "id"> }
  | { type: "toggle"; payload: Pick<Todo, "id"> }
  | { type: "completeAll" };

const todosReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [...state, { ...action.payload, completed: false }];
    case "toggle":
      const toggleId = action.payload.id;
      return state
        .slice()
        .map(x => (x.id === toggleId ? { ...x, completed: !x.completed } : x));
    case "completeAll":
      return state.slice().map(x => ({ ...x, completed: true }));
  }
};

export const TodoContextProvider: React.FC = props => {
  const { todos: placeholderTodos, isLoading } = usePlaceholderTodos();
  const [todos, dispatch] = React.useReducer(todosReducer, []);

  React.useEffect(() => {
    placeholderTodos.forEach(todo => dispatch({ type: "add", payload: todo }));
  }, [placeholderTodos]);

  const value: ContextValue = React.useMemo(
    () => ({ todos, dispatch, isLoading }),
    [todos, dispatch, isLoading]
  );
  return <TodoContext.Provider value={value} {...props} />;
};

export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoContextProvider");
  }
  const { todos, dispatch, isLoading } = context;

  const addTodo = React.useCallback(
    (title: string) => {
      dispatch({ type: "add", payload: { id: Date.now(), title } });
    },
    [dispatch]
  );

  const toggleCompleted = React.useCallback(
    (id: number) => {
      dispatch({ type: "toggle", payload: { id } });
    },
    [dispatch]
  );

  const completeAll = React.useCallback(() => {
    dispatch({ type: "completeAll" });
  }, [dispatch]);

  return {
    todos,
    addTodo,
    toggleCompleted,
    isLoading,
    completeAll
  };
};
