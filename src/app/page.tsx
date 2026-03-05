import About from "@/components/About";
import Booking from "@/components/Booking";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Booking />
    </div>
  );
}
