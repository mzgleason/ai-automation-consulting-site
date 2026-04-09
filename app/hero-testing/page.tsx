import HeroTestingHero from "@/components/HeroTestingHero";
import { getPageContent } from "@/lib/content";

export const metadata = {
  title: "Hero Testing"
};

export default async function HeroTestingPage() {
  const homePage = await getPageContent("home");

  return (
    <main>
      <HeroTestingHero title={homePage.title} description={homePage.description} />
    </main>
  );
}
