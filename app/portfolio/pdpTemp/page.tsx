import { PdpTempDetail } from "@/components/portfolio/PdpTempDetail";

export default function PdpTempPage() {
  return (
    <PdpTempDetail
      category="[Category placeholder]"
      title="[Project title placeholder]"
      summary="[Project summary placeholder]"
      metricOneValue="[Metric value 1]"
      metricOneLabel="[Metric label 1]"
      metricTwoValue="[Metric value 2]"
      metricTwoLabel="[Metric label 2]"
      snapshot={[
        { label: "Type", value: "[Type placeholder]" },
        { label: "Problem", value: "[Problem summary placeholder]" },
        { label: "Solution", value: "[Solution summary placeholder]" },
        { label: "Outcome", value: "[Outcome placeholder]" },
        { label: "Tools & Systems", value: "[Tools and systems placeholder]" }
      ]}
      problemHeadline="[Problem headline placeholder]"
      problemBullets={["[Problem bullet 1]", "[Problem bullet 2]", "[Problem bullet 3]", "[Problem bullet 4]"]}
      approachHeadline="[Approach headline placeholder]"
      approachSteps={["[Approach step 1]", "[Approach step 2]", "[Approach step 3]", "[Approach step 4]", "[Approach step 5]"]}
      systemHeadline="[System headline placeholder]"
      supportTags={["[Support tag 1]", "[Support tag 2]", "[Support tag 3]", "[Support tag 4]", "[Support tag 5]", "[Support tag 6]"]}
      insights={["[Insight 1]", "[Insight 2]", "[Insight 3]", "[Insight 4]"]}
      lessons={["[Lesson 1]", "[Lesson 2]", "[Lesson 3]"]}
      ctaHeadline="[CTA headline placeholder]"
      ctaBody="[CTA body placeholder]"
      primaryCtaLabel="[Primary CTA label]"
      secondaryCtaLabel="[Secondary CTA label]"
    />
  );
}
