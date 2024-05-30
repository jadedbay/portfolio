import Router from "preact-router";
import { render } from "preact";

import Home from "@routes/Home";
import BevyProceduralGrass from "@routes/demo/BevyProceduralGrass/BevyProceduralGrass";

const App = () => (
  <div>
    <Router>
      <Home path="/" />
      <BevyProceduralGrass path="/demo/bevy_procedural_grass" />
    </Router>
  </div>
);

render(<App />, document.body);
