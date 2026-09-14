import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "@/components/site";
import { siteContent } from "@/lib/site-content";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Friscon Tech" },
    { name: "description", content: "Privacy Policy for Friscon Tech Limited" },
    { property: "og:title", content: "Privacy Policy | Friscon Tech" },
    { property: "og:type", content: "website" },
  ] }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const contentRef = useScrollReveal<HTMLElement>();
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container-wide">
            <div className="eyebrow">Legal</div>
            <h1 className="display">Privacy Policy</h1>
            <p>Last updated: September 12, 2026</p>
          </div>
        </section>

        <section ref={contentRef.ref} className={`section animate-fade-rise ${contentRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="legal-content">
              <h2>1. Introduction</h2>
              <p>
                {siteContent.settings.company} ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you visit our website or use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Fill out contact forms on our website</li>
                <li>Subscribe to our newsletter or communications</li>
                <li>Request information about our services</li>
                <li>Engage with us via email, phone, or WhatsApp</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and contact details (email address, phone number)</li>
                <li>Company name and professional information</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect certain information, including:</p>
              <ul>
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide requested information</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Send periodic emails regarding updates or services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul>
                <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Service providers:</strong> With trusted third parties who assist us in operating our website or conducting our business, under strict confidentiality agreements</li>
                <li><strong>Legal requirements:</strong> When required by law, regulation, or legal process</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet or electronic storage is 100% secure.
              </p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>To exercise these rights, please contact us at {siteContent.settings.email}</p>

              <h2>7. Cookies and Tracking Technologies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance user experience. 
                You can control cookie preferences through your browser settings.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect 
                personal information from children.
              </p>

              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with 
                an updated "Last updated" date. Your continued use of our services after changes constitutes 
                acceptance of the updated policy.
              </p>

              <h2>11. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
              <ul>
                <li><strong>Email:</strong> {siteContent.settings.email}</li>
                <li><strong>Phone:</strong> {siteContent.settings.phone}</li>
                <li><strong>Address:</strong> {siteContent.settings.address}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
