import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header, PageHero } from "@/components/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useSettings } from "@/lib/hooks/useSupabaseData";
import organicImage from "@/assets/organic-foods.jpg";
import marketingImage from "@/assets/boost-leads-marketing.jpg";
import facebookImage from "@/assets/facebook-ads.jpg";
import heroImage from "@/assets/download (30).jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ 
    meta: [
      { title: "Contact Friscon Tech Lagos | Nigeria Market Entry Consultants" },
      { name: "description", content: "Get in touch with Friscon Tech in Lagos, Nigeria. Expert consultation for market entry, agricultural partnerships, and stakeholder engagement. Call +234 803 246 1305 or visit us at Jakande, Lagos." },
      { property: "og:title", content: "Contact Friscon Tech Lagos | Nigeria Market Entry Consultants" },
      { property: "og:description", content: "Connect with Nigeria market entry experts in Lagos. Professional consulting for international businesses entering the Nigerian market." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://friscontech.com/contact" },
      { property: "og:locale", content: "en_NG" },
      { property: "og:phone_number", content: "+2348032461305" },
      { property: "og:street_address", content: "Jakande" },
      { property: "og:locality", content: "Lagos" },
      { property: "og:region", content: "Lagos State" },
      { property: "og:country_name", content: "Nigeria" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Friscon Tech Lagos | Nigeria Market Entry Consultants" },
      { name: "twitter:description", content: "Reach Nigeria market entry experts in Lagos. Call +234 803 246 1305 for consultation." },
      { name: "keywords", content: "contact Friscon Tech, Lagos business consulting, Nigeria market entry contact, Jakande Lagos office, business consulting Lagos contact, Nigeria trade consultation" },
      { name: "geo.region", content: "NG-LA" },
      { name: "geo.placename", content: "Lagos, Nigeria" },
      { name: "geo.position", content: "6.5244;3.3792" },
      { name: "ICBM", content: "6.5244, 3.3792" },
    ] 
  }),
  component: Contact,
});

function Contact() {
  const { data: settings } = useSettings();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useScrollReveal<HTMLElement>();
  const imageRef = useScrollReveal<HTMLElement>();
  const mapRef = useScrollReveal<HTMLElement>();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string || null,
      message: formData.get("message") as string,
    };

    try {
      // Fire both requests in parallel
      const web3formsPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${values.name} — Friscon Tech website`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          company: values.company || "",
          message: values.message,
        }),
      })
        .then((res) => res.json())
        .then((data) => (data.success ? "sent" : "failed"))
        .catch(() => "failed");

      const supabasePromise = web3formsPromise.then((web3formsStatus) =>
        supabase.from("form_submissions").insert({
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
          source_page: "contact",
          web3forms_status: web3formsStatus,
        })
      );

      const [web3formsStatus, { error: dbError }] = await Promise.all([
        web3formsPromise,
        supabasePromise,
      ]);

      if (web3formsStatus === "failed" && dbError) {
        // Both failed
        throw new Error("Failed to send message. Please try again.");
      }

      // At least one succeeded
      setSent(true);
      toast.success("Message sent successfully!");
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
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
        <section ref={imageRef.ref} className={`section section-tight`}>
          <div className="container-wide">
            <div className="contact-images">
              {[organicImage, marketingImage, facebookImage].map((img, index) => {
                const imgRef = useScrollReveal<HTMLImageElement>();
                const alts = [
                  "Quality organic produce and sustainable farming",
                  "Strategic communication and market development",
                  "Digital marketing and business visibility"
                ];
                return (
                  <img 
                    key={index}
                    ref={imgRef.ref}
                    src={img} 
                    alt={alts[index]} 
                    className={`contact-image animate-fade-rise ${imgRef.isVisible ? "visible" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    loading="lazy" 
                  />
                );
              })}
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
                  <span className="contact-value">{settings?.address}</span>
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <a className="contact-value" href={`mailto:${settings?.email}`}>{settings?.email}</a>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <a className="contact-value" href={`tel:${settings?.phone}`}>{settings?.phone}</a>
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
                  <button 
                    className="button-orange" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send your message"} <ArrowUpRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
        
        <section ref={mapRef.ref} className={`map-section animate-fade-rise ${mapRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286446916476!2d3.2861667!3d6.4302781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1c1ec0f7af%3A0x3e1e1a1e1a1e1a1e!2sJakande%2C%20Lagos!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Friscon Tech Office Location - Jakande, Lagos"
              />
              <div className="map-overlay">
                <span className="map-label">Jakande · Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
