import * as React from "react";
import { TodoList } from "TodoList/TodoList";
import { TodoContextProvider, useTodos } from "./TodoContext";
// import { TodoContextProvider, useTodos } from "./TodoContextReducer";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";

export const MutateTodos: React.FC = () => (
  <>
    <TodoContextProvider>
      <TodoOverview />
    </TodoContextProvider>
    {/* <CompleteAllButton /> */}
  </>
);

const TodoOverview: React.FC = () => {
  const { isLoading } = useTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TodosPage>
      <TodoCreator />
      <List />
      <CompleteAllButton />
    </TodosPage>
  );
};

const TodosPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 70%;
`;

const TodoCreator: React.FC = () => {
  const { addTodo } = useTodos();
  const [title, setTitle] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(title);
    setTitle("");
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        required
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        variant="outlined"
      />
      <Button type="submit" color="primary" variant="contained" fullWidth>
        Add
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 20px;
`;

const List: React.FC = () => {
  const { todos, toggleCompleted } = useTodos();
  return (
    <TodoList
      todos={todos}
      onToggleCompleted={todo => toggleCompleted(todo.id)}
    />
  );
};

const CompleteAllButton: React.FC = () => {
  const { completeAll } = useTodos();
  return (
    <Button onClick={completeAll} color="secondary">
      Complete all
    </Button>
  );
};
