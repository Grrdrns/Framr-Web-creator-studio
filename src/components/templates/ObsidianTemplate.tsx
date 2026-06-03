import React from "react";
import { 
  Instagram, Facebook, Youtube, MapPin, Mail, Phone, 
  ArrowUpRight, ArrowRight, Play, Eye, Check, Star 
} from "lucide-react";
import { TemplateProps } from "../../types";

export default function ObsidianTemplate({ config, isPreview = false }: TemplateProps) {
  const { identity, portfolio, services, customPalette, presetPaletteId, paletteType, sections, testimonials } = config;

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    tiktok: () => <span className="font-extrabold text-sm opacity-90">TK</span>,
  };

  return (
    <div className="relative font-sans text-stone-200 min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Absolute top spacer with accent underline */}
      <div className="h-1.5 w-full bg-[color:var(--theme-accent)]" style={{ backgroundColor: "var(--theme-accent)" }} />

      {/* Luxury Nav */}
      <nav 
        className="sticky top-0 z-40 px-8 py-5 flex justify-between items-center border-b backdrop-blur-xl"
        style={{ 
          backgroundColor: "rgba(13,13,14,0.85)", 
          borderColor: "rgba(255,255,255,0.08)" 
        }}
      >
        <span 
          className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] font-sans text-white hover:opacity-80 transition-opacity"
        >
          {identity.studioName}
        </span>
        
        <div className="hidden md:flex gap-8 text-[11px] font-mono tracking-[0.25em] uppercase text-stone-300">
          {sections.about && <a href="#about" className="hover:text-white transition-colors">/ RETRO</a>}
          {sections.portfolio && <a href="#portfolio" className="hover:text-white transition-colors">/ STILLS</a>}
          {sections.services && <a href="#services" className="hover:text-white transition-colors">/ RETREATS</a>}
          {sections.contact && <a href="#contact" className="hover:text-amber-400 transition-colors">/ DISPATCH</a>}
        </div>
      </nav>

      {/* Hero Section */}
      {sections.hero && (
        <section 
          className="relative min-h-screen flex flex-col justify-end p-8 md:p-16 select-none"
          style={{ backgroundColor: "var(--theme-bg)" }}
        >
          {/* Cinema Background */}
          {portfolio[0] && (
            <div className="absolute inset-0">
              <img 
                src={portfolio[0].url} 
                alt="Cinema backdrop" 
                className="w-full h-full object-cover filter brightness-[0.35] contrast-125"
                referrerPolicy="no-referrer"
              />
              {/* Radial shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--theme-bg)] via-black/40 to-transparent" style={{ backgroundImage: `linear-gradient(to top, var(--theme-bg) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)` }} />
            </div>
          )}

          <div className="relative z-10 max-w-5xl">
            <span 
              className="text-xs font-mono tracking-[0.35em] uppercase px-3 py-1 bg-stone-900 border text-white rounded inline-block mb-4"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              ⚜️ CINEMATIC HOUSE
            </span>
            <h1 
              className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-6"
            >
              {identity.studioName}
            </h1>
            <p 
              className="text-lg md:text-2xl font-serif text-stone-300 max-w-2xl italic leading-relaxed mb-8 pr-12"
            >
              “{identity.tagline}”
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#portfolio"
                className="px-8 py-3.5 bg-[color:var(--theme-accent)] text-black rounded text-xs font-black tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                ENTER GALLERY <Play size={12} fill="currentColor" className="stroke-none" />
              </a>
              <a 
                href="#contact"
                className="px-8 py-3.5 border border-white/20 hover:border-white transition-colors text-white rounded text-xs tracking-[0.2em] font-bold uppercase"
              >
                REQUEST DIRECTORS CUT
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {sections.about && (
        <section 
          id="about" 
          className="py-24 px-8 border-b"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video md:aspect-[4/5] rounded overflow-hidden shadow-2xl group border border-white/10">
              <img 
                src={portfolio[1]?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"}
                alt="Cinematographer"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 font-mono text-xs">
                <span className="text-stone-400">CREATIVE DIRECTOR</span>
                <p className="text-white font-bold tracking-widest mt-1 text-sm">{identity.studioName} STUDIO</p>
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style={{ color: "var(--theme-accent)" }}>
                // REEL / BACKSTAGE
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
                ANALOG LIGHTING, DIGITAL GRIT.
              </h2>
              <p className="text-lg font-serif italic text-stone-300 leading-relaxed pr-6" style={{ color: "var(--theme-text)" }}>
                {identity.bio}
              </p>

              <div className="space-y-3.5 border-t border-white/10 pt-8 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <MapPin size={14} style={{ color: "var(--theme-accent)" }} />
                  <span>📍 {identity.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} style={{ color: "var(--theme-accent)" }} />
                  <span>✉️ {identity.email}</span>
                </div>
                {identity.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={14} style={{ color: "var(--theme-accent)" }} />
                    <span>📞 {identity.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio/Stills Section */}
      {sections.portfolio && (
        <section 
          id="portfolio" 
          className="py-24 px-8 border-b"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style={{ color: "var(--theme-accent)" }}>
                  // EXHIBITIONS
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-2">
                  CINEMATIC DIARY
                </h2>
              </div>
              <p className="text-xs font-mono text-stone-400 mt-4 md:mt-0 tracking-wider">
                MAX DATA: 12 RAW DEVELOPMENTS REGISTERED
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div 
                  key={item.id}
                  className="group relative h-[350px] md:h-[400px] rounded overflow-hidden flex flex-col justify-end p-6 border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  style={{ 
                    borderColor: "rgba(255,255,255,0.06)", 
                    backgroundColor: "rgba(20,20,22,1)" 
                  }}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                  {/* Border indicator on hover */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-[color:var(--theme-accent)] transition-colors duration-500 rounded pointer-events-none" style={{ borderColor: 'transparent' }} />

                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <span 
                      className="text-[9px] font-mono font-bold tracking-widest uppercase py-0.5 px-2 bg-stone-900 border text-white rounded w-fit mb-2.5"
                      style={{ borderColor: "rgba(255,255,255,0.15)" }}
                    >
                      {item.category}
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-white uppercase flex items-center gap-1.5 group-hover:text-[color:var(--theme-accent)] transition-colors">
                      {item.title} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs font-serif italic text-stone-400 mt-1 line-clamp-2 max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services/Creative Commissions */}
      {sections.services && (
        <section 
          id="services" 
          className="py-24 px-8 border-b"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style={{ color: "var(--theme-accent)" }}>
                // DEPLOYMENT / PACKAGES
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-2">
                STUDIO PRODUCTION CONTRACTS
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="p-8 rounded border flex flex-col justify-between group transition-all duration-300"
                  style={{ 
                    backgroundColor: "rgba(20,20,22,1)", 
                    borderColor: "rgba(255,255,255,0.06)" 
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-[color:var(--theme-accent)] transition-colors">
                        {service.name}
                      </h3>
                      {service.price && !service.requestQuote ? (
                        <span className="font-mono font-black text-xl text-amber-400">
                          ${service.price}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                          QUOTE
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-serif italic text-stone-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-4 border-t border-white/5 pt-6 mb-8">
                      <span className="text-[10px] font-mono text-stone-500 tracking-widest block uppercase">DEPARTURE CHECKLIST:</span>
                      <ul className="space-y-2.5 font-mono text-xs">
                        {service.deliverables.map((item, id) => (
                          <li key={id} className="flex items-center gap-2 text-stone-400">
                            <Check size={12} style={{ color: "var(--theme-accent)" }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-stone-500">CYCLE: {service.turnaround}</span>
                    <a 
                      href="#contact" 
                      className="text-white hover:text-[color:var(--theme-accent)] font-semibold transition-colors flex items-center gap-1.5 uppercase"
                    >
                      REQUEST PLAN <ArrowRight size={12} style={{ color: "var(--theme-accent)" }} />
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
          className="py-24 px-8 border-b"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style={{ color: "var(--theme-accent)" }}>
                // REVIEWS & TELEGRAMS
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white mt-1">
                MEMBERS PERSPECTIVE
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((test) => (
                <div 
                  key={test.id} 
                  className="p-8 rounded border flex flex-col justify-between"
                  style={{ backgroundColor: "rgba(18,18,19,1)", borderColor: "rgba(255,255,255,0.04)" }}
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" style={{ color: "var(--theme-accent)" }} className="stroke-none" />
                      ))}
                    </div>
                    <p className="text-sm font-serif italic text-stone-300 leading-relaxed mb-6">
                      “{test.quote}”
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <span className="font-sans font-bold text-xs uppercase tracking-wide text-white">{test.clientName}</span>
                    <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-0.5">{test.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      {sections.contact && (
        <section 
          id="contact" 
          className="py-24 px-8 border-b"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style={{ color: "var(--theme-accent)" }}>
                // BOOKINGS / COMMISSIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-2">
                SUBMIT PROJECT BRIEF
              </h2>
              <p className="text-xs font-mono text-stone-400 mt-3 uppercase tracking-wider">
                Current availability: Autumn Commission Calendar
              </p>
            </div>

            <form 
              className="space-y-6 font-mono text-xs text-white" 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Brief Transmitted!");
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                    01. CLIENT IDENTITY
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Olivia Wilde"
                    className="w-full p-3 bg-stone-900 border focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                    02. SECURE EMAIL ADDRESS
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="olivia@domain.com"
                    className="w-full p-3 bg-stone-900 border focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                    03. EXPEDITION DATE
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 bg-stone-900 border focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                    04. TARGET GEOGRAPHY
                  </label>
                  <input 
                    type="text" 
                    placeholder="Iceland / Scotland"
                    className="w-full p-3 bg-stone-900 border focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">
                  05. PROJECT BRIEF DESCRIPTION
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your design intentions, production scale, or editorial storyboard focus..."
                  className="w-full p-3 bg-stone-900 border focus:outline-none focus:ring-1 focus:ring-amber-500 rounded font-mono"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[color:var(--theme-accent)] text-black uppercase font-black tracking-widest text-xs hover:opacity-90 active:scale-[0.99] transition-transform rounded"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                TRANSMIT SIGNALS (SUBMIT RESEARCH)
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      {sections.footer && (
        <footer 
          className="py-16 px-8 border-t text-center font-mono text-xs text-stone-500"
          style={{ backgroundColor: "rgba(10,10,11,1)", borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <span className="text-xl font-bold uppercase tracking-[0.25em] text-white">
              {identity.studioName}
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
                    className="hover:text-white transition-colors" 
                    style={{ color: "var(--theme-accent)" }}
                  >
                    <IconComp size={18} />
                  </a>
                );
              })}
            </div>

            <p className="text-[10px] opacity-60 mt-4 leading-relaxed">
              &copy; {new Date().getFullYear()} {identity.studioName} CORP. RENDERED VIA FRAMR LANDING.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
