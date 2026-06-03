import { ColorPalette, LandingPageConfig, PortfolioItem, ServiceItem, TestimonialItem } from "../types";

export const PALETTES: Record<string, ColorPalette> = {
  warmIvory: {
    name: "Warm Ivory",
    background: "#FAF7F2",
    text: "#1C140E",
    accent: "#9C7C54",
    cardBg: "#F0EAE1",
    isDark: false,
  },
  midnightFilm: {
    name: "Midnight Film",
    background: "#0D0D0E",
    text: "#F2F2F3",
    accent: "#9E9EA0",
    cardBg: "#161618",
    isDark: true,
  },
  sageStone: {
    name: "Sage & Stone",
    background: "#F3F5F2",
    text: "#222D24",
    accent: "#6C7D68",
    cardBg: "#E3E7E1",
    isDark: false,
  },
  dustyRose: {
    name: "Dusty Rose",
    background: "#F9EFEA",
    text: "#401F1E",
    accent: "#B87E78",
    cardBg: "#EED7D1",
    isDark: false,
  },
  arctic: {
    name: "Arctic",
    background: "#F4F7FC",
    text: "#152438",
    accent: "#4D82AC",
    cardBg: "#E3EBF4",
    isDark: false,
  },
  goldenHour: {
    name: "Golden Hour",
    background: "#FDF8F3",
    text: "#351D0B",
    accent: "#C86A2E",
    cardBg: "#F6ECDE",
    isDark: false,
  },
  monochrome: {
    name: "Monochrome",
    background: "#FFFFFF",
    text: "#111111",
    accent: "#666666",
    cardBg: "#F4F4F4",
    isDark: false,
  },
  forest: {
    name: "Forest",
    background: "#F5F7F5",
    text: "#15261F",
    accent: "#3C634E",
    cardBg: "#E5ECE7",
    isDark: false,
  },
};

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    title: "Elysian Bloom",
    description: "An intimate, editorial wedding setting captured at twilight in Provence, France.",
    category: "Wedding",
    type: "image",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    title: "Whispers in the Pine",
    description: "Atmospheric portrait sequence exploring organic light leaks and analog textures.",
    category: "Portrait",
    type: "image",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1505236858219-8359eb29e3a9?auto=format&fit=crop&w=1200&q=80",
    title: "Vanguard Modernity",
    description: "Commercial architectural feature showcasing brutalist angles and shadow plays.",
    category: "Commercial",
    type: "image",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80",
    title: "Chasing Solitude",
    description: "Cinematic documentation film frame capturing the expansive mist of Scandinavian fjords.",
    category: "Documentary",
    type: "image",
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "s1",
    name: "Editorial Storytelling Session",
    description: "Full-day bespoke photography capturing visual narratives with cinematic direction, optimized for publications or high-end branding.",
    deliverables: ["60+ fully retouched high-res images", "Directing/styling handbook", "Online gallery access for 1 year"],
    turnaround: "3 Weeks",
    price: "1,800",
    requestQuote: false,
  },
  {
    id: "s2",
    name: "Cinematic Brand Feature",
    description: "A meticulously produced 2-3 minute visual film capturing dynamic movement, soundscapes, and color grading tailored for luxury aesthetics.",
    deliverables: ["4K cinematic teaser film", "Social cut-downs (9:16 format)", "Raw material delivery", "Full licensing rights"],
    turnaround: "4 Weeks",
    price: "3,200",
    requestQuote: false,
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    clientName: "Eleonora Vance",
    role: "Creative Director, Vogue & Co",
    quote: "Working together was an artistic revelation. Every single frame felt deliberate, painting shadows and organic light with an absolute mastery of the craft.",
    rating: 5,
  },
  {
    id: "t2",
    clientName: "Julian & Clara",
    role: "Marrakech Couple",
    quote: "We didn't just get photographers; we got visual poets who blended completely into the atmosphere and delivered pieces of memories we will hold onto forever.",
    rating: 5,
  }
];

export const STARTER_CONFIG: LandingPageConfig = {
  identity: {
    studioName: "F R A M E S",
    tagline: "Slowing down time to tell honest visual stories.",
    profession: "both",
    bio: "Hi, I am James. An editorial photographer and documentary filmmaker based out of Portland, traveling worldwide. My visual philosophy is centered around authentic light play, natural movement, and analog grain textures. I capture stories exactly how they felt.",
    location: "Portland, OR / Worldwide",
    email: "james@framrsites.com",
    phone: "+1 (503) 555-0192",
    socials: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
  portfolio: INITIAL_PORTFOLIO,
  services: INITIAL_SERVICES,
  templateId: "luminary",
  paletteType: "preset",
  presetPaletteId: "warmIvory",
  customPalette: {
    name: "Custom",
    background: "#FAF7F2",
    text: "#1C140E",
    accent: "#9C7C54",
    cardBg: "#F0EAE1",
    isDark: false,
  },
  sections: {
    hero: true,
    about: true,
    portfolio: true,
    services: true,
    testimonials: true,
    pricing: true,
    contact: true,
    footer: true,
  },
  testimonials: INITIAL_TESTIMONIALS,
  seo: {
    pageTitle: "F R A M E S • Fine Art Photography & Cinematic Film",
    metaDescription: "Slowing down time to tell honest visual stories. Bespoke fine-art portrait photography and editorial documentary film features worldwide.",
    googleAnalyticsId: ""
  }
};

/**
 * AI Suggestions helper based on profession and template
 */
export function getAISuggestions(profession: string, templateId: string): { id: string; reason: string }[] {
  const suggestions: { id: string; reason: string }[] = [];

  if (templateId === "obsidian") {
    suggestions.push({
      id: "midnightFilm",
      reason: "Obsidian's dark, high-contrast cinematic layout glows intensely with Midnight Film.",
    });
    suggestions.push({
      id: "goldenHour",
      reason: "Pair black tones with amber accents for a sunset flare look.",
    });
  } else if (templateId === "chronicle") {
    suggestions.push({
      id: "monochrome",
      reason: "Chronicle's bold editorial structure resembles vintage high-fashion print layouts.",
    });
    suggestions.push({
      id: "sageStone",
      reason: "Adds an organic, intellectual literary tone suitable for documentary visual stories.",
    });
  } else if (templateId === "luminary") {
    suggestions.push({
      id: "warmIvory",
      reason: "Provides a warm, inviting gallery-like museum backdrop for fine art portraits.",
    });
    suggestions.push({
      id: "dustyRose",
      reason: "Elegant and soft tone - highly recommended for elegant outdoor wedding work.",
    });
  } else {
    // arcadia
    suggestions.push({
      id: "forest",
      reason: "Arcadia's balanced layout feels incredibly grounded and lush in deep Forest green.",
    });
    suggestions.push({
      id: "arctic",
      reason: "Gives a modern, sleek digital catalog feel that makes images pop in cool tones.",
    });
  }

  // Add specific suggestions for professions if they aren't already included
  if (profession === "videographer" && !suggestions.some((s) => s.id === "midnightFilm")) {
    suggestions.push({
      id: "midnightFilm",
      reason: "Perfect for filmmakers who want cinematic contrast and movie-theatre lighting.",
    });
  }
  if (profession === "photographer" && !suggestions.some((s) => s.id === "warmIvory")) {
    suggestions.push({
      id: "warmIvory",
      reason: "Soft matte paper feel matches fine-art photography and analog prints.",
    });
  }

  return suggestions.slice(0, 3);
}
