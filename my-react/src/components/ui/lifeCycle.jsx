import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toLocaleTimeString(),
    };

    console.log("1️⃣ constructor");
  }

  componentDidMount() {
    console.log("3️⃣ componentDidMount");

    this.timer = setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log("🔁 componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("❌ componentWillUnmount");
    clearInterval(this.timer);
  }

  render() {
    console.log("2️⃣ render");

    return (
      <div>
        <h1>Jam Sekarang</h1>
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

export default Clock;
