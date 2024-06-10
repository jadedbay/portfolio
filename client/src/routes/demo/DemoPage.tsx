import { Component } from "preact";
import { IconExclamationCircle } from "@tabler/icons-react";
import GithubLink from "@components/common/GithubLink";
import Nav from "@components/Nav/Nav";
import Markdown from "markdown-to-jsx";
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface DemoPageProps {
    title: string;
    repoUrl: string;
    demo: any;
    init: any;
}

interface DemoPageState {
    usageContent: string;
}

class DemoPage extends Component<DemoPageProps, DemoPageState> {
    constructor(props: DemoPageProps) {
        super(props);
        this.state = {
            usageContent: ''
        }
    }

    componentDidMount() {
        this.run();
        this.fetchReadme();
    };

    fetchReadme = async () => {
        const response = await fetch('https://raw.githubusercontent.com/jadedbay/bevy_compute_noise/master/README.md');
        const text = await response.text();
    
        const usageRegex = /## Usage[\s\S]+?(?=^## [^#])/m;
        const usageMatch = text.match(usageRegex);
    
        let usageContent = "";
        if (usageMatch) {
            usageContent = usageMatch[0];
        }
        this.setState({ usageContent });
    };

    run = async () => {
        await this.props.init();
        this.props.demo("#bevy");
    };

    render() {
        const markdownOptions = {
            overrides: {
                h2: {
                    component: 'h2',
                    props: { style: { fontSize: '1.75rem', borderBottom: '1px solid #ccc', padding: '0.5rem 0', margin: '0.5rem 0' } },
                },
                h3: {
                    component: 'h3',
                    props: { style: { fontSize: '1.25rem' } },
                },
                code: {
                    component: CodeBlock
                },
            },
        };

        return (
            <div class="max-w-[100vw] overflow-x-clip">
                <Nav />
                <div class="flex flex-col items-center relative">
                    <div class="flex self-start justify-between w-screen">
                        <div class="ml-16 mt-12 text-2xl font-bold">{this.props.title}</div>
                        <span class="mr-8"><GithubLink repoUrl={this.props.repoUrl} /></span>
                    </div>
                    <span class="flex mx-12 mt-4 items-center gap-2 self-end"><IconExclamationCircle color="orange"/><span>This demo uses WebGPU and is only available on Chrome version 113+</span></span>
                    <canvas class="!w-[90%] !h-[calc(100vh-12rem)] border border-zinc-500 mx-12 my-6 rounded-xl" id="bevy"></canvas>
                    <div class="!w-[90%]">
                        <div class="overflow-auto whitespace-pre-wrap m-4 px-8 bg-zinc-700 rounded-lg">
                            <Markdown options={markdownOptions}>{this.state.usageContent}</Markdown>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

const CodeBlock = ({ className, children }: any) => {
    if (className) {
        const language = className ? className.replace(/lang-/, '') : "rust";
        return (
            <SyntaxHighlighter language={language} style={gruvboxDark}>
                {children}
            </SyntaxHighlighter>
        );
    } else {
        const customStyle = {
            backgroundColor: '#242424',
            padding: '5px',
            borderRadius: '5px'
        };
        return <code style={customStyle}>{children}</code>;
    }
};

export default DemoPage;
