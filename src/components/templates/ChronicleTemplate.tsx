import React from "react";
import { 
  Instagram, Facebook, Youtube, MapPin, Mail, Phone, 
  ArrowRight, ArrowUpRight, Check, Quote, Star 
} from "lucide-react";
import { TemplateProps } from "../../types";

export default function ChronicleTemplate({ config, isPreview = false }: TemplateProps) {
  const { identity, portfolio, services, customPalette, presetPaletteId, paletteType, sections, testimonials } = config;

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    tiktok: () => <span className="font-bold text-sm tracking-tighter">TK</span>,
  };

  return (
    <div className="relative font-sans antialiased text-base transition-colors duration-500">
      {/* Editorial Title Banner */}
      <header 
        className="border-b-4 py-8 px-6 md:px-12 flex flex-col items-center text-center justify-center"
        style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-text)" }}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: "var(--theme-accent)" }}>
          ISSUE VOL. {new Date().getFullYear()} / OREF
        </span>
        <h1 
          className="text-4xl md:text-8xl font-black tracking-tighter uppercase font-sans mb-3 select-none"
          style={{ color: "var(--theme-text)" }}
        >
          {identity.studioName}
        </h1>
        <p className="font-serif text-sm italic max-w-xl opacity-80" style={{ color: "var(--theme-text)" }}>
          {identity.tagline}
        </p>
      </header>

      {/* Mini Bar */}
      <nav 
        className="sticky top-0 z-40 border-b-2 py-3 px-6 md:px-12 flex justify-between items-center text-xs tracking-widest uppercase font-mono backdrop-blur-md"
        style={{ 
          backgroundColor: "var(--theme-bg)", 
          borderColor: "var(--theme-border)",
          opacity: 0.96 
        }}
      >
        <div className="flex gap-4">
          <span style={{ color: "var(--theme-text)" }}>📍 {identity.location}</span>
        </div>
        <div className="hidden md:flex gap-8">
          {sections.about && <a href="#about" className="hover:underline" style={{ color: "var(--theme-text)" }}>ABOUT</a>}
          {sections.portfolio && <a href="#portfolio" className="hover:underline" style={{ color: "var(--theme-text)" }}>FOLIO</a>}
          {sections.services && <a href="#services" className="hover:underline" style={{ color: "var(--theme-text)" }}>TARIFFS</a>}
          {sections.contact && <a href="#contact" className="hover:underline" style={{ color: "var(--theme-text)" }}>LETTERS</a>}
        </div>
      </nav>

      {/* Hero Section */}
      {sections.hero && (
        <section 
          className="p-6 md:p-12 grid md:grid-cols-12 gap-8 items-stretch border-b-2"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          {/* Main big cover article */}
          <div className="md:col-span-8 flex flex-col justify-between p-6 md:p-12 border rounded" style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 text-white bg-[color:var(--theme-accent)] rounded" style={{ backgroundColor: "var(--theme-accent)" }}>
                FEATURE STORY
              </span>
              <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight uppercase mt-6 mb-6 leading-none" style={{ color: "var(--theme-text)" }}>
                Capturing the Grain of Pure Sunlight
              </h2>
              <p className="text-lg font-serif opacity-90 leading-relaxed max-w-xl" style={{ color: "var(--theme-text)" }}>
                Every photo session or film frame is treated as a historic document. No over-processed glow, no artificial postures — just pure human honesty.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <a 
                href="#portfolio"
                className="px-6 py-3 text-white uppercase text-xs font-bold tracking-widest hover:opacity-90 transition-all rounded"
                style={{ backgroundColor: "var(--theme-text)", color: "var(--theme-bg)" }}
              >
                OPEN INDEX
              </a>
              <a 
                href="#contact"
                className="px-6 py-3 border font-mono uppercase text-xs tracking-widest hover:bg-[color:var(--theme-text)] hover:text-white transition-all rounded"
                style={{ borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
              >
                BOOK COVER STORY
              </a>
            </div>
          </div>

          {/* Side preview card */}
          <div className="md:col-span-4 aspect-square md:aspect-auto min-h-64 relative rounded overflow-hidden group border" style={{ borderColor: "var(--theme-border)" }}>
            {portfolio[0] ? (
              <img 
                src={portfolio[0].url} 
                alt="Editorial cover"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-300" />
            )}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <span className="font-mono text-[9px] uppercase tracking-wider backdrop-blur bg-white/20 px-2 py-0.5 rounded">COVER ART</span>
              <h3 className="text-xl font-bold uppercase mt-2">{portfolio[0]?.title || "Elysian Bloom"}</h3>
              <p className="text-xs font-serif italic text-white/80">{portfolio[0]?.category || "Wedding"}</p>
            </div>
          </div>
        </section>
      )}

      {/* Editor Bio / Editorial Columns */}
      {sections.about && (
        <section 
          id="about" 
          className="py-20 px-6 md:px-12 border-b-2"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 font-serif">
            <div className="md:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--theme-accent)" }}>
                THE COLUMNIST /
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase font-sans mt-2 mb-6 tracking-tighter" style={{ color: "var(--theme-text)" }}>
                BIOGRAPHY
              </h3>
              <div className="aspect-[3/4] border-2 rounded overflow-hidden p-2" style={{ borderColor: "var(--theme-text)", backgroundColor: "var(--theme-card)" }}>
                <img 
                  src={portfolio[1]?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"}
                  alt="Artist portrait"
                  className="w-full h-full object-cover filter contrast-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col justify-between">
              <div className="border-b pb-8" style={{ borderColor: "var(--theme-border)" }}>
                <p className="text-6xl text-left float-left font-sans font-black mr-4 leading-none mt-1" style={{ color: "var(--theme-accent)" }}>
                  W
                </p>
                <p className="text-xl leading-relaxed italic opacity-95 text-justify" style={{ color: "var(--theme-text)" }}>
                  {identity.bio}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 font-sans text-xs">
                <div className="space-y-4">
                  <h4 className="font-mono font-bold uppercase tracking-wider text-[11px]" style={{ color: "var(--theme-accent)" }}>
                    COMMUNICATIONS
                  </h4>
                  <p className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                    <Mail size={14} /> {identity.email}
                  </p>
                  {identity.phone && (
                    <p className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                      <Phone size={14} /> {identity.phone}
                    </p>
                  )}
                  <p className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                    <MapPin size={14} /> {identity.location}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono font-bold uppercase tracking-wider text-[11px]" style={{ color: "var(--theme-accent)" }}>
                    CURRENT PRESS ASSIGNMENT
                  </h4>
                  <p className="italic font-serif" style={{ color: "var(--theme-text)" }}>
                    Available for commissions and destination visual features worldwide for the autumn-winter cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Chronicle List */}
      {sections.portfolio && (
        <section 
          id="portfolio" 
          className="py-20 px-6 md:px-12 border-b-2"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 pb-6" style={{ borderColor: "var(--theme-text)" }}>
              <div>
                <span className="font-mono text-xs uppercase" style={{ color: "var(--theme-accent)" }}>PLATE PORTFOLIO</span>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter" style={{ color: "var(--theme-text)" }}>
                  CATALOG PIECES
                </h2>
              </div>
              <p className="font-serif text-sm max-w-sm italic text-right mt-4 md:mt-0 opacity-75" style={{ color: "var(--theme-text)" }}>
                Selected prints depicting high emotional density, curated by chronological index.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {portfolio.map((item, id) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col border p-4 rounded transition-all"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-border)" }}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded relative border" style={{ borderColor: "var(--theme-border)" }}>
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <span 
                      className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white px-2 py-0.5 rounded backdrop-blur"
                      style={{ backgroundColor: "var(--theme-text)" }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-extrabold uppercase tracking-tight" style={{ color: "var(--theme-text)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm font-serif italic mt-1 opacity-80" style={{ color: "var(--theme-text)" }}>
                        {item.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--theme-accent)" }}>
                      [0{id + 1}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Table */}
      {sections.services && (
        <section 
          id="services" 
          className="py-20 px-6 md:px-12 border-b-2"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase" style={{ color: "var(--theme-accent)" }}>INVESTMENT COMMISSIONS</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-1" style={{ color: "var(--theme-text)" }}>
                RATE TARIFFS
              </h2>
            </div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="border-2 p-6 md:p-8 rounded transition-all hover:translate-x-1" 
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)" }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4 items-start">
                      <span className="font-mono text-sm font-black active:scale-95" style={{ color: "var(--theme-accent)" }}>
                        SECTION 0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: "var(--theme-text)" }}>
                          {service.name}
                        </h3>
                        <p className="text-sm font-serif italic mt-1 opacity-85" style={{ color: "var(--theme-text)" }}>
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-left md:text-right flex flex-col md:items-end justify-center">
                      <span className="text-sm font-mono opacity-60" style={{ color: "var(--theme-text)" }}>
                        RATE ESTIMATE
                      </span>
                      {service.price && !service.requestQuote ? (
                        <span className="text-3xl font-extrabold" style={{ color: "var(--theme-text)" }}>
                          ${service.price}
                        </span>
                      ) : (
                        <span className="text-xs uppercase font-mono border px-2 py-0.5 rounded" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }}>
                          BY QUOTATION
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t font-mono text-xs flex flex-col sm:flex-row md:items-center justify-between gap-4" style={{ borderColor: "var(--theme-border)" }}>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-xs text-stone-500">
                      {service.deliverables.map((item, id) => (
                        <span key={id} className="flex items-center gap-1.5" style={{ color: "var(--theme-text)" }}>
                          <Check size={12} className="text-green-600 font-bold" /> {item}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs shrink-0 self-end italic" style={{ color: "var(--theme-accent)" }}>
                      CYCLE: {service.turnaround}
                    </span>
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
          className="py-20 px-6 md:px-12 border-b-2 font-serif text-justify"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase" style={{ color: "var(--theme-accent)" }}>LETTERS OF RECOMMENDATION</span>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase font-sans tracking-tight mt-1" style={{ color: "var(--theme-text)" }}>
                CRITICAL REVIEWS
              </h2>
            </div>

            <div className="space-y-12 split-column">
              {testimonials.map((test) => (
                <div 
                  key={test.id} 
                  className="border-b pb-8 last:border-b-0" 
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  <Quote size={28} style={{ color: "var(--theme-accent)" }} className="opacity-40 mb-4" />
                  <p className="text-lg leading-relaxed italic" style={{ color: "var(--theme-text)" }}>
                    “{test.quote}”
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <cite className="font-sans font-bold text-sm not-italic uppercase" style={{ color: "var(--theme-text)" }}>
                        — {test.clientName}
                      </cite>
                      <span className="font-mono text-[10px] block opacity-60 uppercase" style={{ color: "var(--theme-text)" }}>
                        {test.role}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" style={{ color: "var(--theme-accent)" }} className="border-none stroke-none font-bold" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Desk Form */}
      {sections.contact && (
        <section 
          id="contact" 
          className="py-20 px-6 md:px-12 border-b-2"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 border-b-2 pb-6" style={{ borderColor: 'var(--theme-text)' }}>
              <span className="font-mono text-xs uppercase" style={{ color: "var(--theme-accent)" }}>POSTAL OFFICE</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ color: "var(--theme-text)" }}>
                LETTER OF INQUIRY
              </h2>
            </div>

            <form 
              className="space-y-6 font-mono text-xs" 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Postal Action Complete!");
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: "var(--theme-text)" }}>
                    01. ADDRESSEE NAME
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Olivia Wilde"
                    className="w-full p-3 border-2 focus:outline-none focus:ring-1 focus:ring-black rounded"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: "var(--theme-text)" }}>
                    02. ELECTRONIC MAILBOX
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="olivia@domain.com"
                    className="w-full p-3 border-2 focus:outline-none focus:ring-1 focus:ring-black rounded"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: "var(--theme-text)" }}>
                    03. SCHEDULED DATE
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 border-2 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: "var(--theme-text)" }}>
                    04. ASSIGNED VENUE
                  </label>
                  <input 
                    type="text" 
                    placeholder="Paris, France"
                    className="w-full p-3 border-2 focus:outline-none focus:ring-1"
                    style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: "var(--theme-text)" }}>
                  05. BRIEFING DESCRIPTION / DETAILS
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe details of the wedding ceremony, documentary film project, or portrait specifications..."
                  className="w-full p-3 border-2 focus:outline-none focus:ring-1 font-mono rounded"
                  style={{ backgroundColor: "var(--theme-card)", borderColor: "var(--theme-text)", color: "var(--theme-text)" }}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 text-white uppercase font-bold tracking-widest text-xs hover:opacity-90 active:translate-y-0.5 transition-all rounded"
                style={{ backgroundColor: "var(--theme-text)", color: "var(--theme-bg)" }}
              >
                SUBMIT TELEGRAM (SEND INQUIRY)
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Chronicle Footer */}
      {sections.footer && (
        <footer 
          className="py-16 px-6 border-b-8 text-center font-mono text-xs uppercase tracking-widest"
          style={{ backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-text)" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <h4 className="text-3xl font-black">{identity.studioName}</h4>
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
                    className="hover:opacity-70 transition-opacity" 
                    style={{ color: "var(--theme-text)" }}
                  >
                    <IconComp size={18} />
                  </a>
                );
              })}
            </div>
            <p className="text-[10px] opacity-60 mt-4 leading-relaxed" style={{ color: "var(--theme-text)" }}>
              All rights reserved. Chronicle Vol. {new Date().getFullYear()}. Crafted via FRAMR toolset.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
