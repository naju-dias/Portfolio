import HeroWithLanyard from "@/components/sections/HeroWithLanyard";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import HomeBackgroundTransitions from "@/components/layout/HomeBackgroundTransitions";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative w-full">
        <HeroWithLanyard />

        <Projects />

        <HomeBackgroundTransitions
          about={<About />}
          skills={<Skills />}
          contact={<Contact />}
          footer={<Footer />}
        />
      </div>
    </main>
  );
}