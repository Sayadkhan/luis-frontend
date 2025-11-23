import Club from "./_components/Club";
import Contact from "./_components/Contact";
import Experience from "./_components/Experience";
import FAQ from "./_components/Faq";
import Hero from "./_components/Hero";
import Ownership from "./_components/OwnerShip";

const page = () => {
  return (
    <div>
      <Hero />
      <Club />
      <Ownership />
      <Experience />
      {/* <SpecialOffer /> */}
      <FAQ />
      <Contact />
    </div>
  );
};

export default page;
