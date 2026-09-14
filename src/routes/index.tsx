import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/logistics-hero.jpg";
import agricultureImage from "@/assets/smart-farming-biopesticides.jpg";
import farmEmpowermentImage from "@/assets/farm-empowerment.jpg";
import clientRelationshipsImage from "@/assets/client-relationships.jpg";
import { Footer, Header } from "@/components/site";
import { siteContent } from "@/lib/site-content";
import { useScrollReveal, useCountUp } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Friscon Tech | Your bridge to the Nigerian market" },
    { name: "description", content: "Market entry strategy, stakeholder relations and agricultural value-chain development for Nigeria." },
    { property: "og:title", content: "Friscon Tech | Your bridge to the Nigerian market" },
    { property: "og:description", content: "Market entry strategy, stakeholder relations and agricultural value-chain development for Nigeria." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], }),
  component: Home,
});

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  const count = useCountUp(numericValue, 2000, isVisible);
  
  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">{isVisible ? `${count}${suffix}` : value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function AnimatedServiceCard({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();
  
  return (
    <Link 
      ref={ref}
      className={`service-card animate-fade-rise ${isVisible ? "visible" : ""}`} 
      to="/services" 
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="service-number">{service.number}</div>
      <div className="service-arrow"><ArrowUpRight size={22} /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </Link>
  );
}

function HeroTitle() {
  const words = ["Your", "Bridge", "to", "the", "Nigerian", "Market."];
  
  return (
    <h1 className="display hero-title">
      {words.map((word, i) => (
        <span key={i}>
          {i === 4 ? (
            <em className={`hero-word hero-word-${i + 1}`}>{word}</em>
          ) : (
            <span className={`hero-word hero-word-${i + 1}`}>{word}</span>
          )}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
}

function Home() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const featureRef = useScrollReveal<HTMLElement>();
  const quoteRef = useScrollReveal<HTMLElement>();
  const imageGalleryRef = useScrollReveal<HTMLElement>();
  const ctaRef = useScrollReveal<HTMLElement>();
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero">
          <img className="hero-image" src={heroImage} alt="Business leaders building a partnership in Lagos" width={1600} height={900} />
          <div className="container-wide hero-content">
            <div className="eyebrow animate-rise">Nigeria, understood</div>
            <HeroTitle />
            <p className="hero-copy animate-rise delay-2">{siteContent.settings.heroIntro}</p>
            <div className="hero-actions animate-rise delay-2">
              <Link className="button-orange" to="/contact">Start a conversation <ArrowUpRight size={15} /></Link>
              <Link className="button-dark" to="/services">Explore our work <ArrowRight size={15} /></Link>
            </div>
          </div>
          <aside className="spotlight">
            <span className="pill">Agricultural Impact</span>
            <h3>Better value chains. Stronger communities.</h3>
            <p>We connect farmers, partners and markets to grow what matters.</p>
            <Link to="/services">Discover the practice <ArrowRight size={14} /></Link>
          </aside>
        </section>
        
        <section className="section-tight">
          <div className="container-wide">
            <div className="stats">
              {siteContent.stats.map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>
        
        <section ref={sectionRef.ref} className={`section animate-fade-rise ${sectionRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="section-header">
              <div>
                <div className="eyebrow">What we do</div>
                <h2 className="display section-title">Local context.<br /><span className="text-orange">Global ambition.</span></h2>
              </div>
              <p className="section-intro">Nigeria rewards organisations that take the time to understand its people, institutions and possibilities. That is where we come in.</p>
            </div>
            <div className="service-grid">
              {siteContent.services.map((service, i) => (
                <AnimatedServiceCard key={service.number} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>
        
        <section ref={featureRef.ref} className={`section section-dark animate-fade-rise ${featureRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide feature-grid">
            <img className="feature-image" src={agricultureImage} alt="Farmers and an agriculture advisor walking through a field" width={1408} height={1008} loading="lazy" />
            <div className="feature-copy">
              <div className="eyebrow">Our agriculture focus</div>
              <h2 className="display">From the soil up.</h2>
              <p>We believe the strongest markets are built with the people who make them work. Our agricultural programmes help turn local knowledge into productive, resilient value chains.</p>
              <ul className="feature-list">
                <li>Organic fertiliser distribution and adoption</li>
                <li>Smallholder farmer aggregation and empowerment</li>
                <li>Partnership design across public and private sectors</li>
              </ul>
              <Link className="button-orange feature-button" to="/contact">Talk to our team <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>
        
        {/* New Image Gallery Section */}
        <section ref={imageGalleryRef.ref} className={`section animate-fade-rise ${imageGalleryRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="image-showcase">
              <div className="showcase-main">
                <img src={farmEmpowermentImage} alt="Community empowerment through agricultural development" loading="lazy" />
              </div>
              <div className="showcase-aside">
                <img src={clientRelationshipsImage} alt="Building lasting client relationships" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
        
        <section ref={quoteRef.ref} className={`section animate-fade-rise ${quoteRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="quote">
              <div className="quote-mark">"</div>
              <p className="quote-text">{siteContent.testimonial.quote}</p>
              <p className="quote-meta"><strong>{siteContent.testimonial.name}</strong> · {siteContent.testimonial.role}</p>
            </div>
          </div>
        </section>
        
        <section ref={ctaRef.ref} className={`cta-band animate-fade-rise ${ctaRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide cta-inner">
            <h2 className="display cta-title">Have a market to build?</h2>
            <Link className="button-dark" to="/contact">Let's talk <ArrowUpRight size={15} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
