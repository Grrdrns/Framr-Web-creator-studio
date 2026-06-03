import React from "react";
import { 
  Instagram, Facebook, Youtube, MapPin, Mail, Phone, 
  ArrowRight, Check, Heart, Star, Sparkles 
} from "lucide-react";
import { TemplateProps } from "../../types";

export default function ArcadiaTemplate({ config, isPreview = false }: TemplateProps) {
  const { identity, portfolio, services, customPalette, presetPaletteId, paletteType, sections, testimonials } = config;

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    tiktok: () => <span className="font-sans font-bold text-xs uppercase tracking-tight">TK</span>,
  };

  return (
    <div className="relative font-sans text-stone-800 transition-colors duration-500">
      {/* Friendly Modern Nav */}
      <nav 
        className="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b"
        style={{ 
          backgroundColor: "var(--theme-bg)", 
          borderColor: "var(--theme-border)",
          opacity: 0.98
        }}
      >
        <div className="flex items-center gap-2">
          <Heart size={16} style={{ color: "var(--theme-accent)" }} fill="currentColor" />
          <span 
            className="text-xl font-bold tracking-tight font-sans"
            style={{ color: "var(--theme-text)" }}
          >
            {identity.studioName.toLowerCase()}
          </span>
        </div>
        <div className="hidden md:flex space-x-6 text-xs uppercase tracking-wider font-semibold">
          {sections.about && (
            <a href="#about" className="hover:opacity-75 transition-all" style={{ color: "var(--theme-text)" }}>
              The Story
            </a>
          )}
          {sections.portfolio && (
            <a href="#portfolio" className="hover:opacity-75 transition-all" style={{ color: "var(--theme-text)" }}>
              Moments
            </a>
          )}
          {sections.services && (
            <a href="#services" className="hover:opacity-75 transition-all" style={{ color: "var(--theme-text)" }}>
              Pricing
            </a>
          )}
          {sections.contact && (
            <a 
              href="#contact" 
              className="px-4 py-1.5 rounded-full border text-xs" 
              style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}
            >
              Get in Touch
            </a>
          )}
        </div>
      </nav>

      {/* Split-Screen Hero Section */}
      {sections.hero && (
        <section 
          className="relative min-h-[90vh] grid md:grid-cols-2 items-stretch"
          style={{ backgroundColor: "var(--theme-bg)" }}
        >
          {/* Left Text Screen */}
          <div className="flex flex-col justify-center p-8 md:p-16">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-4" style={{ color: "var(--theme-accent)" }}>
              <Sparkles size={14} /> PORTFOLIO WEB
            </span>
            <h1 
              className="text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-none"
              style={{ color: "var(--theme-text)" }}
            >
              {identity.studioName}
            </h1>
            <p 
              className="text-lg md:text-xl font-serif leading-relaxed opacity-90 max-w-lg mb-8"
              style={{ color: "var(--theme-text)" }}
            >
              {identity.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full text-white text-center font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-sm"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Book Your Story
              </a>
              <a 
                href="#portfolio" 
                className="px-6 py-3 border rounded-full text-center font-semibold text-xs tracking-wider uppercase hover:opacity-75 transition-all"
                style={{ borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
              >
                Browse Portfolio
              </a>
            </div>
          </div>

          {/* Right Preview Image Screen */}
          <div className="hidden md:block relative min-h-[450px]">
            {portfolio[0] ? (
              <img 
                src={portfolio[0].url} 
                alt="Studio feature image" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-95 brightness-95 rounded-bl-[100px]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-200" />
            )}
            {/* Soft geometric accent circle overlay */}
            <div className="absolute bottom-12 left-12 p-6 rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 max-w-xs shadow-lg">
              <span className="font-sans text-[10px] tracking-wider uppercase opacity-60">OFFICE LOCATION</span>
              <p className="text-sm font-bold text-stone-900 mt-1">{identity.location}</p>
            </div>
          </div>
        </section>
      )}

      {/* About/Bio Story */}
      {sections.about && (
        <section 
          id="about" 
          className="py-20 px-6 md:px-12 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              {/* Double graphic frame for warmth */}
              <div className="md:col-span-5 grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: 'var(--theme-border)' }}>
                  <img 
                    src={portfolio[1]?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=500&q=80"}
                    alt="Creative Portrait 1"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-8 shadow-sm border" style={{ borderColor: 'var(--theme-border)' }}>
                  <img 
                    src={portfolio[2]?.url || "https://images.unsplash.com/photo-1505236858219-8359eb29e3a9?auto=format&fit=crop&w=500&q=80"}
                    alt="Creative Portrait 2"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Story presentation right */}
              <div className="md:col-span-7">
                <span className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--theme-accent)" }}>
                  HELLO FRIEND
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-6" style={{ color: "var(--theme-text)" }}>
                  Let's make some memories together.
                </h2>
                <p 
                  className="text-base font-serif leading-relaxed opacity-90 mb-8 text-stone-700"
                  style={{ color: "var(--theme-text)" }}
                >
                  {identity.bio}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 font-sans text-xs border-t pt-8" style={{ borderColor: "var(--theme-border)" }}>
                  <div>
                    <span className="font-bold block tracking-wider uppercase opacity-60 mb-2">Location</span>
                    <p className="flex items-center gap-1.5" style={{ color: "var(--theme-text)" }}>
                      <MapPin size={14} style={{ color: "var(--theme-accent)" }} /> {identity.location}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold block tracking-wider uppercase opacity-60 mb-2">Contact Details</span>
                    <p className="flex items-center gap-1.5" style={{ color: "var(--theme-text)" }}>
                      <Mail size={14} style={{ color: "var(--theme-accent)" }} /> {identity.email}
                    </p>
                    {identity.phone && (
                      <p className="flex items-center gap-1.5 mt-1.5" style={{ color: "var(--theme-text)" }}>
                        <Phone size={14} style={{ color: "var(--theme-accent)" }} /> {identity.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid Portfolio Section */}
      {sections.portfolio && (
        <section 
          id="portfolio" 
          className="py-20 px-6 md:px-12 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--theme-accent)" }}>
                  THE EYE'S DIARY
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--theme-text)" }}>
                  Simple Moments, Well Framed
                </h2>
              </div>
              <p className="text-sm font-sans max-w-xs opacity-75 mt-4 md:mt-0" style={{ color: "var(--theme-text)" }}>
                A structured gallery collection documenting pure aesthetic warmth and family events.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative overflow-hidden flex flex-col rounded-3xl border border-stone-200 shadow-sm"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <span 
                      className="absolute top-4 left-4 text-[10px] font-sans uppercase font-bold tracking-widest text-[#1c140e] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm"
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--theme-text)" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs font-serif italic mt-1 leading-relaxed opacity-75" style={{ color: "var(--theme-text)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      {sections.services && (
        <section 
          id="services" 
          className="py-20 px-6 md:px-12 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--theme-accent)" }}>
                INVESTMENT & PRICING
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-1" style={{ color: "var(--theme-text)" }}>
                Service Sessions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="p-8 border rounded-3xl shadow-sm flex flex-col justify-between group transition-all"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6 border-b pb-4" style={{ borderColor: 'var(--theme-border)' }}>
                      <h3 className="text-xl font-bold font-sans" style={{ color: "var(--theme-text)" }}>
                        {service.name}
                      </h3>
                      {service.price && !service.requestQuote ? (
                        <div className="text-right">
                          <span className="text-xs block text-stone-400 font-sans tracking-wide">Starting from</span>
                          <span className="font-sans font-black text-2xl text-stone-900" style={{ color: "var(--theme-text)" }}>
                            ${service.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-sans text-[10px] tracking-widest uppercase font-bold bg-stone-950 text-white py-1 px-2.5 rounded-full">
                          Quote Req
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-sans mb-6 leading-relaxed text-stone-600" style={{ color: "var(--theme-text)" }}>
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400 block">DELIVERABLES</span>
                      {service.deliverables.map((item, id) => (
                        <div key={id} className="flex items-center gap-2 text-xs" style={{ color: "var(--theme-text)" }}>
                          <Check size={14} className="text-emerald-500 font-bold shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--theme-border)" }}>
                    <span className="text-xs uppercase font-sans tracking-tight text-stone-400" style={{ color: "var(--theme-text)" }}>
                      Estimated Turnaround: {service.turnaround}
                    </span>
                    <a 
                      href="#contact" 
                      className="text-xs uppercase font-sans tracking-widest font-bold hover:opacity-75 flex items-center gap-1"
                      style={{ color: "var(--theme-accent)" }}
                    >
                      Hold Space <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {sections.testimonials && testimonials.length > 0 && (
        <section 
          className="py-20 px-6 md:px-12 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--theme-accent)" }}>
                TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1" style={{ color: "var(--theme-text)" }}>
                Highly Appreciated By Folks
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((test) => (
                <div 
                  key={test.id} 
                  className="p-8 border rounded-3xl shadow-sm flex flex-col justify-between"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" style={{ color: "var(--theme-accent)" }} className="stroke-none shrink-0" />
                      ))}
                    </div>
                    <blockquote className="text-sm italic font-serif leading-relaxed opacity-95 text-stone-700 mb-6" style={{ color: "var(--theme-text)" }}>
                      “{test.quote}”
                    </blockquote>
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-bold font-sans tracking-tight" style={{ color: "var(--theme-text)" }}>
                      {test.clientName}
                    </cite>
                    <p className="text-[10px] uppercase font-sans tracking-widest opacity-60 mt-0.5" style={{ color: "var(--theme-text)" }}>
                      {test.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Friendly Contact */}
      {sections.contact && (
        <section 
          id="contact" 
          className="py-20 px-6 md:px-12 border-t"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--theme-accent)" }}>
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-1" style={{ color: "var(--theme-text)" }}>
                Let's plan your session together.
              </h2>
              <p className="text-sm font-sans mt-4 italic opacity-75" style={{ color: "var(--theme-text)" }}>
                Simply fill in standard details and we'll reply inside 24 hours.
              </p>
            </div>

            <form 
              className="space-y-6 font-sans text-xs" 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Story message recorded successfully!");
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--theme-text)" }}>
                    What's your name?
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Olivia Wilde"
                    className="w-full p-4.5 bg-[color:var(--theme-card)] font-sans text-xs border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded-2xl"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--theme-text)" }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="olivia@domain.com"
                    className="w-full p-4.5 bg-[color:var(--theme-card)] font-sans text-xs border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded-2xl"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--theme-text)" }}>
                    Date of Session / Event
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-4.5 bg-[color:var(--theme-card)] border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded-2xl"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--theme-text)" }}>
                    Location Needed
                  </label>
                  <input 
                    type="text" 
                    placeholder="Portland, OR or Abroad"
                    className="w-full p-4.5 bg-[color:var(--theme-card)] border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded-2xl"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--theme-text)" }}>
                  What milestones are we chasing?
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your session goals, mood preferences, or timeline needs..."
                  className="w-full p-4.5 bg-[color:var(--theme-card)] border focus:outline-none focus:ring-1 focus:ring-[color:var(--theme-accent)] rounded-2xl font-sans"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 text-white font-sans text-xs uppercase tracking-widest font-black hover:opacity-90 transition-all rounded-full shadow-md"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Send Request Details
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Arcadia Footer */}
      {sections.footer && (
        <footer 
          className="py-16 px-6 border-t text-center font-sans text-xs tracking-wide text-zinc-500"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <span className="text-xl font-black" style={{ color: "var(--theme-text)" }}>
              {identity.studioName.toLowerCase()}
            </span>

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
                    <IconComp size={18} />
                  </a>
                );
              })}
            </div>

            <p className="text-[10px] opacity-60 mt-4 leading-relaxed" style={{ color: "var(--theme-text)" }}>
              &copy; {new Date().getFullYear()} {identity.studioName}. Crafted with Arcadia template from FRAMR.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
