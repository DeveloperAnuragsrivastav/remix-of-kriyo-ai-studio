/**
 * Single source of truth for the business details shown on the site and sent to search engines.
 * Keep these identical to the Google Business Profile and Instagram.
 */
export const BUSINESS = {
  name: "Kriyvo AI",
  url: "https://kriyvoai.online",
  email: "kriyvo.ai@gmail.com",
  phone: "+91 86040 50596",
  phoneE164: "+918604050596",
  locality: "New Ashok Nagar",
  city: "New Delhi",
  region: "Delhi",
  postalCode: "110096",
  country: "IN",
  instagram: "https://www.instagram.com/kriyvo.ai/",
  linkedin: "https://www.linkedin.com/company/kriyvoai/",
  description: "Kriyvo AI is a freelance web development and AI automation service in New Ashok Nagar, New Delhi, building custom websites, WordPress and PHP sites, AI chatbots, WhatsApp bots, voice agents and n8n workflow automation for service businesses.",
} as const;

export const ADDRESS_LINE = `${BUSINESS.locality}, ${BUSINESS.city} ${BUSINESS.postalCode}`;
