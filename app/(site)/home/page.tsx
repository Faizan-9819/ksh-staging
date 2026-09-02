import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ScrollToTopOnLoad from "@/components/ui/ScrollToTopOnLoad";
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

const Hero = dynamic(() => import("@/components/sections/Hero"));
const About = dynamic(() => import("@/components/sections/About"));
const ScrollFrames = dynamic(
  () => import("@/components/sections/ScrollFrames"),
);
const Map = dynamic(() => import("@/components/sections/Map"));
const Services = dynamic(() => import("@/components/sections/Services"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
);
//
const Partners = dynamic(() => import("@/components/sections/Partners"));
const AssetShowcase = dynamic(
  () => import("@/components/sections/AssetShowcase"),
);
const Growth = dynamic(() => import("@/components/sections/Growth"));

// Same real-blog-data fetch as app/(site)/page.tsx's Insights section — see
// that file's comment for why (previously only DEFAULT_POSTS, fake/unlinked).
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
      date: formatPostDate(post.date).toUpperCase(),
      href: postPath(post),
    })),
  );
}

export default async function Home() {
  const insightPosts = await fetchHomeInsightPosts();

  return (
    <main>
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
    </main>
  );
}
