import NameTitle from "@components/common/NameTitle";
import { IconHome } from "@tabler/icons-react";
import NavSocial from "./NavSocial";
import Socials from "@modules/common/Socials";

export default function Nav() {
    return (
        <nav class="sticky top-4 bg-zinc-800 p-4 mx-4 mt-4 rounded-xl z-50 flex items-center justify-between">
            <div>
                <div class="flex">
                    <div class="border-r flex border-zinc-500">
                        <span class="pr-4 pl-2 text-4xl -translate-y-[0.25rem]"><NameTitle /></span>
                    </div>
                    <a href="/" class="mx-2 p-2 flex hover:text-zinc-400">
                        <IconHome />
                        <span class="pl-2 font-normal">Home</span>
                    </a>
                </div>
            </div>
            <div>
                {Socials.map((social) => (
                    <NavSocial
                    icon={social.icon}
                    url={social.url}
                    />
                ))}
            </div>
        </nav>
    )
}