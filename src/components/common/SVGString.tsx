import SVG from "react-inlinesvg";
import { JSX } from "preact";

interface Props {
  $src: string;
}

export default function SVGString({
  $src,
  ...props
}: Props & JSX.HTMLAttributes<SVGElement>) {
  // @ts-ignore
  return <SVG src={$src} {...props} />;
}
