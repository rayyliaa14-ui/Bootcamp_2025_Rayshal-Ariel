import React from "react";

class Counting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <>
        <h1 style={{ marginTop: "50px" }}>
          You Clicked {this.state.count} Times
        </h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click Me
        </button>
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>
          Decrease Me
        </button>
        <button
          onClick={() => this.setState({ count: (this.state.count = 0) })}
        >
          Reset Me
        </button>
      </>
    );
  }
}
export default Counting;
