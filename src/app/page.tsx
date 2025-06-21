import CategorySelection from "@/components/home-page/CategorySelection";
import HeroSection from "@/components/home-page/HeroSection";
import PopularMotorcycles from "@/components/home-page/PopularMotorcycles";
import Quiz from "@/components/home-page/Quiz";
import SuggestNewMotorcycle from "@/components/home-page/SuggestNewMotorcycle";
import Welcome from "@/components/home-page/Welcome";
import DisplayAuthInfo from "@/components/main-header/DisplayAuthInfo";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <Welcome />
      <Quiz />
      <Suspense>
        <PopularMotorcycles />
      </Suspense>
      <CategorySelection />
      <SuggestNewMotorcycle />
      <DisplayAuthInfo />
    </div>
  );
}