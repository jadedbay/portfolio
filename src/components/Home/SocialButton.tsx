import { Component } from "preact";
import SVGString from "@components/common/SVGString";

interface SocialsButtonProps {
  text: string;
  icon: string;
  url: string;
  mt: number;
}

class SocialsButton extends Component<SocialsButtonProps> {
  render({ text, icon, url, mt }: SocialsButtonProps) {
    return (
      <div class="inline-block">
        <a
          href={url}
          class="px-3 py-2 my-2 mx-2 border-white border rounded-lg text-lg inline-flex transition-colors duration-300 hover:duration-0 hover:bg-white text-transparent hover:text-off-black"
        >
          <span class="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text flex items-center">
            <SVGString $src={icon} class="h-6 inline fill-purple-600" />
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
