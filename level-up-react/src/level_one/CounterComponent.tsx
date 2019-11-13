import * as React from "react";
import { BigButton } from "button/BigButton";

interface Props {}
interface State {
  count: number;
}
export class CounterComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const increment = () => {
      this.setState({
        count: this.state.count + 1
      });
    };

    return <BigButton onClick={increment}>{this.state.count}</BigButton>;
  }
}
