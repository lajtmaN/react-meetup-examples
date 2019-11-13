import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import { Counter } from "./level_one/Counter";
import { CounterComponent } from "./level_one/CounterComponent";
import { Todos as LevelTwoTodos } from "./level_two/Todos";
import { MutateTodos as LevelThreeTodos } from "./level_three/MutateTodos";
import { Menu } from "./Menu";
const App: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Menu />
      <Line />
      <PageWrapper>
        <Switch>
          <Route path="/1/old" component={CounterComponent} />
          <Route path="/1/new" component={Counter} />
          <Route path="/2" component={LevelTwoTodos} />
          <Route path="/3" component={LevelThreeTodos} />
        </Switch>
      </PageWrapper>
    </Router>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* max-width: 70%; */
`;

const Line = styled.hr`
  margin-top: 0;
`;

export default App;
