import * as React from "react";
import { Todo } from "level_two/usePlaceholderTodos";
import { List, ListItem, Checkbox, ListItemText } from "@material-ui/core";

interface Props {
  todos: Todo[];
  onToggleCompleted?: (todo: Todo) => void;
}
export const TodoList: React.FC<Props> = ({ todos, onToggleCompleted }) => {
  return (
    <List>
      {todos.length === 0 && <h1>Good job, no todos</h1>}
      {todos.map(x => (
        <TodoItem todo={x} onToggle={onToggleCompleted} key={x.id} />
      ))}
    </List>
  );
};

interface TodoItemProps {
  todo: Todo;
  onToggle?: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, onToggle }) => {
  const isDisabled = !onToggle;
  const handleToggle = () => {
    if (!onToggle) {
      return;
    }
    onToggle(todo);
  };
  return (
    <ListItem dense button disableRipple={isDisabled} onClick={handleToggle}>
      <Checkbox edge="start" checked={todo.completed} disabled={isDisabled} />
      <ListItemText primary={todo.title} />
    </ListItem>
  );
});
