export interface PortfolioItem {
  id: string;
  url: string; // Base64 or Unsplash URL
  title: string;
  description: string;
  category: string;
  type: "image" | "video";
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  price?: string;
  requestQuote: boolean;
}

export interface Socials {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface IdentityState {
  studioName: string;
  tagline: string;
  profession: "photographer" | "videographer" | "both";
  bio: string;
  location: string;
  email: string;
  phone?: string;
  socials: Socials;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  quote: string;
  rating: number;
}

export type TemplateId = "luminary" | "chronicle" | "obsidian" | "arcadia";

export interface ColorPalette {
  name: string;
  background: string;
  text: string;
  accent: string;
  cardBg: string;
  isDark: boolean;
}

export interface SectionsToggle {
  hero: boolean;
  about: boolean;
  portfolio: boolean;
  services: boolean;
  testimonials: boolean;
  pricing: boolean;
  contact: boolean;
  footer: boolean;
}

export interface SEOConfig {
  pageTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
}

export interface LandingPageConfig {
  identity: IdentityState;
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  templateId: TemplateId;
  paletteType: "preset" | "custom";
  presetPaletteId: string;
  customPalette: ColorPalette;
  sections: SectionsToggle;
  testimonials: TestimonialItem[];
  seo?: SEOConfig;
}

export interface TemplateProps {
  config: LandingPageConfig;
  isPreview?: boolean;
}
