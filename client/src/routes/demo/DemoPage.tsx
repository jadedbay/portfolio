import { Component } from "preact";
import { IconExclamationCircle } from "@tabler/icons-react";
import GithubLink from "@components/common/GithubLink";

interface DemoPageProps {
    title: string;
    repoUrl: string;
    wasmPath: string;
}

class DemoPage extends Component<DemoPageProps> {
    componentDidMount() {
        this.run();
    }

    run = async () => {
        /* @vite-ignore*/
        const wasmModule = await import(`../../wasm/${this.props.wasmPath}`);
        const { demo } = wasmModule;
        const init = wasmModule.default;

        await init();
        demo("#bevy");
    };

    render() {
        return (
            <div class="flex flex-col items-center relative">
                <div class="flex self-start justify-between w-screen">
                    <div class="ml-16 mt-12 text-2xl font-bold">{this.props.title}</div>
                    <span class="mr-8"><GithubLink repoUrl={this.props.repoUrl} /></span>
                </div>
                <span class="flex mr-12 mt-4 items-center gap-2 self-end"><IconExclamationCircle color="orange"/><span>This demo uses WebGPU and is only available on Chrome version 113+</span></span>
                <canvas class="!w-[90%] !h-[calc(100vh-12rem)] border mx-12 my-6 rounded-xl" id="bevy"></canvas>
            </div>
        );
    }
}

export default DemoPage;