import Club from "../_components/Club";
import Contact from "../_components/Contact";
import Experience from "../_components/Experience";
import FAQ from "../_components/Faq";
import Hero from "../_components/Hero";
import Ownership from "../_components/OwnerShip";
import BlogSlider from "../_components/BlogSlider";

const page = () => {
  return (
    <div>
      <Hero />
      <Club />
      <Ownership />
      <Experience />
      <BlogSlider />
      {/* <SpecialOffer /> */}
      <FAQ />
      <Contact />
    </div>
  );
};

export default page;
