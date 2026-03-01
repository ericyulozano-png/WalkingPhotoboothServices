import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Gallery from "./Gallery";
import VideoShowcase from "./VideoShowcase";
import PDFDownload from "./PDFDownload";
import Footer from "./Footer";

function Home() {
  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: "#0B0B0B" }}>
      <Nav />
      <Hero />
      <About />
      <Gallery />
      <VideoShowcase />
      <PDFDownload />
      <Footer />
    </div>
  );
}

export default Home;
