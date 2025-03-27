import CategorySelection from "@/components/home-page/CategorySelection";
import CombinedHeroSection from "@/components/home-page/CombinedHeroSection";
import HeroSection from "@/components/home-page/HeroSection";
import PopularMotorcycles from "@/components/home-page/PopularMotorcycles";
import SuggestNewMotorcycle from "@/components/home-page/SuggestNewMotorcycle";
import Welcome from "@/components/home-page/Welcome";

export default function HomePage() {
  return (
    <div className="mt-8 space-y-8">
      <Welcome />
      <CombinedHeroSection />
      <HeroSection />
      <PopularMotorcycles />
      <CategorySelection />
      <SuggestNewMotorcycle />
    </div>
  );
}