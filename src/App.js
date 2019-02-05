import React, { Component, Fragment } from "react";
import Menu from "./components/Menu";
import Form from "./components/Form.js";

class App extends Component {
  render() {
    return (
      <Fragment>
        <main className="container mx-auto flex flex-col items-center w-4/5">
          <Menu />
          <Form />
        </main>
      </Fragment>
    );
  }
}

export default App;
