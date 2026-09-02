import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/components/sections/casestudies/data";
import CaseHero from "@/components/sections/casestudies/CaseHero";
import CaseAbout from "@/components/sections/casestudies/CaseAbout";
import CaseChallenges from "@/components/sections/casestudies/CaseChallenges";
import CaseSolution from "@/components/sections/casestudies/CaseSolution";
import CaseOutcome from "@/components/sections/casestudies/CaseOutcome";

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) return {};

  return {
    title: study.metaTitle,
    description: study.metaDescription,
  };
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) notFound();

  return (
    <>
      <CaseHero
        companyName={study.companyName}
        backgroundImage={study.heroImage}
      />
      <CaseAbout
        heading={study.about.heading}
        paragraphs={study.about.paragraphs}
      />
      <CaseChallenges
        intro={study.challenges.intro}
        items={study.challenges.items}
        closing={study.challenges.closing}
      />
      <CaseSolution
        intro={study.solution.intro}
        steps={study.solution.steps}
      />
      <CaseOutcome paragraphs={study.outcome.paragraphs} />
    </>
  );
}
