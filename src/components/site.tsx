import { ArrowUpRight, Instagram, Linkedin, Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { useSettings } from "@/lib/hooks/useSupabaseData";
import { WhatsAppButton } from "./WhatsAppButton";
import { LocalBusinessStructuredData, WebsiteStructuredData, OrganizationStructuredData } from "./StructuredData";

export function Logo() {
  return <span className="brand">frisco<span className="brand-tech">ntech</span></span>;
}

export function Header() {
  const { data: settings } = useSettings();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const links = [
    ["Home", "/"],
    ["About us", "/about"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ] as const;
  return (
    <>
      <div className="utility-bar">
        <div className="container-wide utility-inner">
          <div>Market entry · stakeholder relations · value chains</div>
          <div className="utility-links">
            <a href={`tel:${settings?.phone}`}>{settings?.phone}</a>
            <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
            <span>Lagos · Nigeria</span>
            <a href="#social" aria-label="LinkedIn"><Linkedin size={13} /></a>
            <a href="#social" aria-label="Instagram"><Instagram size={13} /></a>
          </div>
        </div>
      </div>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container-wide nav-inner">
          <Link to="/" aria-label="Friscon Tech home"><Logo /></Link>
          <nav className="nav-links" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link key={href} to={href} className={`nav-link ${location.pathname === href ? "active" : ""}`}>{label}</Link>
            ))}
          </nav>
          <a className="button-orange" href={`tel:${settings?.phone}`}>Call us <ArrowUpRight size={15} /></a>
          <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {open && <nav className="mobile-nav container-wide" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} to={href} className="nav-link" onClick={() => setOpen(false)}>{label}</Link>)}</nav>}
      </header>
    </>
  );
}

export function Footer() {
  const { data: settings } = useSettings();
  
  return (
    <footer className="footer" id="social">
      <div className="container-wide footer-grid">
        <div><Logo /><p className="footer-copy">Local insight. Trusted relationships. Practical progress. We help organisations build a meaningful future in Nigeria.</p></div>
        <div><div className="footer-heading">Explore</div><nav className="footer-links"><Link to="/about">About us</Link><Link to="/services">Our services</Link><Link to="/contact">Start a conversation</Link></nav></div>
        <div><div className="footer-heading">Contact</div><div className="footer-links"><a href={`mailto:${settings?.email}`}>{settings?.email}</a><a href={`tel:${settings?.phone}`}>{settings?.phone}</a><span>{settings?.address}</span></div></div>
      </div>
      <div className="container-wide footer-bottom">
        <span>© {new Date().getFullYear()} Friscon Tech Limited</span>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <LocalBusinessStructuredData />
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, bgImage }: { eyebrow: string; title: ReactNode; intro: string; bgImage?: string }) {
  return (
    <section className="page-hero">
      {bgImage && <img className="page-hero-image" src={bgImage} alt="" />}
      <div className="container-wide">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="display animate-rise">{title}</h1>
        <p className="animate-rise delay-1">{intro}</p>
      </div>
    </section>
  );
}