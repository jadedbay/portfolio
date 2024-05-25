import { Component } from "preact";
import SVGString from "@components/common/SVGString";

interface SocialButtonProps {
  text: string;
  icon: string;
  url: string;
  mt: number;
  delay: number;
}

class SocialsButton extends Component<SocialButtonProps> {
  render({ text, icon, url, mt, delay }: SocialButtonProps) {
    return (
      <div
        class="inline-block animate-socials-slide-in opacity-0"
        style={{ animationDelay: `${delay}s` }}
      >
        <a
          href={url}
          class="px-3 py-2 my-2 mx-2 border-zinc-500 border rounded-lg text-lg inline-flex transition-colors duration-300 hover:duration-0 hover:bg-zinc-700 fill-zinc-500 hover:fill-purple-600 text-transparent"
        >
          <span class="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text flex items-center">
            <SVGString $src={icon} class="h-6 inline" />
            <span class="justify-center pl-3" style={{ marginTop: `${mt}rem` }}>
              {text}
            </span>
          </span>
        </a>
      </div>
    );
  }
}

export default SocialsButton;
