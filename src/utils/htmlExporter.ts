import { LandingPageConfig } from "../types";
import { PALETTES } from "../data/defaults";

export function generateExportHTML(config: LandingPageConfig): string {
  const { identity, portfolio, services, templateId, paletteType, presetPaletteId, customPalette, sections, testimonials } = config;

  // Get current color values
  const palette = paletteType === "preset" ? (PALETTES[presetPaletteId] || PALETTES.warmIvory) : customPalette;
  const isDark = palette.isDark;

  const isBgDark = isDark;
  const borderVal = isBgDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const mutedTextVal = isBgDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.65)";

  // Structure navigation items
  let navLinksHTML = "";
  if (sections.about) navLinksHTML += `<a href="#about" class="hover:opacity-75 transition-opacity">About</a>`;
  if (sections.portfolio) navLinksHTML += `<a href="#portfolio" class="hover:opacity-75 transition-opacity">Portfolio</a>`;
  if (sections.services) navLinksHTML += `<a href="#services" class="hover:opacity-75 transition-opacity">Services</a>`;
  if (sections.contact) navLinksHTML += `<a href="#contact" class="hover:opacity-75 transition-opacity">Inquire</a>`;

  // Portfolio elements
  let portfolioItemsHTML = "";
  if (sections.portfolio) {
    if (templateId === "luminary") {
      portfolioItemsHTML = portfolio.map((item, index) => {
        const isWide = index % 3 === 0;
        const colSpan = isWide ? "md:col-span-8" : "md:col-span-4";
        const rowSpan = index % 2 === 1 ? "md:h-[450px]" : "md:h-[380px]";
        return `
        <div class="group relative overflow-hidden flex flex-col justify-end transition-all duration-500 rounded border ${colSpan} ${rowSpan} h-96" style="border-color: var(--theme-border); background-color: var(--theme-card)">
          <img src="${item.url}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity"></div>
          <div class="relative z-10 p-6 text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <span class="font-sans text-[10px] tracking-widest uppercase bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded inline-block mb-3">${item.category}</span>
            <h3 class="text-xl font-light mb-1 tracking-wider">${item.title}</h3>
            <p class="text-xs font-sans text-white/70 italic line-clamp-2 max-w-md font-light">${item.description}</p>
          </div>
        </div>`;
      }).join("");
    } else if (templateId === "chronicle") {
      portfolioItemsHTML = portfolio.map((item, id) => `
      <div class="group flex flex-col border p-4 rounded transition-all" style="background-color: var(--theme-card); border-color: var(--theme-border)">
        <div class="aspect-[4/3] overflow-hidden rounded relative border" style="border-color: var(--theme-border)">
          <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103" />
          <span class="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white px-2 py-0.5 rounded backdrop-blur" style="background-color: var(--theme-text)">${item.category}</span>
        </div>
        <div class="mt-4 flex justify-between items-start">
          <div>
            <h3 class="text-xl font-extrabold uppercase tracking-tight" style="color: var(--theme-text)">${item.title}</h3>
            <p class="text-sm font-serif italic mt-1 opacity-80" style="color: var(--theme-text)">${item.description}</p>
          </div>
          <span class="font-mono text-xs font-bold" style="color: var(--theme-accent)">[0${id + 1}]</span>
        </div>
      </div>`).join("");
    } else if (templateId === "obsidian") {
      portfolioItemsHTML = portfolio.map((item) => `
      <div class="group relative h-[350px] md:h-[400px] rounded overflow-hidden flex flex-col justify-end p-6 border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl" id="obsidian-card" style="border-color: rgba(255,255,255,0.06); background-color: rgba(20,20,22,1)">
        <img src="${item.url}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition-all duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
        <div class="relative z-10 flex flex-col justify-end h-full">
          <span class="text-[9px] font-mono font-bold tracking-widest uppercase py-0.5 px-2 bg-stone-900 border text-white rounded w-fit mb-2.5" style="border-color: rgba(255,255,255,0.15)">${item.category}</span>
          <h3 class="text-lg font-black tracking-tight text-white uppercase flex items-center gap-1.5 group-hover:text-[var(--theme-accent)] transition-colors">${item.title}</h3>
          <p class="text-xs font-serif italic text-stone-400 mt-1 line-clamp-2 max-w-sm">${item.description}</p>
        </div>
      </div>`).join("");
    } else {
      // arcadia
      portfolioItemsHTML = portfolio.map((item) => `
      <div class="group relative overflow-hidden flex flex-col rounded-3xl border border-stone-200 shadow-sm" style="background-color: var(--theme-card); border-color: var(--theme-border)">
        <div class="aspect-[4/3] overflow-hidden relative">
          <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
          <span class="absolute top-4 left-4 text-[10px] font-sans uppercase font-bold tracking-widest text-[#1c140e] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">${item.category}</span>
        </div>
        <div class="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 class="text-lg font-bold tracking-tight" style="color: var(--theme-text)">${item.title}</h3>
            <p class="text-xs font-serif italic mt-1 leading-relaxed opacity-75" style="color: var(--theme-text)">${item.description}</p>
          </div>
        </div>
      </div>`).join("");
    }
  }

  // Services elements
  let servicesHTML = "";
  if (sections.services) {
    if (templateId === "luminary") {
      servicesHTML = services.map((service) => `
      <div class="p-8 border rounded flex flex-col justify-between transition-all" style="background-color: var(--theme-card); border-color: var(--theme-border)">
        <div>
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-light font-serif" style="color: var(--theme-text)">${service.name}</h3>
            ${service.price && !service.requestQuote ? `<span class="font-sans font-semibold text-lg" style="color: var(--theme-accent)">$${service.price}</span>` : `<span class="font-sans text-xs tracking-widest uppercase py-1 px-2 border" style="border-color: var(--theme-accent); color: var(--theme-accent)">Quote</span>`}
          </div>
          <p class="text-sm font-sans mb-6 italic leading-relaxed opacity-80" style="color: var(--theme-text)">${service.description}</p>
          <ul class="space-y-2 mb-8 text-xs font-sans uppercase tracking-wider">
            ${service.deliverables.map((item) => `<li class="flex items-center gap-2" style="color: var(--theme-text)"><span class="text-[var(--theme-accent)]">✓</span> <span>${item}</span></li>`).join("")}
          </ul>
        </div>
        <div class="flex justify-between items-center pt-4 border-t" style="border-color: var(--theme-border)">
          <span class="text-xs uppercase font-sans tracking-widest opacity-60" style="color: var(--theme-text)">Due: ${service.turnaround}</span>
          <a href="#contact" class="text-xs uppercase font-sans tracking-widest font-semibold hover:opacity-75 flex items-center gap-1.5" style="color: var(--theme-accent)">Inquire →</a>
        </div>
      </div>`).join("");
    } else if (templateId === "chronicle") {
      servicesHTML = services.map((service, index) => `
      <div class="border-2 p-6 md:p-8 rounded transition-all hover:translate-x-1" style="background-color: var(--theme-card); border-color: var(--theme-text)">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex gap-4 items-start">
            <span class="font-mono text-sm font-black text-[var(--theme-accent)]">SECTION 0${index + 1}</span>
            <div>
              <h3 class="text-2xl font-black uppercase tracking-tight" style="color: var(--theme-text)">${service.name}</h3>
              <p class="text-sm font-serif italic mt-1 opacity-85" style="color: var(--theme-text)">${service.description}</p>
            </div>
          </div>
          <div class="text-left md:text-right flex flex-col md:items-end justify-center">
            <span class="text-sm font-mono opacity-60" style="color: var(--theme-text)">RATE ESTIMATE</span>
            ${service.price && !service.requestQuote ? `<span class="text-3xl font-extrabold" style="color: var(--theme-text)">$${service.price}</span>` : `<span class="text-xs uppercase font-mono border px-2 py-0.5 rounded" style="border-color: var(--theme-accent); color: var(--theme-accent)">BY QUOTATION</span>`}
          </div>
        </div>
        <div class="mt-6 pt-6 border-t font-mono text-xs flex flex-col sm:flex-row md:items-center justify-between gap-4" style="border-color: var(--theme-border)">
          <div class="flex flex-wrap gap-x-4 gap-y-2 items-center text-xs text-stone-500">
            ${service.deliverables.map((item) => `<span class="flex items-center gap-1.5" style="color: var(--theme-text)"><span class="text-green-600">✓</span> ${item}</span>`).join("")}
          </div>
          <span class="text-xs shrink-0 self-end italic" style="color: var(--theme-accent)">CYCLE: ${service.turnaround}</span>
        </div>
      </div>`).join("");
    } else if (templateId === "obsidian") {
      servicesHTML = services.map((service) => `
      <div class="p-8 rounded border flex flex-col justify-between group transition-all duration-300" style="background-color: rgba(20,20,22,1); border-color: rgba(255,255,255,0.06)">
        <div>
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-xl font-bold uppercase tracking-wide text-white">${service.name}</h3>
            ${service.price && !service.requestQuote ? `<span class="font-mono font-black text-xl text-amber-400">$${service.price}</span>` : `<span class="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">Quote</span>`}
          </div>
          <p class="text-sm font-serif italic text-stone-300 mb-8 leading-relaxed">${service.description}</p>
          <div class="space-y-4 border-t border-white/5 pt-6 mb-8">
            <span class="text-[10px] font-mono text-stone-500 tracking-widest block uppercase">DEPARTURE CHECKLIST:</span>
            <ul class="space-y-2.5 font-mono text-xs">
              ${service.deliverables.map((item) => `<li class="flex items-center gap-2 text-stone-400"><span style="color: var(--theme-accent)">✓</span> <span>${item}</span></li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-white/5 text-[11px] font-mono">
          <span class="text-stone-500">CYCLE: ${service.turnaround}</span>
          <a href="#contact" class="text-white hover:text-[var(--theme-accent)] font-semibold transition-colors flex items-center gap-1.5 uppercase">REQUEST PLAN →</a>
        </div>
      </div>`).join("");
    } else {
      // arcadia
      servicesHTML = services.map((service) => `
      <div class="p-8 border rounded-3xl shadow-sm flex flex-col justify-between group transition-all" style="background-color: var(--theme-card); border-color: var(--theme-border)">
        <div>
          <div class="flex justify-between items-start mb-6 border-b pb-4" style="border-color: var(--theme-border)">
            <h3 class="text-xl font-bold font-sans" style="color: var(--theme-text)">${service.name}</h3>
            ${service.price && !service.requestQuote ? `
              <div class="text-right">
                <span class="text-xs block text-stone-400 font-sans tracking-wide">Starting from</span>
                <span class="font-sans font-black text-2xl text-stone-900" style="color: var(--theme-text)">$${service.price}</span>
              </div>
            ` : `<span class="font-sans text-[10px] tracking-widest uppercase font-bold bg-stone-950 text-white py-1 px-2.5 rounded-full">Quote Req</span>`}
          </div>
          <p class="text-xs font-sans mb-6 leading-relaxed text-stone-600" style="color: var(--theme-text)">${service.description}</p>
          <div class="space-y-2 mb-8">
            <span class="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400 block">DELIVERABLES</span>
            ${service.deliverables.map((item) => `
              <div class="flex items-center gap-2 text-xs" style="color: var(--theme-text)">
                <span class="text-emerald-500 font-bold shrink-0">✓</span>
                <span>${item}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="flex justify-between items-center pt-4 border-t" style="border-color: var(--theme-border)">
          <span class="text-xs uppercase font-sans tracking-tight text-stone-400" style="color: var(--theme-text)">Estimated Turnaround: ${service.turnaround}</span>
          <a href="#contact" class="text-xs uppercase font-sans tracking-widest font-bold hover:opacity-75 flex items-center gap-1" style="color: var(--theme-accent)">Hold Space →</a>
        </div>
      </div>`).join("");
    }
  }

  // Testimonials content
  let testimonialsHTML = "";
  if (sections.testimonials && testimonials.length > 0) {
    if (templateId === "luminary") {
      testimonialsHTML = `
      <section class="py-24 px-6 border-t" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <div class="max-w-4xl mx-auto text-center">
          <p class="font-sans text-xs tracking-[0.3em] uppercase mb-4" style="color: var(--theme-accent)">PRAISE</p>
          <h2 class="text-3xl md:text-4xl font-light mb-16" style="color: var(--theme-text)">Kind Words From Clients</h2>
          <div class="grid md:grid-cols-2 gap-8 text-left">
            ${testimonials.map((t) => `
              <div class="p-8 border rounded flex flex-col justify-between animate-reveal" style="background-color: var(--theme-card); border-color: var(--theme-border)">
                <div>
                  <div class="flex gap-1 mb-4">
                    ${Array.from({ length: t.rating }).map(() => `<span style="color: var(--theme-accent)">★</span>`).join("")}
                  </div>
                  <blockquote class="text-base italic font-serif leading-relaxed opacity-95 mb-6" style="color: var(--theme-text)">“${t.quote}”</blockquote>
                </div>
                <div>
                  <cite class="not-italic text-sm font-semibold font-sans tracking-wide" style="color: var(--theme-text)">${t.clientName}</cite>
                  <p class="text-xs uppercase font-sans tracking-widest opacity-60 mt-0.5" style="color: var(--theme-text)">${t.role}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>`;
    } else if (templateId === "chronicle") {
      testimonialsHTML = `
      <section class="py-20 px-6 md:px-12 border-b-2 font-serif text-justify" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <span class="font-mono text-xs uppercase" style="color: var(--theme-accent)">LETTERS OF RECOMMENDATION</span>
            <h2 class="text-2xl md:text-4xl font-extrabold uppercase font-sans tracking-tight mt-1" style="color: var(--theme-text)">CRITICAL REVIEWS</h2>
          </div>
          <div class="space-y-12">
            ${testimonials.map((t) => `
              <div class="border-b pb-8 last:border-b-0" style="border-color: var(--theme-border)">
                <span class="text-4xl" style="color: var(--theme-accent)">“</span>
                <p class="text-lg leading-relaxed italic" style="color: var(--theme-text)">“${t.quote}”</p>
                <div class="mt-4 flex items-center justify-between">
                  <div>
                    <cite class="font-sans font-bold text-sm not-italic uppercase" style="color: var(--theme-text)">— ${t.clientName}</cite>
                    <span class="font-mono text-[10px] block opacity-60 uppercase" style="color: var(--theme-text)">${t.role}</span>
                  </div>
                  <div class="flex gap-0.5">
                    ${Array.from({ length: t.rating }).map(() => `<span style="color: var(--theme-accent)">★</span>`).join("")}
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>`;
    } else if (templateId === "obsidian") {
      testimonialsHTML = `
      <section class="py-24 px-8 border-b" style="background-color: var(--theme-bg); border-color: rgba(255,255,255,0.05)">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-xs font-mono tracking-[0.3em] uppercase text-stone-400 block" style="color: var(--theme-accent)">// REVIEWS & ON-LOCATION REELS</span>
            <h2 class="text-3xl md:text-4xl font-extrabold uppercase text-white mt-1">MEMBERS PERSPECTIVE</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            ${testimonials.map((t) => `
              <div class="p-8 rounded border flex flex-col justify-between" style="background-color: rgba(18,18,19,1); border-color: rgba(255,255,255,0.04)">
                <div>
                  <div class="flex gap-1 mb-4">
                    ${Array.from({ length: t.rating }).map(() => `<span style="color: var(--theme-accent)">★</span>`).join("")}
                  </div>
                  <p class="text-sm font-serif italic text-stone-300 leading-relaxed mb-6">“${t.quote}”</p>
                </div>
                <div class="border-t border-white/5 pt-4">
                  <span class="font-sans font-bold text-xs uppercase tracking-wide text-white">${t.clientName}</span>
                  <p class="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-0.5">${t.role}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>`;
    } else {
      // arcadia
      testimonialsHTML = `
      <section class="py-20 px-6 md:px-12 border-t" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <span class="font-sans text-xs uppercase tracking-widest font-semibold" style="color: var(--theme-accent)">TESTIMONIALS</span>
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight mt-1" style="color: var(--theme-text)">Highly Appreciated</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            ${testimonials.map((t) => `
              <div class="p-8 border rounded-3xl shadow-sm flex flex-col justify-between" style="background-color: var(--theme-card); border-color: var(--theme-border)">
                <div>
                  <div class="flex gap-1 mb-4">
                     ${Array.from({ length: t.rating }).map(() => `<span style="color: var(--theme-accent)">★</span>`).join("")}
                  </div>
                  <blockquote class="text-sm italic font-serif leading-relaxed opacity-95 text-stone-700 mb-6" style="color: var(--theme-text)">“${t.quote}”</blockquote>
                </div>
                <div>
                  <cite class="not-italic text-sm font-bold font-sans tracking-tight" style={{ color: "var(--theme-text)" }}>${t.clientName}</cite>
                  <p class="text-[10px] uppercase font-sans tracking-widest opacity-60 mt-0.5" style="color: var(--theme-text)">${t.role}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>`;
    }
  }

  const pageTitle = config.seo?.pageTitle || `${identity.studioName} | Portfolio`;
  const metaDescTag = config.seo?.metaDescription 
    ? `<meta name="description" content="${config.seo.metaDescription.replace(/"/g, '&quot;')}">` 
    : `<meta name="description" content="Portfolio of ${identity.studioName}">`;
  const gaScript = config.seo?.googleAnalyticsId
    ? `
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${config.seo.googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${config.seo.googleAnalyticsId}');
  </script>`
    : "";

  // Choose stylesheet settings and layouts based on templates in inline variables
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  ${metaDescTag}
  ${gaScript}
  
  <!-- Tailwind Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --theme-bg: ${palette.background};
      --theme-text: ${palette.text};
      --theme-accent: ${palette.accent};
      --theme-card: ${palette.cardBg};
      --theme-border: ${borderVal};
    }
    
    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--theme-bg);
      color: var(--theme-text);
      font-family: ${templateId === 'luminary' ? '"Playfair Display", serif' : templateId === 'obsidian' ? '"Space Grotesk", sans-serif' : '"Inter", sans-serif'};
    }
    
    .font-serif {
      font-family: "Playfair Display", Georgia, serif;
    }
    .font-mono {
      font-family: "Space Grotesk", monospace;
    }
    .font-sans {
      font-family: "Inter", system-ui, sans-serif;
    }
  </style>
</head>
<body class="antialiased min-h-screen">

  <!-- Mobile Menu Drawer (Generic element across headers) -->
  <div id="mobile-drawer" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden transition-all duration-300">
    <div class="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs p-6 shadow-xl flex flex-col justify-between" style="background-color: var(--theme-bg)">
      <div>
        <div class="flex justify-between items-center mb-10 pb-4 border-b" style="border-color: var(--theme-border)">
          <span class="text-xl font-bold font-sans uppercase">${identity.studioName}</span>
          <button onclick="toggleMobileMenu()" class="text-2xl p-1 font-bold">×</button>
        </div>
        <div class="flex flex-col gap-6 text-sm font-bold tracking-widest uppercase font-mono">
          ${sections.about ? `<a href="#about" onclick="toggleMobileMenu()" class="hover:opacity-70">About</a>` : ''}
          ${sections.portfolio ? `<a href="#portfolio" onclick="toggleMobileMenu()" class="hover:opacity-70">Gallery</a>` : ''}
          ${sections.services ? `<a href="#services" onclick="toggleMobileMenu()" class="hover:opacity-70">Services</a>` : ''}
          ${sections.contact ? `<a href="#contact" onclick="toggleMobileMenu()" class="hover:opacity-70">Inquire</a>` : ''}
        </div>
      </div>
      <p class="text-[10px] opacity-50">&copy; ${new Date().getFullYear()} ${identity.studioName}. Saved with Framr.</p>
    </div>
  </div>

  ${templateId === 'luminary' ? `
    <!-- LUMINARY TEMPLATE -->
    <div>
      <nav class="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <span class="text-2xl font-light tracking-widest font-serif">${identity.studioName}</span>
        <div class="hidden md:flex space-x-8 text-sm tracking-widest uppercase font-sans">
          ${navLinksHTML}
        </div>
        <button onclick="toggleMobileMenu()" class="md:hidden block text-xl" style="color: var(--theme-text)">☰</button>
      </nav>

      ${sections.hero ? `
      <section class="relative min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div class="absolute inset-0 z-0 opacity-15 overflow-hidden">
          <img src="${portfolio[0]?.url || ''}" class="w-full h-full object-cover filter grayscale scale-105" />
        </div>
        <div class="relative z-10 max-w-4xl mx-auto flex flex-col justify-center h-full items-center pt-20">
          <p class="font-sans text-xs uppercase tracking-[0.25em] mb-4 font-semibold" style="color: var(--theme-accent)">${identity.profession === 'both' ? 'Photographer & Videographer' : identity.profession}</p>
          <h1 class="text-5xl md:text-8xl font-light tracking-tight mb-8 font-serif leading-none">${identity.studioName}</h1>
          <p class="text-xl md:text-2xl font-light italic opacity-90 max-w-2xl leading-relaxed mb-12 font-serif">“${identity.tagline}”</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#portfolio" class="px-8 py-3 text-white text-xs uppercase tracking-widest font-bold" style="background-color: var(--theme-accent)">PORTFOLIO</a>
            <a href="#contact" class="px-8 py-3 border text-xs uppercase tracking-widest" style="border-color: var(--theme-text); color: var(--theme-text)">BOOK SESSION</a>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.about ? `
      <section id="about" class="py-24 md:py-36 px-6 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-4xl mx-auto text-center">
          <p class="font-sans text-xs tracking-[0.3em] uppercase mb-4" style="color: var(--theme-accent)">THE ARTIST</p>
          <h2 class="text-3xl md:text-4xl font-light mb-12">Honest Stories Told Authentically</h2>
          <div class="grid md:grid-cols-12 gap-12 items-center text-left font-sans">
            <div class="md:col-span-4 aspect-[3/4] overflow-hidden rounded border" style="border-color: var(--theme-border)">
              <img src="${portfolio[1]?.url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80'}" class="w-full h-full object-cover filter grayscale" />
            </div>
            <div class="md:col-span-8 flex flex-col justify-center font-serif">
              <p class="text-lg md:text-xl font-light leading-relaxed mb-6 italic opacity-90">${identity.bio}</p>
              <div class="space-y-3 font-sans text-xs uppercase tracking-widest pt-4 border-t" style="border-color: var(--theme-border)">
                <div class="flex items-center gap-3">📍 ${identity.location}</div>
                <div class="flex items-center gap-3">✉️ ${identity.email}</div>
                ${identity.phone ? `<div class="flex items-center gap-3">📞 ${identity.phone}</div>` : ''}
              </div>
            </div>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.portfolio ? `
      <section id="portfolio" class="py-24 px-6 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <p class="font-sans text-xs tracking-[0.3em] uppercase mb-4" style="color: var(--theme-accent)">VISUAL JOURNAL</p>
            <h2 class="text-3xl md:text-5xl font-light">Selected Work</h2>
          </div>
          <div class="grid md:grid-cols-12 gap-8 font-sans">
            ${portfolioItemsHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.services ? `
      <section id="services" class="py-24 px-6 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <p class="font-sans text-xs tracking-[0.3em] uppercase mb-4" style="color: var(--theme-accent)">OFFERINGS</p>
            <h2 class="text-3xl md:text-5xl font-light">Creative Services & Design</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-12 font-sans">
            ${servicesHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${testimonialsHTML}
    </div>
  ` : templateId === 'chronicle' ? `
    <!-- CHRONICLE TEMPLATE -->
    <div>
      <header class="border-b-4 py-8 px-6 md:px-12 flex flex-col items-center text-center justify-center" style="border-color: var(--theme-text)">
        <span class="font-mono text-[10px] tracking-[0.4em] uppercase mb-1" style="color: var(--theme-accent)">ISSUE VOL. ${new Date().getFullYear()}</span>
        <h1 class="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-3">${identity.studioName}</h1>
        <p class="font-serif text-sm italic max-w-xl opacity-80">“${identity.tagline}”</p>
      </header>

      <nav class="sticky top-0 z-40 border-b-2 py-3 px-6 md:px-12 flex justify-between items-center text-xs tracking-widest uppercase font-mono backdrop-blur-md" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <span>📍 ${identity.location}</span>
        <div class="hidden md:flex gap-8">
          ${sections.about ? `<a href="#about" class="hover:underline">ABOUT</a>` : ''}
          ${sections.portfolio ? `<a href="#portfolio" class="hover:underline">FOLIO</a>` : ''}
          ${sections.services ? `<a href="#services" class="hover:underline">TARIFFS</a>` : ''}
          ${sections.contact ? `<a href="#contact" class="hover:underline">LETTERS</a>` : ''}
        </div>
        <button onclick="toggleMobileMenu()" class="md:hidden block text-xl">☰</button>
      </nav>

      ${sections.hero ? `
      <section class="p-6 md:p-12 grid md:grid-cols-12 gap-8 items-stretch border-b-2" style="border-color: var(--theme-border)">
        <div class="md:col-span-8 flex flex-col justify-between p-6 md:p-12 border rounded" style="background-color: var(--theme-card); border-color: var(--theme-border)">
          <div>
            <span class="font-mono text-xs uppercase tracking-widest px-2.5 py-1 text-white" style="background-color: var(--theme-accent)">FEATURE STORY</span>
            <h2 class="text-3xl md:text-6xl font-extrabold tracking-tight uppercase mt-6 mb-6 leading-none">GRAIN & ORGANIC SUNLIGHT</h2>
            <p class="text-lg font-serif opacity-90 leading-relaxed max-w-xl">Every session is curated like high fashion journalism. No fake poses, just pure emotional precision.</p>
          </div>
          <div class="mt-12">
            <a href="#portfolio" class="px-6 py-3 text-white uppercase text-xs font-bold tracking-widest rounded" style="background-color: var(--theme-text)">OPEN INDEX</a>
          </div>
        </div>
        <div class="md:col-span-4 aspect-square md:aspect-auto min-h-64 relative rounded overflow-hidden group border" style="border-color: var(--theme-border)">
          <img src="${portfolio[0]?.url || ''}" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute bottom-6 left-6 right-6 text-white z-10 font-sans">
            <span class="font-mono text-[9px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">COVER</span>
            <h3 class="text-xl font-bold uppercase mt-2">${portfolio[0]?.title || ''}</h3>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.about ? `
      <section id="about" class="py-20 px-6 md:px-12 border-b-2" style="border-color: var(--theme-border)">
        <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 font-serif">
          <div class="md:col-span-4">
            <span class="font-mono text-xs uppercase tracking-[0.2em] font-semibold" style="color: var(--theme-accent)">COLUMNIST /</span>
            <h3 class="text-3xl md:text-4xl font-extrabold uppercase font-sans mt-2 mb-6">BIOGRAPHY</h3>
            <div class="aspect-[3/4] border-2 rounded overflow-hidden p-2" style="border-color: var(--theme-text)">
              <img src="${portfolio[1]?.url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80'}" class="w-full h-full object-cover filter grayscale" />
            </div>
          </div>
          <div class="md:col-span-8 flex flex-col justify-between">
            <p class="text-xl leading-relaxed italic opacity-95">${identity.bio}</p>
            <div class="grid sm:grid-cols-2 gap-8 pt-8 font-sans text-xs border-t" style="border-color: var(--theme-border)">
              <div class="space-y-4">
                <span class="font-mono font-bold uppercase block tracking-wider" style="color: var(--theme-accent)">COMMUNICATIONS</span>
                <p>📍 ${identity.location}</p>
                <p>✉️ ${identity.email}</p>
                ${identity.phone ? `<p>📞 ${identity.phone}</p>` : ''}
              </div>
            </div>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.portfolio ? `
      <section id="portfolio" class="py-20 px-6 md:px-12 border-b-2" style="border-color: var(--theme-border)">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 pb-6" style="border-color: var(--theme-text)">
            <h2 class="text-3xl md:text-6xl font-black uppercase tracking-tighter">CATALOG PIECES</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-12 font-sans">
            ${portfolioItemsHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.services ? `
      <section id="services" class="py-20 px-6 md:px-12 border-b-2" style="border-color: var(--theme-border)">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16">RATE TARIFFS</h2>
          <div class="space-y-6">
            ${servicesHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${testimonialsHTML}
    </div>
  ` : templateId === 'obsidian' ? `
    <!-- OBSIDIAN TEMPLATE -->
    <div style="background-color: #0c0c0d">
      <nav class="sticky top-0 z-40 px-8 py-5 flex justify-between items-center border-b" style="background-color: rgba(13,13,14,0.9); border-color: rgba(255,255,255,0.08)">
        <span class="text-xl md:text-2xl font-black uppercase tracking-[0.3em] font-sans text-white">${identity.studioName}</span>
        <button onclick="toggleMobileMenu()" class="text-stone-300 md:hidden block text-xl">☰</button>
      </nav>

      ${sections.hero ? `
      <section class="relative min-h-screen flex flex-col justify-end p-8 md:p-16">
        <div class="absolute inset-0">
          <img src="${portfolio[0]?.url || ''}" class="w-full h-full object-cover filter brightness-[0.35] contrast-125" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] to-transparent"></div>
        </div>
        <div class="relative z-10 max-w-5xl font-sans text-white">
          <span class="text-xs font-mono tracking-[0.35em] uppercase px-3 py-1 bg-stone-900 border text-white rounded inline-block mb-4" style="border-color: rgba(255,255,255,0.12)">⚜️ SYSTEM BLACK</span>
          <h1 class="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">${identity.studioName}</h1>
          <p class="text-lg md:text-2xl font-serif text-stone-300 max-w-2xl italic leading-relaxed mb-8">“${identity.tagline}”</p>
          <div>
            <a href="#portfolio" class="inline-block px-8 py-3.5 bg-white text-black text-xs font-black tracking-[0.2em] uppercase rounded">ENTER FILES</a>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.about ? `
      <section id="about" class="py-24 px-8 border-b" style="border-color: rgba(255,255,255,0.05)">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center text-white">
          <div class="relative aspect-[4/5] rounded overflow-hidden border border-white/10">
            <img src="${portfolio[1]?.url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80'}" class="w-full h-full object-cover filter grayscale" />
          </div>
          <div class="space-y-8 font-sans">
            <span class="text-xs font-mono tracking-[0.3em] uppercase block" style="color: var(--theme-accent)">// STORYSTAGE</span>
            <p class="text-lg font-serif italic text-stone-300 leading-relaxed">${identity.bio}</p>
            <div class="space-y-3.5 border-t border-white/10 pt-8 font-mono text-xs">
              <div>📍 ${identity.location}</div>
              <div>✉️ ${identity.email}</div>
              ${identity.phone ? `<div>📞 ${identity.phone}</div>` : ''}
            </div>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.portfolio ? `
      <section id="portfolio" class="py-24 px-8 border-b" style="border-color: rgba(255,255,255,0.05)">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-black uppercase text-white mb-16 font-sans">CINEMATIC INDEX</h2>
          <div class="grid md:grid-cols-3 gap-6 font-sans">
            ${portfolioItemsHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.services ? `
      <section id="services" class="py-24 px-8 border-b" style="border-color: rgba(255,255,255,0.05)">
        <div class="max-w-5xl mx-auto font-sans">
          <h2 class="text-3xl md:text-5xl font-black uppercase text-white mt-2 text-center mb-16">PACKAGES</h2>
          <div class="grid md:grid-cols-2 gap-8">
            ${servicesHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${testimonialsHTML}
    </div>
  ` : `
    <!-- ARCADIA TEMPLATE -->
    <div>
      <nav class="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b" style="background-color: var(--theme-bg); border-color: var(--theme-border)">
        <span class="text-xl font-bold tracking-tight font-sans">${identity.studioName.toLowerCase()}</span>
        <button onclick="toggleMobileMenu()" class="md:hidden block text-xl">☰</button>
      </nav>

      ${sections.hero ? `
      <section class="relative min-h-[90vh] grid md:grid-cols-2 items-stretch">
        <div class="flex flex-col justify-center p-8 md:p-16">
          <span class="font-sans text-xs uppercase tracking-widest font-semibold block mb-4" style="color: var(--theme-accent)">☀️ PORTFOLIO DIRECTORY</span>
          <h1 class="text-4xl md:text-7xl font-bold tracking-tight mb-6">${identity.studioName}</h1>
          <p class="text-lg md:text-xl font-serif leading-relaxed mb-8">“${identity.tagline}”</p>
          <div class="flex gap-4">
            <a href="#contact" class="px-6 py-3 rounded-full text-white font-semibold text-xs uppercase text-center" style="background-color: var(--theme-accent)">BOOK SESSION</a>
          </div>
        </div>
        <div class="hidden md:block relative min-h-[450px]">
          <img src="${portfolio[0]?.url || ''}" class="absolute inset-0 w-full h-full object-cover rounded-bl-[100px]" />
        </div>
      </section>
      ` : ''}

      ${sections.about ? `
      <section id="about" class="py-20 px-6 md:px-12 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-5xl mx-auto">
          <div class="grid md:grid-cols-12 gap-12 items-center font-sans">
            <div class="md:col-span-5 grid grid-cols-2 gap-4">
              <div class="aspect-[3/4] rounded-2xl overflow-hidden border" style="border-color: var(--theme-border)">
                <img src="${portfolio[1]?.url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=500&q=80'}" class="w-full h-full object-cover" />
              </div>
              <div class="aspect-[3/4] rounded-2xl overflow-hidden mt-8 border" style="border-color: var(--theme-border)">
                <img src="${portfolio[2]?.url || 'https://images.unsplash.com/photo-1505236858219-8359eb29e3a9?auto=format&fit=crop&w=500&q=80'}" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="md:col-span-7">
              <span class="font-sans text-xs uppercase tracking-widest font-semibold" style="color: var(--theme-accent)">STORY</span>
              <p class="text-lg font-serif leading-relaxed mt-2 mb-8">${identity.bio}</p>
              <div class="grid sm:grid-cols-2 gap-6 pt-8 border-t" style="border-color: var(--theme-border)">
                <div>
                  <span class="font-bold text-[10px] uppercase block mb-1">HQ</span>
                  <p>📍 ${identity.location}</p>
                </div>
                <div>
                  <span class="font-bold text-[10px] uppercase block mb-1">Mails</span>
                  <p>✉️ ${identity.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.portfolio ? `
      <section id="portfolio" class="py-20 px-6 md:px-12 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-12">Chasing Moments</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            ${portfolioItemsHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${sections.services ? `
      <section id="services" class="py-20 px-6 md:px-12 border-t" style="border-color: var(--theme-border)">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">Services Offered</h2>
          <div class="grid md:grid-cols-2 gap-8 font-sans">
            ${servicesHTML}
          </div>
        </div>
      </section>
      ` : ''}

      ${testimonialsHTML}
    </div>
  `}

  <!-- Contact Form Section (Global across templates) -->
  ${sections.contact ? `
  <section id="contact" class="py-24 px-6 border-t" style="border-color: var(--theme-border)">
    <div class="max-w-3xl mx-auto font-sans">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight">Let's connect</h2>
        <p class="text-sm italic mt-2 opacity-75">Send your request details and we will coordinate custom packages inside 24 hours.</p>
      </div>
      <form class="space-y-6 text-xs" onsubmit="handleInquirySubmit(event)">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-semibold mb-2">FullName</label>
            <input type="text" required class="w-full p-4 border rounded-xl" style="background-color: var(--theme-card); border-color: var(--theme-border); color: var(--theme-text)" />
          </div>
          <div>
            <label class="block text-xs font-semibold mb-2">Email</label>
            <input type="email" required class="w-full p-4 border rounded-xl" style="background-color: var(--theme-card); border-color: var(--theme-border); color: var(--theme-text)" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold mb-2">Details / Objectives</label>
          <textarea rows="4" required class="w-full p-4 border rounded-xl" style="background-color: var(--theme-card); border-color: var(--theme-border); color: var(--theme-text)"></textarea>
        </div>
        <button type="submit" class="w-full py-4 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-all font-sans" style="background-color: var(--theme-accent)">Send Message</button>
      </form>
    </div>
  </section>
  ` : ''}

  <!-- Footer -->
  ${sections.footer ? `
  <footer class="py-16 px-6 border-t text-center font-sans text-xs tracking-wide opacity-80" style="border-color: var(--theme-border)">
    <div class="max-w-4xl mx-auto flex flex-col items-center gap-6">
      <span class="text-xl font-bold uppercase tracking-widest">${identity.studioName}</span>
      <p>&copy; ${new Date().getFullYear()} ${identity.studioName}. Made with Framr Generator.</p>
    </div>
  </footer>
  ` : ''}

  <!-- JS Interactivity Scripts -->
  <script>
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        setTimeout(() => {
          drawer.classList.add('opacity-100');
        }, 10);
      } else {
        drawer.classList.remove('opacity-100');
        setTimeout(() => {
          drawer.classList.add('hidden');
        }, 300);
      }
    }

    function handleInquirySubmit(event) {
      event.preventDefault();
      alert('Thank you! Your message has been successfully logged with the creative desk at ${identity.studioName}.');
      event.target.reset();
    }
  </script>
</body>
</html>`;
}
