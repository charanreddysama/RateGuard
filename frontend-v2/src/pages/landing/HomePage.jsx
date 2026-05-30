import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import SDKSection from "../../components/landing/SDKSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/layout/Footer";

function HomePage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <SDKSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default HomePage;