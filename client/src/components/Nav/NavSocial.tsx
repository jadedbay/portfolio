import SVGString from "@components/common/SVGString";

interface NavSocialProps {
    icon: string;
    url: string;
}

export default function NavSocial({icon, url}: NavSocialProps) {
    return (
        <a href={url} class="px-3 fill-zinc-200 hover:fill-zinc-500">
            <SVGString $src={icon} class="h-6 inline" />
        </a>
    )
}