// import type { Metadata } from "next";
// import dynamic from "next/dynamic";
// import ScrollToTopOnLoad from "@/components/ui/ScrollToTopOnLoad";

// export const metadata: Metadata = {
//   title: "KSH INFRA Leading Industrial Park and Warehouse Developers in India",
//   description:
//     "KSH INFRA, a leading industrial infrastructure company, provides sustainable industrial parks solutions in India as trusted industrial park developers.",
//   alternates: { canonical: "https://www.kshinfra.com/" },
// };

// const Hero = dynamic(() => import("@/components/sections/Hero"));
// const About = dynamic(() => import("@/components/sections/About"));
// const ScrollFrames = dynamic(
//   () => import("@/components/sections/ScrollFrames"),
// );
// const Map = dynamic(() => import("@/components/sections/Map"));
// const Services = dynamic(() => import("@/components/sections/Services"));
// const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
// const Testimonials = dynamic(
//   () => import("@/components/sections/Testimonials"),
// );
// //
// const Partners = dynamic(() => import("@/components/sections/Partners"));
// const AssetShowcase = dynamic(
//   () => import("@/components/sections/AssetShowcase"),
// );
// const Growth = dynamic(() => import("@/components/sections/Growth"));
// const Insights = dynamic(() => import("@/components/sections/Insights"));

// export default function Home() {
//   return (
//     <div>
//       <ScrollToTopOnLoad />
//       <Hero />
//       <About />
//       <ScrollFrames />
//       <Map />
//       <Services />
//       <CaseStudies />
//       <Testimonials />
//       <Partners />
//       <AssetShowcase />
//       <Growth />
//       <Insights />
//     </div>
//   );
// }
import type { Metadata } from "next";
import ScrollToTopOnLoad from "@/components/ui/ScrollToTopOnLoad";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ScrollFrames from "@/components/sections/ScrollFrames";
import Map from "@/components/sections/Map";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import AssetShowcase from "@/components/sections/AssetShowcase";
import Growth from "@/components/sections/Growth";
import Insights from "@/components/sections/Insights";
import {
  fetchPostsPage,
  resolveFeaturedImage,
  isBlogPost,
  isNewsPost,
  postPath,
  formatPostDate,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "KSH INFRA Leading Industrial Park and Warehouse Developers in India",
  description:
    "KSH INFRA, a leading industrial infrastructure company, provides sustainable industrial parks solutions in India as trusted industrial park developers.",
  alternates: { canonical: "https://www.kshinfra.com/" },
};

// Home's "Market Perspectives & Updates" carousel (Insights.tsx) previously
// only ever rendered its own hardcoded DEFAULT_POSTS (fake titles/images, no
// links) — same 7-card count kept here so the carousel/dots layout is
// unchanged. Blog-only (excludes News, same filter /blogs uses) so this
// stays "market perspectives", not press mentions.
async function fetchHomeInsightPosts() {
  const posts = await fetchPostsPage(1, 31);
  const blogOnlyPosts = posts.filter(
    (post) => isBlogPost(post.categories) && !isNewsPost(post.categories),
  );
  const latest = blogOnlyPosts.slice(0, 7);

  return Promise.all(
    latest.map(async (post) => ({
      title: post.title.rendered.replace(/<[^>]+>/g, ""),
      img: await resolveFeaturedImage(post),
      // Matches the previous fake data's "23 MAR 2022" style (uppercase month).
      date: formatPostDate(post.date).toUpperCase(),
      href: postPath(post),
    })),
  );
}

export default async function Home() {
  const insightPosts = await fetchHomeInsightPosts();

  return (
    <div>
      <ScrollToTopOnLoad />
      <Hero />
      <About />
      <ScrollFrames />
      <Map />
      <Services />
      <CaseStudies />
      <Testimonials />
      <Partners />
      <AssetShowcase />
      <Growth />
      {insightPosts.length > 0 ? (
        <Insights posts={insightPosts} />
      ) : (
        <Insights />
      )}
    </div>
  );
}
