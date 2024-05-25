import { Component } from "preact";
import SocialButton from "@components/Home/SocialButton";
import Socials from "@modules/common/Socials";

class Home extends Component {
  render() {
    return (
      <div>
        <div class="flex h-screen w-screen items-center justify-center">
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
        </div>
        <div class="flex h-screen w-screen bg-zinc-700"></div>
      </div>
    );
  }
}

export default Home;
