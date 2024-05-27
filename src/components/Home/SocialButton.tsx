import SVGString from "@components/common/SVGString";

interface SocialButtonProps {
  text: string;
  icon: string;
  url: string;
  delay: number;
}

export default function SocialButton({
  text,
  icon,
  url,
  delay,
}: SocialButtonProps) {
  return (
    <div
      class="inline-block animate-socials-slide-in opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <a
        href={url}
        class="px-3 py-2 my-2 mx-2 border-zinc-500 border rounded-lg text-lg inline-flex transition-colors duration-300 hover:duration-0 hover:bg-zinc-700 fill-zinc-500 hover:fill-purple-600"
      >
        <span class="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text flex items-center text-[#b52f9c] xs:text-transparent">
          <SVGString $src={icon} class="h-6 inline" />
          <span class="pl-3 -translate-y-[1px]">{text}</span>
        </span>
      </a>
    </div>
  );
}
