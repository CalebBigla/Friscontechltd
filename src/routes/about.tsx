import { ArrowUpRight, User } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer, Header, PageHero } from "@/components/site";
import { siteContent } from "@/lib/site-content";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import nigeriaImage from "@/assets/produce-2026.jpg";
import founderImage from "@/assets/professional-headshot.jpg";
import commercialImage from "@/assets/commercial-assistant.jpg";
import moneyImage from "@/assets/money-finance.jpg";
import heroImage from "@/assets/download-33.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Friscon Tech | Local insight for Nigeria" },
    { name: "description", content: "Meet Friscon Tech, a Nigeria-based consultancy helping organisations enter markets and build durable partnerships." },
    { property: "og:title", content: "About Friscon Tech | Local insight for Nigeria" },
    { property: "og:description", content: "A Nigeria-based consultancy for market entry, stakeholder relations and inclusive growth." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
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
              <p className="pull-quote-text">{siteContent.about.pullQuote}</p>
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
                <div className="eyebrow">{siteContent.about.whyNigeria.title}</div>
                <h2 className="display editorial-title">{siteContent.about.whyNigeria.intro}</h2>
                <p className="editorial-body">{siteContent.about.whyNigeria.body}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach Section */}
        <section ref={approachRef.ref} className={`section section-dark animate-fade-rise ${approachRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide about-grid">
            <div>
              <div className="eyebrow">Our approach</div>
              <h2 className="display">{siteContent.about.ourApproach.title}</h2>
            </div>
            <div>
              <p>{siteContent.about.ourApproach.body}</p>
            </div>
          </div>
        </section>
        
        {/* Government Relations */}
        <section ref={governmentRef.ref} className={`section section-tight animate-fade-rise ${governmentRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="centered-content">
              <p className="large-text">{siteContent.about.government.body}</p>
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
              {siteContent.team_members.map((member) => (
                <article key={member.id} className="team-card">
                  <div className="team-photo-real">
                    <img src={founderImage} alt={member.name} className="team-photo-img" />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  {member.subtitle && <div className="team-subtitle">{member.subtitle}</div>}
                  <div className="team-title">{member.title}</div>
                  <p className="team-bio">{member.bio}</p>
                </article>
              ))}
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
              {siteContent.milestones.map((item, i) => (
                <div 
                  className="timeline-item" 
                  key={item.year}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="timeline-item-year">{item.year}</div>
                  <div className="timeline-item-title">{item.title}</div>
                  <div className="timeline-item-text">{item.text}</div>
                </div>
              ))}
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
    </div>
  );
}
