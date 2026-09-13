import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Panel from "@/components/Panel";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";
import { useRevealEnabled } from "@/lib/hooks";

export default function App() {
  useRevealEnabled();

  return (
    <div id="top" className="bg-bg text-fg min-h-full overflow-x-hidden">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Events />
        <Panel />
        <Sponsors />
        <Gallery />
        <Contact />
        <Venue />
      </main>
      <Footer />
    </div>
  );
}
