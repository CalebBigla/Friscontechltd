import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header, PageHero } from "@/components/site";
import { siteContent } from "@/lib/site-content";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import organicImage from "@/assets/organic-foods.jpg";
import marketingImage from "@/assets/boost-leads-marketing.jpg";
import facebookImage from "@/assets/facebook-ads.jpg";
import heroImage from "@/assets/download (30).jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Friscon Tech | Start a conversation" },
    { name: "description", content: "Talk to Friscon Tech about entering the Nigerian market, building partnerships or growing agricultural value chains." },
    { property: "og:title", content: "Contact Friscon Tech | Start a conversation" },
    { property: "og:description", content: "Bring us your question about Nigeria. We will bring local insight and a practical next step." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useScrollReveal<HTMLElement>();
  const imageRef = useScrollReveal<HTMLElement>();
  const mapRef = useScrollReveal<HTMLElement>();
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
    setSent(true); 
  };
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PageHero 
          eyebrow="Start a conversation" 
          title={<>Good work starts<br />with a <span className="text-orange">question.</span></>} 
          intro="Tell us what you are building, where you are getting stuck or what you want to understand. We will come back with a clear next step."
          bgImage={heroImage}
        />
        
        {/* Image Section */}
        <section ref={imageRef.ref} className={`section section-tight animate-fade-rise ${imageRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="contact-images">
              <img src={organicImage} alt="Quality organic produce and sustainable farming" className="contact-image" loading="lazy" />
              <img src={marketingImage} alt="Strategic communication and market development" className="contact-image" loading="lazy" />
              <img src={facebookImage} alt="Digital marketing and business visibility" className="contact-image" loading="lazy" />
            </div>
          </div>
        </section>
        
        <section ref={sectionRef.ref} className={`section animate-fade-rise ${sectionRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide contact-grid">
            <div>
              <div className="eyebrow">Find us</div>
              <h2 className="display section-title">Let's talk<br />about Nigeria.</h2>
              <div className="contact-details">
                <div>
                  <div className="contact-label">Office</div>
                  <span className="contact-value">{siteContent.settings.address}</span>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <a className="contact-value" href={`mailto:${siteContent.settings.email}`}>{siteContent.settings.email}</a>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <a className="contact-value" href={`tel:${siteContent.settings.phone}`}>{siteContent.settings.phone}</a>
                </div>
              </div>
            </div>
            <div>
              {sent ? (
                <div className="success-panel">
                  <Check size={26} />
                  <h2 className="display">Message received.</h2>
                  <p>Thank you for reaching out. Our team will be in touch shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Your name</label>
                      <input id="name" name="name" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email address</label>
                      <input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">How can we help?</label>
                    <textarea id="message" name="message" required />
                  </div>
                  <button className="button-orange" type="submit">
                    Send your message <ArrowUpRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
        
        <section ref={mapRef.ref} className={`map-placeholder animate-fade-rise ${mapRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <span className="map-label">Victoria Island · Lagos</span>
            <span className="map-cross">+</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
