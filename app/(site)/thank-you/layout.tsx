import Script from "next/script";

// Fires only when a visitor actually lands on /thank-you — i.e. only for the
// two form flows that redirect here (Contact, sitewide/park Enquire Now).
// Forms with inline success states never reach this route, so they never
// fire this conversion event.
export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="ads-conversion-submit-lead-form-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("load", function () {
              if (window.gtag) {
                gtag('event', 'ads_conversion_SUBMIT_LEAD_FORM_1', {});
              }
            });
          `,
        }}
      />
      {children}
    </>
  );
}
