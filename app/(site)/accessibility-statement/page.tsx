import { NODAL_OFFICER } from "@/lib/nodalOfficer";

// TODO(KSH): wording, response time, known-limitation target dates and the
// dates below are drafts awaiting KSH approval.
export const metadata = {
  title: "Accessibility Statement - KSH INFRA",
  description:
    "KSH INFRA's commitment to an accessible website: the standard we follow, known limitations and how to report an accessibility problem.",
  alternates: { canonical: "https://www.kshinfra.com/accessibility-statement" },
};

const H2 =
  "font-semibold text-[22px] md:text-[28px] tracking-tight text-[#212121] pt-6";

const Page = () => {
  return (
    <section className="bg-cream">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20 md:pt-[150px] md:pb-24">
        <h1 className="section-title font-[family:var(--font-sora),sans-serif] font-bold uppercase text-[28px] sm:text-[34px] md:text-[44px] leading-[1.15] tracking-tight">
          Accessibility Statement
        </h1>

        <div className="mt-10 space-y-5 text-[#4A4A4A] text-[17px]! text-body">
          <h2 className={H2}>Our commitment</h2>
          <p>
            KSH INFRA Investment Managers Private Limited is committed to making
            www.kshinfra.com usable by everyone, including people with
            disabilities who use a keyboard, screen-reading software,
            magnification or other assistive technology.
          </p>

          <h2 className={H2}>Standard we follow</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1
            Level AA, as required by SEBI circular
            SEBI/HO/ITD-1/ITD_VIAP/P/CIR/2025/131.
          </p>

          <h2 className={H2}>Scope</h2>
          <p>
            This statement covers www.kshinfra.com, including third-party
            content shown on it: Google Maps, Vimeo videos, blog content
            published from WordPress, and links to our social media pages.
          </p>

          <h2 className={H2}>Conformance status</h2>
          <p>
            The website is <strong>partially conformant</strong> with WCAG 2.1
            Level AA. Known limitations we are working on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Some videos do not yet have captions or Indian Sign Language versions.</li>
            <li>Some background videos and the home page banner move automatically without a pause control.</li>
            <li>Some text does not yet meet colour-contrast requirements.</li>
            <li>Third-party content (maps, embedded videos) may not be fully accessible.</li>
          </ul>

          <h2 className={H2}>How we test</h2>
          <p>
            The website was audited by ITE Software Solutions on 21 October
            2026. We fix reported issues and re-test the website periodically.
          </p>

          <h2 className={H2}>Report a problem</h2>
          <p>
            If you find any part of this website difficult to use, please
            contact our Accessibility (Nodal) Officer:
          </p>
          <ul className="list-none space-y-1">
            <li>
              {NODAL_OFFICER.name}, {NODAL_OFFICER.designation}
            </li>
            <li>
              Email:{" "}
              <a className="underline" href={`mailto:${NODAL_OFFICER.email}`}>
                {NODAL_OFFICER.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="underline" href={NODAL_OFFICER.phoneHref}>
                {NODAL_OFFICER.phone}
              </a>
            </li>
          </ul>
          <p>We aim to respond to accessibility feedback promptly.</p>

          <h2 className={H2}>Escalation</h2>
          <p>
            If you are not satisfied with our response, you can raise a
            complaint on the SEBI SCORES portal at{" "}
            <a
              className="underline"
              href="https://scores.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              scores.sebi.gov.in
            </a>
            .
          </p>

          <h2 className={H2}>Dates</h2>
          <p>Published: 27 October 2026. Last reviewed: 27 October 2026.</p>
        </div>
      </div>
    </section>
  );
};

export default Page;
