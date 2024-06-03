import { Component } from "preact";
import SocialButton from "@components/Home/SocialButton";
import Socials from "@modules/common/Socials";
import ProjectCard from "@components/Home/ProjectCard";
import { Link } from "@components/common/Link";

import BevyProceduralGrassImage from "@assets/projects/bevy_procedural_grass.png";
import PortfolioImage from "@assets/projects/portfolio.png";
import BevyComputeNoiseImage from "@assets/projects/bevy_compute_noise.png";

import { IconChevronCompactDown } from "@tabler/icons-react";

class Home extends Component {
  render() {
    return (
      <div class="max-w-[100vw] overflow-x-hidden">
        <div class="min-h-screen grid">
          <div class="row-start-2 relative w-screen flex justify-center items-center">
            <div class="w-1/2 border-r border-zinc-500 overflow-hidden">
              <span class="animate-title-slide-in float-right p-8 font-thin text-3xl sm:text-6xl xs:text-[9vw] bg-gradient-to-r from-pink-700 to-purple-700 text-transparent bg-clip-text">
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
                  delay={index * 0.125}
                />
              ))}
            </div>
          </div>
          <div class="row-start-3 flex justify-center align-center">
            <span
              class="animate-bounce text-zinc-400 hover:text-[#b52f9c] hover:animate-none self-center"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <IconChevronCompactDown stroke={1} size={32} />
            </span>
          </div>
        </div>
        <div
          id="projects"
          class="min-h-screen p-4 bg-zinc-700 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-screen place-items-center place-content-start items-start overflow-auto"
        >
          <ProjectCard
            title="Bevy Procedural Grass"
            description="A Bevy plugin for generating grass"
            img={BevyProceduralGrassImage}
            repoUrl="https://github.com/jadedbay/bevy_procedural_grass"
            // link={{
            //   link: Link.Demo,
            //   url: "/demo/bevy_procedural_grass",
            // }}
            stars={true}
            crateDownloads={true}
          />
          <ProjectCard
            title="Bevy Compute Noise"
            description="A Bevy plugin for creating 2D/3D tilable noise textures using compute shaders"
            img={BevyComputeNoiseImage}
            repoUrl="https://github.com/jadedbay/bevy_compute_noise"
            link={{
              link: Link.Demo,
              url: "/demo/bevy_compute_noise",
            }}
            crateDownloads={true}
          />
          <ProjectCard
            title="Portfolio"
            description="My portfolio website (you're looking at it)"
            img={PortfolioImage}
            repoUrl="https://github.com/jadedbay/portfolio"
            link={{ link: Link.Site, url: "https://jadedbay.com" }}
          />
          {/* <ProjectCard
            title="Discord FaceIt Schedule"
            description="A Discord Bot that notifies teams of upcoming FaceIt matches"
            repoUrl="https://github.com/jadedbay/DiscordFaceitSchedule"
            link={{
              link: Link.InviteBot,
              url: "https://github.com/jadedbay/DiscordFaceitSchedule",
            }}
          /> */}
        </div>
      </div>
    );
  }
}

export default Home;
