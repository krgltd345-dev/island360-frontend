import ActivitySection from "@/components/activitySection/ActivitySection";
import { Hero } from "@/components/landing/Hero";
import LayoutWrapper from "@/components/layout/LayoutWrapper";


export const metadata = {
  title: "Island 360 - Book Your Perfect Getaway",
  description: "Book your dream vacation with Island 360",
};

export default function Home() {
  return (
    <LayoutWrapper>
      <Hero />
      <ActivitySection />
    </LayoutWrapper>
  );
}
