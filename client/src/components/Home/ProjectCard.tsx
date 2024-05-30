import { LinkButton, LinkProps } from "@components/common/Link";
import Stargazers from "@components/common/Stargazers";
import CrateDownloads from "@components/common/CrateDownloads";
import SVGString from "@components/common/SVGString";
import { siGithub } from "simple-icons";

interface ProjectCardProps {
  title: string;
  description: string;
  img?: string;
  repoUrl: string;
  link?: LinkProps;
  stars?: boolean;
  crateDownloads?: boolean;
}

export default function ProjectCard({
  title,
  
  description,
  img,
  repoUrl,
  link,
  stars,
  crateDownloads,
}: ProjectCardProps) {
  return (
    <div class="pb-8 w-[18rem] xs:w-[24rem] m-4 rounded-xl bg-zinc-900 flex flex-col shadow-off-black shadow-2xl">
      <div class="absolute flex flex-row-reverse w-[18rem] xs:w-[24rem]">
        {stars && <Stargazers url={repoUrl} />}
        {crateDownloads && <CrateDownloads url={repoUrl} />}
      </div>
      <img src={img} class="h-[15rem] object-cover rounded-[0.75rem]" />
      <span class="px-4 pt-4 text-zinc-200 font-bold text-xl">{title}</span>
      <span class="px-4 pt-4 text-zinc-400">{description}</span>
      <a
        href={repoUrl}
        class="mx-8 mt-8 p-4 rounded-lg bg-zinc-600 hover:bg-zinc-700 inline-flex items-center"
      >
        <SVGString $src={siGithub.svg} class="h-6 fill-zinc-300" />
        <span class="pl-3 text-zinc-300 font-medium -translate-y-[1px]">
          View Code
        </span>
      </a>
      {link && <LinkButton link={link.link} url={link.url} />}
    </div>
  );
}
