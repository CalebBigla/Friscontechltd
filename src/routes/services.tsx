import { ArrowUpRight } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Footer, Header, PageHero } from "@/components/site";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useServices } from "@/lib/hooks/useSupabaseData";
import serviceImage from "@/assets/service-clarity.jpg";
import logisticsImage from "@/assets/logistics-sector.jpg";
import graduateImage from "@/assets/graduate-recruitment.jpg";
import financialImage from "@/assets/financial-analyst.jpg";
import careerImage from "@/assets/career-development.jpg";
import heroImage from "@/assets/download-34.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({ 
    meta: [
      { title: "Services | Nigeria Market Entry & Agricultural Consulting | Friscon Tech Lagos" },
      { name: "description", content: "Comprehensive Nigeria market entry services from Lagos: stakeholder relations, partnership facilitation, agricultural value chains, government liaison, and business development across Nigeria." },
      { property: "og:title", content: "Nigeria Market Entry Services | Friscon Tech Lagos" },
      { property: "og:description", content: "Expert consulting for Nigeria market entry, agricultural development, stakeholder engagement, and business partnerships. Based in Lagos, serving all of Nigeria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://friscontech.com/services" },
      { property: "og:locale", content: "en_NG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nigeria Market Entry Services | Friscon Tech Lagos" },
      { name: "twitter:description", content: "Market entry strategy, agricultural consulting, and stakeholder relations for Nigeria." },
      { name: "keywords", content: "Nigeria market entry services, agricultural consulting Nigeria, stakeholder relations Lagos, business partnership Nigeria, government liaison Nigeria, market strategy consulting, agricultural value chain Nigeria, Lagos business services" },
      { name: "geo.region", content: "NG-LA" },
      { name: "geo.placename", content: "Lagos, Nigeria" },
    ] 
  }),
  component: Services,
});

function AnimatedServiceDetail({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  
  return (
    <article 
      ref={ref}
      className={`service-detail animate-fade-rise ${isVisible ? "visible" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="service-detail-top">
        <span className="service-number">{service.number}</span>
        <ArrowUpRight className="service-detail-icon" size={25} />
      </div>
      <div>
        <h2 className="display">{service.title}</h2>
        <p>{service.detail}</p>
        <Link className="text-link" to="/contact">Talk to us <ArrowUpRight size={14} /></Link>
      </div>
    </article>
  );
}

function Services() {
  const textWrapRef = useScrollReveal<HTMLElement>();
  const serviceListRef = useScrollReveal<HTMLElement>();
  const section2Ref = useScrollReveal<HTMLElement>();
  const imageRef1 = useScrollReveal<HTMLElement>();
  const imageRef2 = useScrollReveal<HTMLElement>();
  const imageRef3 = useScrollReveal<HTMLElement>();
  
  // Fetch services from Supabase
  const { data: services } = useServices();
  
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PageHero 
          eyebrow="Our services" 
          title={<>The right insight<br />changes <span className="text-orange">everything.</span></>} 
          intro="From first question to lasting partnership, we bring the local expertise and practical momentum your Nigeria strategy needs."
          bgImage={heroImage}
        />
        
        {/* Service Image 1 - Text Wrap Style */}
        <section ref={textWrapRef.ref} className={`section section-tight animate-fade-rise ${textWrapRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="text-wrap-layout">
              <img src={serviceImage} alt="Service clarity and client engagement" className="text-wrap-image" loading="lazy" />
              <div className="text-wrap-content">
                <h3 className="text-wrap-title">Clear service. Clear value.</h3>
                <p>Our approach is built around understanding what you need, presenting options clearly, and delivering practical next steps. No jargon. No assumptions. Just focused expertise that moves your work forward.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section ref={serviceListRef.ref} className={`section animate-fade-rise ${serviceListRef.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="service-list">
              {services?.map((service, i) => (
                <AnimatedServiceDetail key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Three-Image Grid Section */}
        <section ref={imageRef3.ref} className={`section section-tight`}>
          <div className="container-wide">
            <div className="three-image-grid">
              {[
                { img: graduateImage, alt: "Graduate recruitment and talent development", caption: "Talent Development" },
                { img: financialImage, alt: "Financial analysis and market intelligence", caption: "Market Intelligence" },
                { img: careerImage, alt: "Professional growth and career development", caption: "Capacity Building" }
              ].map((item, index) => {
                const cardRef = useScrollReveal<HTMLDivElement>();
                return (
                  <div 
                    key={index}
                    ref={cardRef.ref}
                    className={`grid-image-card animate-fade-rise ${cardRef.isVisible ? "visible" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img src={item.img} alt={item.alt} loading="lazy" />
                    <div className="grid-image-caption">{item.caption}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Service Image 2 - Aside Style */}
        <section ref={imageRef2.ref} className={`section section-image-aside animate-fade-rise ${imageRef2.isVisible ? "visible" : ""}`}>
          <div className="container-wide">
            <div className="image-aside-layout">
              <div className="image-aside-content">
                <div className="eyebrow">Connected networks</div>
                <h2 className="display">From local partnerships to regional supply chains.</h2>
                <p>Nigeria's opportunity extends across sectors and geographies. Our network connects you to the people, systems and markets that matter for your growth.</p>
              </div>
              <div className="image-aside-photo">
                <img src={logisticsImage} alt="Regional logistics and supply chain networks" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
        
        <section ref={section2Ref.ref} className={`section section-dark animate-fade-rise ${section2Ref.isVisible ? "visible" : ""}`}>
          <div className="container-wide about-grid">
            <div>
              <div className="eyebrow">How we work</div>
              <h2 className="display">Clear thinking. Grounded action.</h2>
            </div>
            <div>
              <p>Every engagement is shaped around your objective, your stakeholders and the realities on the ground. We stay close to the work, keep communication clear and measure progress by what moves.</p>
              <Link className="button-orange" to="/contact">Bring us a question <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
