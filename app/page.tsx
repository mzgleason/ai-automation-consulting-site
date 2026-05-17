import { HomePageContent } from "@/components";
import { HomePageLoader } from "@/components/home/HomePageLoader";

export default async function HomePage() {
  return (
    <HomePageLoader>
      <HomePageContent />
    </HomePageLoader>
  );
}
