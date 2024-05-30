import { Component } from "preact";
import init, { demo } from "../../../wasm/bevy_procedural_grass/bevy_compute_noise_demo";
import { IconExclamationCircle } from "@tabler/icons-react";
import GithubLink from "@components/common/GithubLink";


class BevyProceduralGrass extends Component {
    componentDidMount() {
        this.run();
    }

    run = async () => {
        await init();
        demo("#bevy");
    };

    render() {
        return (
            <div class="flex flex-col items-center relative">
                <div class="flex self-start justify-between w-screen">
                    <div class="ml-16 mt-12 text-2xl font-bold">Bevy Procedural Grass</div>
                    <span class="mr-8"><GithubLink repoUrl="https://github.com/jadedbay/bevy_procedural_grass" /></span>
                </div>
                <span class="flex mr-12 mt-4 items-center gap-2 self-end"><IconExclamationCircle color="orange"/><span>This demo uses WebGPU and is only available on Chrome version 113+</span></span>
                <canvas class="!w-[calc(100vw-12rem)] !h-[calc(100vh-12rem)] border mx-12 my-6 rounded-xl" id="bevy"></canvas>
            </div>
        );
    }
}

export default BevyProceduralGrass;