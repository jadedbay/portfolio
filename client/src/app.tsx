import Router from "preact-router";
import { render } from "preact";

import Home from "@routes/Home/Home";
import DemoPage from "@routes/demo/DemoPage";

function App() {
    return <div>
      <Router>
        <Home path="/" />
        {/* <DemoPage path="/demo/bevy_procedural_grass" title="Bevy Procedural Grass" repoUrl="https://github.com/jadedbay/bevy_procedural_grass" wasmPath="bevy_procedural_grass/bevy_procedural_grass_demo" />
        <DemoPage path="/demo/bevy_compute_noise" title="Bevy Compute Noise" repoUrl="https://github.com/jadedbay/bevy_compute_noise" wasmPath="bevy_compute_noise/bevy_compute_noise_demo" /> */}
      </Router>
    </div>
};

export default App;

render(<App />, document.body);
