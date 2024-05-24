import { Component } from "preact";
import SVGString from "@components/common/SVGString";

interface SocialsButtonProps {
  text: string;
  icon: string;
  url: string;
}

class SocialsButton extends Component<SocialsButtonProps> {
  render({ text, icon, url }: SocialsButtonProps) {
    return (
      <a
        href={url}
        class="px-4 py-2 h-full w-auto my-2 mx-2 border-white border rounded-lg text-lg flex flex-row group transition-colors hover:bg-white hover:text-black"
      >
        <span class="mr-2 flex flex-col justify-center">
          <SVGString
            $src={icon}
            class="h-6 inline transition-colors fill-purple-600 group-hover:fill-purple-500"
          />
        </span>
        <span class="flex flex-col justify-center">{text}</span>
      </a>
    );
  }
}

export default SocialsButton;
