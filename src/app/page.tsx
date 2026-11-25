import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Ribbon } from "@/components/sections/Ribbon";
import { Statement } from "@/components/sections/Statement";
import { Projects } from "@/components/sections/Projects";
import { Lab } from "@/components/sections/Lab";
import { LeetCode } from "@/components/sections/LeetCode";
import { Toolbox } from "@/components/sections/Toolbox";
import { Writing } from "@/components/sections/Writing";
import { Mentoring } from "@/components/sections/Mentoring";
import { Motivation } from "@/components/sections/Motivation";
import { Mindset } from "@/components/sections/Mindset";
import { Experience } from "@/components/sections/Experience";
import { Highlights } from "@/components/sections/Highlights";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { SphereLoader } from "@/components/three/SphereLoader";

export default function Home() {
  return (
    <>
      <Header />
      <SphereLoader />
      <main>
        <Hero />
        <Ribbon />
        <Statement />
        <Projects />
        <Lab />
        <LeetCode />
        <Toolbox />
        <Writing />
        <Mentoring />
        <Motivation />
        <Mindset />
        <Experience />
        <Highlights />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
