import Hero from "@/components/sections/home/hero";
import Showreel from "@/components/sections/home/showreel";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Showreel />
      {/* Sırada diğer sectionlar olacak */}
    </main>
  );
}
