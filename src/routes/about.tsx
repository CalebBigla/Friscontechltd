import { ArrowUpRight, User } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer, Header, PageHero } from "@/components/site";
import { ImageModal } from "@/components/ImageModal";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useAboutContent, useTeamMembers, useMilestones } from "@/lib/hooks/useSupabaseData";
import nigeriaImage from "@/assets/produce-2026.jpg";
import founderImage from "@/assets/professional-headshot.jpg";
import commercialImage from "@/assets/commercial-assistant.jpg";
import moneyImage from "@/assets/money-finance.jpg";
import heroImage from "@/assets/download-33.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ 
    meta: [
      { title: "About Friscon Tech | Lagos-Based Nigeria Market Consultancy" },
      { name: "description", content: "Meet the team at Friscon Tech, a Lagos-based consultancy helping international businesses navigate the Nigerian market. Expert local insight for market entry, stakeholder engagement, and agricultural partnerships." },
      { property: "og:title", content: "About Friscon Tech | Lagos-Based Nigeria Market Consultancy" },
      { property: "og:description", content: "Founded in Lagos, Friscon Tech provides expert guidance for businesses entering Nigeria. Local knowledge, trusted relationships, and practical solutions for market success." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://friscontech.com/about" },
      { property: "og:locale", content: "en_NG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Friscon Tech | Lagos-Based Nigeria Market Consultancy" },
      { name: "twitter:description", content: "Expert Nigeria market consultancy based in Lagos with deep local insight and trusted partnerships." },
      { name: "keywords", content: "Friscon Tech Lagos, Nigeria market consultancy, Lagos business advisors, Nigerian market experts, business consulting team Lagos, Chinenye Ketebu-Brown, Nigeria trade consulting" },
      { name: "geo.region", content: "NG-LA" },
      { name: "geo.placename", content: "Lagos, Nigeria" },
      { name: "author", content: "Friscon Tech" },
    ] 
  }),
  component: About,
});

