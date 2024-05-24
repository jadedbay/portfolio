import { Component } from "preact";
import SocialButton from "@components/Home/SocialButton";
import Socials from "@modules/common/Socials";

class Home extends Component {
  render() {
    return (
      <div class="flex h-screen w-screen items-center justify-center">
        <div class="w-1/2 flex border-r border-solid border-white text-6xl p-8">
          <span class="font-thin text-right w-full bg-gradient-to-r from-pink-700 to-purple-700 inline-block text-transparent bg-clip-text">
            jaded
            <span class="font-bold">bay</span>
          </span>
        </div>
        <div class="w-1/2 p-8 flex flex-col">
          {Socials.map((social) => (
            <SocialButton
              text={social.name}
              icon={social.icon}
              url={social.url}
              mt={social.mt}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
