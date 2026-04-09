import { BuilderHero } from "@/components/BuilderHero";
import { getPageContent } from "@/lib/content";

export const metadata = {
  title: "Hero Testing"
};

export default async function HeroTestingPage() {
  const homePage = await getPageContent("home");

  return (
    <main className="home-page">
      <BuilderHero title={homePage.title} description={homePage.description} />
    </main>
  );
}
