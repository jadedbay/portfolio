import { Component, createRef } from "preact";
import init, { demo } from "../../../wasm/bevy_procedural_grass/bevy_compute_noise_demo";

class BevyProceduralGrass extends Component {

    run = async () => {
        await init();
        demo("#bevy");
    };

    render() {
        return (
            <div class="flex flex-col items-center">
                <div class="ml-4 mt-4 font-bold">Bevy Procedural Grass</div>
                <canvas class="!w-[calc(100vw-6rem)] !h-[calc(100vh-6rem)] border m-12 rounded-xl" id="bevy"></canvas>
                <button onClick={this.run}>Run Bevy App</button>
            </div>
        );
    }
}

export default BevyProceduralGrass;