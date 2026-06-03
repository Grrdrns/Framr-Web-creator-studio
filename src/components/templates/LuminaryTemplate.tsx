import React from "react";
import { 
  MapPin, Mail, Phone, Instagram, Youtube, Facebook, 
  ArrowRight, ArrowDown, Check, Star 
} from "lucide-react";
import { TemplateProps } from "../../types";

export default function LuminaryTemplate({ config, isPreview = false }: TemplateProps) {
  const { identity, portfolio, services, customPalette, presetPaletteId, paletteType, sections, testimonials } = config;

  // Render social links
  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    tiktok: () => <span className="font-bold text-sm tracking-tighter">TikTok</span>,
  };

  return (
    <div className="relative font-serif transition-colors duration-500">
      {/* Dynamic Nav Bar */}
      <nav 
        className="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b"
        style={{ 
          backgroundColor: "var(--theme-bg)", 
          borderColor: "var(--theme-border)",
          opacity: 0.95
        }}
      >
        <span 
          className="text-2xl font-light tracking-widest font-serif"
          style={{ color: "var(--theme-text)" }}
        >
          {identity.studioName}
        </span>
        <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase font-sans">
          {sections.about && (
            <a href="#about" className="hover:opacity-70 transition-opacity" style={{ color: "var(--theme-text)" }}>
              Journal
            </a>
          )}
          {sections.portfolio && (
            <a href="#portfolio" className="hover:opacity-70 transition-opacity" style={{ color: "var(--theme-text)" }}>
              Gallery
            </a>
          )}
          {sections.services && (
            <a href="#services" className="hover:opacity-70 transition-opacity" style={{ color: "var(--theme-text)" }}>
              Services
            </a>
          )}
          {sections.contact && (
            <a href="#contact" className="hover:opacity-70 transition-opacity" style={{ color: "var(--theme-text)" }}>
              Inquire
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {sections.hero && (
        <section 
          className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center select-none"
          style={{ backgroundColor: "var(--theme-bg)" }}
        >
          {/* Main Hero Background or Large Showcase Frame */}
          {portfolio[0] && (
            <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
              <img 
                src={portfolio[0].url} 
                className="w-full h-full object-cover filter grayscale scale-105 pointer-events-none" 
                alt="Studio backdrop"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col justify-center h-full items-center pt-20">
            <p 
              className="font-sans text-xs uppercase tracking-[0.25em] mb-4 font-semibold"
              style={{ color: "var(--theme-accent)" }}
            >
              {identity.profession === "both" ? "Photographer & Videographer" : identity.profession}
            </p>
            <h1 
              className="text-5xl md:text-8xl font-light tracking-tight mb-8 font-serif leading-tight max-w-3xl"
              style={{ color: "var(--theme-text)" }}
            >
              {identity.studioName}
            </h1>
            <p 
              className="text-xl md:text-2xl font-light italic opacity-90 max-w-2xl leading-relaxed mb-12 font-serif"
              style={{ color: "var(--theme-text)" }}
            >
              “{identity.tagline}”
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#portfolio" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-[color:var(--theme-accent)] text-white hover:opacity-90 transition-all font-sans text-xs uppercase tracking-widest font-bold"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                View Portfolio <ArrowRight size={14} />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border border-[color:var(--theme-text)] hover:bg-[color:var(--theme-text)] hover:text-[color:var(--theme-bg)] transition-all font-sans text-xs uppercase tracking-widest"
                style={{ borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
              >
                Book Session
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
            <span className="text-[10px] tracking-widest uppercase font-sans mb-1" style={{ color: "var(--theme-text)" }}>
              Explore
            </span>
            <ArrowDown size={14} style={{ color: "var(--theme-text)" }} />
          </div>
        </section>
      )}

      {/* About/Bio Section */}
      {sections.about && (
        <section 
          id="about" 
          className="py-24 md:py-36 px-6 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--theme-accent)" }}>
              THE ARTIST
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-12" style={{ color: "var(--theme-text)" }}>
              Honest Stories Told Authentically
            </h2>
            <div className="grid md:grid-cols-12 gap-12 items-center text-left">
              <div className="md:col-span-4 aspect-[3/4] overflow-hidden rounded shadow-sm border" style={{ borderColor: "var(--theme-border)" }}>
                <img 
                  src={portfolio[1]?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"}
                  alt={identity.studioName}
                  className="w-full h-full object-cover filter grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-8 flex flex-col justify-center">
                <p 
                  className="text-lg md:text-xl font-light leading-relaxed mb-6 font-serif opacity-90 italic"
                  style={{ color: "var(--theme-text)" }}
                >
                  {identity.bio}
                </p>
                <div className="space-y-3 font-sans text-xs uppercase tracking-widest pt-4 border-t" style={{ borderColor: "var(--theme-border)" }}>
                  <div className="flex items-center gap-3" style={{ color: "var(--theme-text)" }}>
                    <MapPin size={14} style={{ color: "var(--theme-accent)" }} />
                    <span>{identity.location}</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: "var(--theme-text)" }}>
                    <Mail size={14} style={{ color: "var(--theme-accent)" }} />
                    <span>{identity.email}</span>
                  </div>
                  {identity.phone && (
                    <div className="flex items-center gap-3" style={{ color: "var(--theme-text)" }}>
                      <Phone size={14} style={{ color: "var(--theme-accent)" }} />
                      <span>{identity.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Gallery (Asymmetric) */}
      {sections.portfolio && (
        <section 
          id="portfolio" 
          className="py-24 px-6 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--theme-accent)" }}>
                VISUAL JOURNAL
              </p>
              <h2 className="text-3xl md:text-5xl font-light" style={{ color: "var(--theme-text)" }}>
                Selected Work
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8">
              {portfolio.map((item, index) => {
                // Alternating sizes for asymmetric gallery feel
                const isWide = index % 3 === 0;
                const colSpan = isWide ? "lg:col-span-8" : "lg:col-span-4";
                const rowSpan = index % 2 === 1 ? "lg:h-[450px]" : "lg:h-[380px]";

                return (
                  <div 
                    key={item.id}
                    className={`group relative overflow-hidden flex flex-col justify-end transition-all duration-500 rounded border ${colSpan} ${rowSpan} h-96`}
                    style={{ borderColor: "var(--theme-border)", backgroundColor: "var(--theme-card)" }}
                  >
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                    
                    <div className="relative z-10 p-6 text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-sans text-[10px] tracking-widest uppercase bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded inline-block mb-3">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-light mb-1 tracking-wider">{item.title}</h3>
                      <p className="text-xs font-sans text-white/70 italic line-clamp-2 max-w-md font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {sections.services && (
        <section 
          id="services" 
          className="py-24 px-6 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--theme-accent)" }}>
                OFFERINGS
              </p>
              <h2 className="text-3xl md:text-5xl font-light" style={{ color: "var(--theme-text)" }}>
                Creative Services & Design
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="p-8 border rounded flex flex-col justify-between transition-all"
                  style={{ 
                    backgroundColor: "var(--theme-card)", 
                    borderColor: "var(--theme-border)" 
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-light font-serif" style={{ color: "var(--theme-text)" }}>
                        {service.name}
                      </h3>
                      {service.price && !service.requestQuote ? (
                        <span className="font-sans font-semibold text-lg" style={{ color: "var(--theme-accent)" }}>
                          ${service.price}
                        </span>
                      ) : (
                        <span className="font-sans text-xs tracking-widest uppercase py-1 px-2 border" style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}>
                          Quote
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm font-sans mb-6 italic leading-relaxed opacity-80" style={{ color: "var(--theme-text)" }}>
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-8 text-xs font-sans uppercase tracking-wider">
                      {service.deliverables.map((item, id) => (
                        <li key={id} className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                          <Check size={12} style={{ color: "var(--theme-accent)" }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--theme-border)" }}>
                    <span className="text-xs uppercase font-sans tracking-widest opacity-60" style={{ color: "var(--theme-text)" }}>
                      Due: {service.turnaround}
                    </span>
                    <a 
                      href="#contact" 
                      className="text-xs uppercase font-sans tracking-widest font-semibold hover:opacity-75 flex items-center gap-1.5"
                      style={{ color: "var(--theme-accent)" }}
                    >
                      Inquire <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {sections.testimonials && testimonials.length > 0 && (
        <section 
          className="py-24 px-6 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--theme-accent)" }}>
              PRAISE
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-16" style={{ color: "var(--theme-text)" }}>
              Kind Words From Clients
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              {testimonials.map((test) => (
                <div 
                  key={test.id} 
                  className="p-8 border rounded flex flex-col justify-between"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" style={{ color: "var(--theme-accent)" }} className="stroke-none" />
                      ))}
                    </div>
                    <blockquote className="text-base italic font-serif leading-relaxed opacity-95 mb-6" style={{ color: "var(--theme-text)" }}>
                      “{test.quote}”
                    </blockquote>
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-semibold font-sans tracking-wide" style={{ color: "var(--theme-text)" }}>
                      {test.clientName}
                    </cite>
                    <p className="text-xs uppercase font-sans tracking-widest opacity-60 mt-0.5" style={{ color: "var(--theme-text)" }}>
                      {test.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {sections.contact && (
        <section 
          id="contact" 
          className="py-24 px-6 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--theme-accent)" }}>
                INQUIRE
              </p>
              <h2 className="text-3xl md:text-5xl font-light" style={{ color: "var(--theme-text)" }}>
                Let's Frame Your Story
              </h2>
              <p className="text-sm font-sans mt-4 italic opacity-75" style={{ color: "var(--theme-text)" }}>
                Accepting bookings worldwide. Complete the fields below to start.
              </p>
            </div>

            <form 
              className="space-y-6" 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! This is a demo template action.");
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest mb-2 font-bold" style={{ color: "var(--theme-text)" }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. Olivia Wilde"
                    className="w-full p-3 font-sans text-sm border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest mb-2 font-bold" style={{ color: "var(--theme-text)" }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="E.g. olivia@domain.com"
                    className="w-full p-3 font-sans text-sm border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest mb-2 font-bold" style={{ color: "var(--theme-text)" }}>
                    Date of Event / Session
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 font-sans text-sm border focus:outline-none focus:ring-1"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest mb-2 font-bold" style={{ color: "var(--theme-text)" }}>
                    Location Required
                  </label>
                  <input 
                    type="text" 
                    placeholder="City, State or Country"
                    className="w-full p-3 font-sans text-sm border focus:outline-none focus:ring-1"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-sans tracking-widest mb-2 font-bold" style={{ color: "var(--theme-text)" }}>
                  Your Vision / Details
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your session, concept, or event vibe..."
                  className="w-full p-3 font-sans text-sm border focus:outline-none focus:ring-1"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[color:var(--theme-accent)] text-white font-sans text-xs uppercase font-bold tracking-widest hover:opacity-90 transition-all rounded"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      {sections.footer && (
        <footer 
          className="py-16 px-6 border-t text-center"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <span className="text-xl tracking-widest" style={{ color: "var(--theme-text)" }}>
              {identity.studioName}
            </span>
            
            {/* Social Icons row */}
            <div className="flex gap-6 mt-2">
              {Object.entries(identity.socials).map(([platform, url]) => {
                if (!url) return null;
                const IconComp = socialIcons[platform as keyof typeof socialIcons] || Instagram;
                return (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:scale-105 transition-transform" 
                    style={{ color: "var(--theme-accent)" }}
                  >
                    <IconComp size={20} />
                  </a>
                );
              })}
            </div>

            <p className="text-xs font-sans tracking-widest mt-6 opacity-50" style={{ color: "var(--theme-text)" }}>
              &copy; {new Date().getFullYear()} {identity.studioName}. Made with Framr.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
