import { LinkButton, LinkProps } from "@components/common/Link";
import Stargazers from "@components/common/Stargazers";
import CrateDownloads from "@components/common/CrateDownloads";
import GithubLink from "@components/common/GithubLink";

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
      <GithubLink repoUrl={repoUrl} />
      {link && <LinkButton link={link.link} url={link.url} />}
    </div>
  );
}
