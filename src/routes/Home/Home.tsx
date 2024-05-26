import { Component } from "preact";
import SocialButton from "@components/Home/SocialButton";
import Socials from "@modules/common/Socials";

import { IconCaretDown } from "@tabler/icons-react";

class Home extends Component {
  render() {
    return (
      <div>
        <div class="min-h-screen flex flex-col justify-between">
          <div class="flex-grow-[1.6]"></div>
          <div class="relative h-1/2 w-screen flex justify-center items-center self-center">
            <div class="w-1/2 border-r border-zinc-300 overflow-hidden">
              <span class="animate-title-slide-in float-right p-8 font-thin text-3xl sm:text-6xl xs:text-9vw bg-gradient-to-r from-pink-700 to-purple-700 text-transparent bg-clip-text">
                jaded
                <span class="font-normal">bay</span>
              </span>
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
          </div>
          <div class="flex-grow-[0.4]"></div>
          <span
            class="m-1/16 animate-bounce text-zinc-300 hover:text-[#b52f9c] hover:animate-none self-center"
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
        <div class="min-h-screen bg-zinc-700"></div>
      </div>
    );
  }
}

export default Home;
