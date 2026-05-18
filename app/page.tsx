import { HomePageContent } from "@/components";
import { HomePageLoader } from "@/components/home/HomePageLoader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operator-led AI systems",
  description:
    "Mark Gleason helps teams turn ambiguous operations into executable systems using practical AI-enabled workflows and product operations.",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  return (
    <HomePageLoader>
      <HomePageContent />
    </HomePageLoader>
  );
}
