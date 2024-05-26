import { Component } from "preact";
import SocialButton from "@components/Home/SocialButton";
import Socials from "@modules/common/Socials";

import { IconCaretDown } from "@tabler/icons-react";

class Home extends Component {
  render() {
    return (
      <div>
        <div class="flex h-screen w-screen items-center justify-center flex-wrap">
          <div class="w-1/2 flex border-r border-solid border-zinc-300 sm:text-6xl p-8 leading-normal xs:text-9vw animation overflow-hidden">
            <div class="animate-title-slide-in ml-auto">
              <span class="font-thin text-right w-full bg-gradient-to-r from-pink-700 to-purple-700 text-transparent bg-clip-text">
                jaded
                <span class="font-normal">bay</span>
              </span>
            </div>
          </div>
          <div class="w-1/2 p-8 flex flex-col overflow-hidden">
            {Socials.map((social, index) => (
              <SocialButton
                text={social.name}
                icon={social.icon}
                url={social.url}
                mt={social.mt}
                delay={index * 0.125}
              />
            ))}
          </div>
          <span
            class="animate-bounce absolute bottom-1/16 text-zinc-300 hover:text-[#b52f9c] hover:animate-none"
            onClick={() => {
              window.scrollTo({
                behavior: "smooth",
                top: window.innerHeight,
              });
            }}
          >
            <IconCaretDown stroke={1} size={32} />
          </span>
        </div>
        <div class="flex h-screen w-screen bg-zinc-700"></div>
      </div>
    );
  }
}

export default Home;
