import { siGithub } from "simple-icons";
import SVGString from "./SVGString";

interface GithubLinkProps {
    repoUrl: string
}

export default function GithubLink({ repoUrl }: GithubLinkProps) {
    return (
        <a
        href={repoUrl}
        target="_blank"
        class="mx-8 mt-8 p-4 rounded-lg bg-zinc-600 hover:bg-zinc-700 inline-flex items-center"
      >
        <SVGString $src={siGithub.svg} class="h-6 fill-zinc-300" />
        <span class="pl-3 text-zinc-300 font-medium -translate-y-[1px]">
          View Code
        </span>
      </a>
    )
}
