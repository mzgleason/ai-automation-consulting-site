"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Logo = {
  src: string;
  alt: string;
};

type LogoMarqueeProps = {
  logos?: Logo[];
};

const defaultLogos: Logo[] = [
  { src: "https://logo.clearbit.com/google.com", alt: "Google" },
  { src: "https://logo.clearbit.com/microsoft.com", alt: "Microsoft" },
  { src: "https://logo.clearbit.com/slack.com", alt: "Slack" },
  { src: "https://logo.clearbit.com/notion.so", alt: "Notion" },
  { src: "https://logo.clearbit.com/airtable.com", alt: "Airtable" },
  { src: "https://logo.clearbit.com/zapier.com", alt: "Zapier" },
  { src: "https://logo.clearbit.com/atlassian.com", alt: "Atlassian" },
  { src: "https://logo.clearbit.com/shopify.com", alt: "Shopify" },
  { src: "https://logo.clearbit.com/stripe.com", alt: "Stripe" },
  { src: "https://logo.clearbit.com/hubspot.com", alt: "HubSpot" },
  { src: "https://logo.clearbit.com/salesforce.com", alt: "Salesforce" },
  { src: "https://logo.clearbit.com/adobe.com", alt: "Adobe" }
];

export default function LogoMarquee({ logos = defaultLogos }: LogoMarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div aria-label="Brand logos" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-14 items-center justify-center rounded-md border border-white/15 bg-white/5 px-4"
          >
            <Image src={logo.src} alt={logo.alt} width={120} height={40} className="h-10 w-auto opacity-85" />
          </div>
        ))}
      </div>
    );
  }

  const loop = [...logos, ...logos];

  return (
    <div className="group relative overflow-hidden" aria-label="Brand logos marquee">
      <motion.div
        className="flex w-max items-center gap-10 will-change-transform [transform:translate3d(0,0,0)] group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 26,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear"
        }}
      >
        {loop.map((logo, idx) => (
          <div key={`${logo.alt}-${idx}`} className="flex h-14 w-[140px] items-center justify-center">
            <Image src={logo.src} alt={logo.alt} width={120} height={40} className="h-10 w-auto opacity-85" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
