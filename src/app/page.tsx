import Approach from "@/components/sections/home/approach";
import Hero from "@/components/sections/home/hero";
import SelectedWorks from "@/components/sections/home/selected-works";
import Showreel from "@/components/sections/home/showreel";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Showreel />
      <Approach />
      <SelectedWorks />
    </main>
  );
}
