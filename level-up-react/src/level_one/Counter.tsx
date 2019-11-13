import * as React from "react";
import { BigButton } from "button/BigButton";

export const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);

  return <BigButton onClick={increment}>{count}</BigButton>;
};