function About() {
  const pullQuoteRef = useScrollReveal<HTMLElement>();
  const whyNigeriaRef = useScrollReveal<HTMLElement>();
  const approachRef = useScrollReveal<HTMLElement>();
  const governmentRef = useScrollReveal<HTMLElement>();
  const leadershipRef = useScrollReveal<HTMLElement>();
  const timelineRef = useScrollReveal<HTMLElement>();
  const imageDuoRef = useScrollReveal<HTMLElement>();
  const ctaRef = useScrollReveal<HTMLElement>();
  
  // Modal state for image lightbox
  const [modalImage, setModalImage] = useState<{
    url: string;
    name: string;
    title: string;
  } | null>(null);
  
  // Fetch data from Supabase
  const { data: aboutContent } = useAboutContent();
  const { data: teamMembers } = useTeamMembers();
  const { data: milestones } = useMilestones();
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PageHero 
          eyebrow="About Friscon Tech" 
          title={<>Built in Nigeria.<br /><span className="text-orange">Built for trust.</span></>} 
          intro="Local insight. Trusted relationships. Practical progress. We help organisations build a meaningful future in Nigeria."
          bgImage={heroImage}
        />
        
        {/* Pull Quote Section */}
        <section ref={pullQuoteRef.ref} className={`section section-tight animate-fade-rise ${pullQuoteRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="pull-quote">
              <div className="pull-quote-mark">"</div>
              <p className="pull-quote-text">{aboutContent?.pull_quote}</p>
            </div>
          </div>
        </section>
        
        {/* Why Nigeria Section */}
        <section ref={whyNigeriaRef.ref} className={`section animate-fade-rise ${whyNigeriaRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="editorial-grid">
              <div className="editorial-image-wrap">
                <img 
                  className="editorial-image" 
                  src={nigeriaImage} 
                  alt="Nigeria market landscape" 
                  width={1408} 
                  height={1008} 
                  loading="lazy" 
                />
              </div>
              <div className="editorial-content">
                <div className="eyebrow">{aboutContent?.why_nigeria_title}</div>
                <h2 className="display editorial-title">{aboutContent?.why_nigeria_intro}</h2>
                <p className="editorial-body">{aboutContent?.why_nigeria_body}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach Section */}
        <section ref={approachRef.ref} className={`section section-dark animate-fade-rise ${approachRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide about-grid">
            <div>
              <div className="eyebrow">Our approach</div>
              <h2 className="display">{aboutContent?.our_approach_title}</h2>
            </div>
            <div>
              <p>{aboutContent?.our_approach_body}</p>
            </div>
          </div>
        </section>
        
        {/* Government Relations */}
        <section ref={governmentRef.ref} className={`section section-tight animate-fade-rise ${governmentRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="centered-content">
              <p className="large-text">{aboutContent?.government_body}</p>
            </div>
          </div>
        </section>
        
        {/* Leadership Section */}
        <section ref={leadershipRef.ref} className={`section section-dark animate-fade-rise ${leadershipRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="section-header">
              <div>
                <div className="eyebrow">Leadership</div>
                <h2 className="display section-title">The people behind<br />the work.</h2>
              </div>
            </div>
            <div className="team-grid">
              {teamMembers?.map((member, index) => {
                const { ref, isVisible } = useScrollReveal<HTMLElement>();
                return (
                  <article 
                    key={member.id} 
                    ref={ref}
                    className={`team-card animate-fade-rise ${isVisible ? "visible" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div 
                      className="team-photo-real"
                      onClick={() => setModalImage({
                        url: member.image_url || founderImage,
                        name: member.name,
                        title: member.title,
                      })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setModalImage({
                            url: member.image_url || founderImage,
                            name: member.name,
                            title: member.title,
                          });
                        }
                      }}
                      aria-label={`View larger image of ${member.name}`}
                    >
                      <img src={member.image_url || founderImage} alt={member.name} className="team-photo-img" />
                    </div>
                    <h3 className="team-name">{member.name}</h3>
                    {member.subtitle && <div className="team-subtitle">{member.subtitle}</div>}
                    <div className="team-title">{member.title}</div>
                    <p className="team-bio">{member.bio}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section ref={timelineRef.ref} className={`section animate-fade-rise ${timelineRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="section-header">
              <div>
                <div className="eyebrow">Our journey</div>
                <h2 className="display section-title">A decade of<br />moving forward.</h2>
              </div>
            </div>
            <div className="timeline-horizontal">
              {milestones?.map((item, i) => {
                const itemRef = useScrollReveal<HTMLDivElement>();
                return (
                  <div 
                    ref={itemRef.ref}
                    className={`timeline-item ${itemRef.isVisible ? "visible" : ""}`}
                    key={item.id}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="timeline-item-year">{item.year}</div>
                    <div className="timeline-item-title">{item.title}</div>
                    <div className="timeline-item-text">{item.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Image Showcase Section */}
        <section ref={imageDuoRef.ref} className={`section section-tight animate-fade-rise ${imageDuoRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="about-image-duo">
              <img src={commercialImage} alt="Commercial operations and business administration" loading="lazy" />
              <img src={moneyImage} alt="Financial management and investment strategy" loading="lazy" />
            </div>
          </div>
        </section>
        
        <section ref={ctaRef.ref} className={`cta-band animate-fade-rise ${ctaRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide cta-inner">
            <div>
              <h2 className="display cta-title">Need help?</h2>
              <p className="cta-subtitle">Explore our Agricultural development services</p>
            </div>
            <div className="cta-actions">
              <a className="button-dark" href="tel:+2348032461305">Call us <ArrowUpRight size={15} /></a>
              <Link className="button-dark" to="/services">Agricultural Services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Image Modal */}
      {modalImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setModalImage(null)}
          imageUrl={modalImage.url}
          altText={modalImage.name}
          title={modalImage.name}
          subtitle={modalImage.title}
        />
      )}
    </div>
  );
}
