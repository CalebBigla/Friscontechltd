import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "@/components/site";
import { useSettings } from "@/lib/hooks/useSupabaseData";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({ meta: [
    { title: "Terms of Use | Friscon Tech" },
    { name: "description", content: "Terms of Use for Friscon Tech Limited" },
    { property: "og:title", content: "Terms of Use | Friscon Tech" },
    { property: "og:type", content: "website" },
  ] }),
  component: TermsOfUse,
});

function TermsOfUse() {
  const { data: settings } = useSettings();
  const contentRef = useScrollReveal<HTMLElement>();
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container-wide">
            <div className="eyebrow">Legal</div>
            <h1 className="display">Terms of Use</h1>
            <p>Last updated: September 12, 2026</p>
          </div>
        </section>

        <section ref={contentRef.ref} className={`section animate-fade-rise ${contentRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="legal-content">
              <h2>1. Acceptance of Terms</h2>
              <p>
                Welcome to {settings?.company_name}. By accessing or using our website and services, 
                you agree to be bound by these Terms of Use. If you do not agree to these terms, please do 
                not use our website or services.
              </p>

              <h2>2. Description of Services</h2>
              <p>
                Friscon Tech Limited is a consulting company specializing in stakeholder relations, partnership 
                building, market entry strategy, and agricultural value chain development in Nigeria. We provide:
              </p>
              <ul>
                <li>Market entry strategy and consulting services</li>
                <li>Stakeholder and government relations advisory</li>
                <li>Partnership facilitation services</li>
                <li>Agricultural value chain development</li>
                <li>Market research and analysis</li>
              </ul>

              <h2>3. Use of Website</h2>
              <h3>3.1 Permitted Use</h3>
              <p>You may use our website for lawful purposes only. You agree not to:</p>
              <ul>
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the website</li>
                <li>Transmit any harmful code, viruses, or malicious software</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Collect or harvest any personal information from the website</li>
              </ul>

              <h3>3.2 Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the 
                property of {settings?.company_name} or its licensors and is protected by Nigerian and 
                international copyright laws. You may not reproduce, distribute, or create derivative works 
                without our express written permission.
              </p>

              <h2>4. Service Terms</h2>
              <h3>4.1 Engagement</h3>
              <p>
                Specific terms for consulting services will be outlined in individual engagement letters or 
                service agreements. These Terms of Use supplement but do not replace specific contractual agreements.
              </p>

              <h3>4.2 Professional Advice</h3>
              <p>
                Information provided on our website is for general informational purposes only and does not 
                constitute professional advice. You should not rely on website content as a substitute for 
                professional consultation specific to your situation.
              </p>

              <h2>5. User Content</h2>
              <p>
                If you submit any content, feedback, or suggestions to us (via contact forms, email, or other means), 
                you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and incorporate 
                such content for business purposes.
              </p>

              <h2>6. Disclaimer of Warranties</h2>
              <p>
                Our website and services are provided "as is" and "as available" without warranties of any kind, 
                either express or implied, including but not limited to:
              </p>
              <ul>
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the website will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or completeness of content</li>
              </ul>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by Nigerian law, {settings?.company_name} shall not be 
                liable for any indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <ul>
                <li>Your use of or inability to use the website or services</li>
                <li>Any errors or omissions in website content</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Any other matter relating to the website or services</li>
              </ul>

              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless {settings?.company_name}, its directors, 
                officers, employees, and agents from any claims, liabilities, damages, losses, or expenses arising 
                from your use of the website or violation of these Terms of Use.
              </p>

              <h2>9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We do not endorse or assume responsibility 
                for the content, privacy policies, or practices of third-party sites. You access third-party links 
                at your own risk.
              </p>

              <h2>10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page 
                with an updated "Last updated" date. Your continued use of the website after changes constitutes 
                acceptance of the modified terms.
              </p>

              <h2>11. Modifications to Services</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our website or services 
                at any time without notice or liability.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the Federal 
                Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive 
                jurisdiction of the courts of Lagos State, Nigeria.
              </p>

              <h2>13. Severability</h2>
              <p>
                If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining 
                provisions shall continue in full force and effect.
              </p>

              <h2>14. Entire Agreement</h2>
              <p>
                These Terms of Use, together with our Privacy Policy and any specific service agreements, constitute 
                the entire agreement between you and {settings?.company_name} regarding use of our website 
                and services.
              </p>

              <h2>15. Contact Information</h2>
              <p>
                For questions about these Terms of Use or to report violations, please contact us:
              </p>
              <ul>
                <li><strong>Company:</strong> {settings?.company_name}</li>
                <li><strong>Email:</strong> {settings?.email}</li>
                <li><strong>Phone:</strong> {settings?.phone}</li>
                <li><strong>Address:</strong> {settings?.address}</li>
              </ul>

              <p className="legal-acknowledgment">
                By using our website and services, you acknowledge that you have read, understood, and agree 
                to be bound by these Terms of Use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
