import Router from "preact-router";
import Home from "@routes/Home";
import { render } from "preact";

const App = () => (
  <div>
    <Router>
      <Home path="/" />
    </Router>
  </div>
);

render(<App />, document.body);
