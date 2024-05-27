import { IconArrowRight } from "@tabler/icons-react";

enum Link {
  Demo,
  Site,
  InviteBot,
}

interface LinkProps {
  link: Link;
  url: string;
}

function LinkButton({ link, url }: LinkProps) {
  let text = "";
  let linkClass =
    "mx-8 mt-4 p-4 rounded-lg flex items-center justify-between group";
  switch (link) {
    case Link.Demo:
      text += "View Demo";
      linkClass += " bg-purple-700 hover:bg-purple-800";
      break;
    case Link.Site:
      text += "View Site";
      linkClass += " bg-teal-600 hover:bg-teal-700";
      break;
    case Link.InviteBot:
      text += "Invite Bot";
      linkClass += " bg-blue-600 hover:bg-blue-700";
      break;
  }
  return (
    <a href={url} class={linkClass}>
      <span class="text-zinc-300 font-medium -translate-y-[1px]">{text}</span>
      <span class="mr-2 group-hover:translate-x-[50%] group-hover:duration-500 transition-transform duration-250 ">
        <IconArrowRight />
      </span>
    </a>
  );
}

export { Link, LinkButton };
