export interface PostTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  postType: "text" | "promotion" | "event" | "tips";
  platforms: string[];
}

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: "weekend-special",
    name: "Weekend Special",
    description: "Promote a weekend deal",
    prompt: "Create a weekend special promotion that drives foot traffic",
    postType: "promotion",
    platforms: ["facebook", "instagram"],
  },
  {
    id: "new-arrival",
    name: "New Arrival",
    description: "Announce a new product or service",
    prompt: "Announce an exciting new product or service arrival",
    postType: "promotion",
    platforms: ["instagram", "facebook"],
  },
  {
    id: "behind-scenes",
    name: "Behind the Scenes",
    description: "Show your business personality",
    prompt: "Share a behind-the-scenes look at our daily operations",
    postType: "text",
    platforms: ["instagram", "facebook"],
  },
  {
    id: "customer-tip",
    name: "Customer Tip",
    description: "Share helpful advice",
    prompt: "Share a helpful tip relevant to our business and customers",
    postType: "tips",
    platforms: ["facebook", "twitter"],
  },
  {
    id: "event-announcement",
    name: "Event Announcement",
    description: "Promote an upcoming event",
    prompt: "Announce an upcoming in-store event or promotion",
    postType: "event",
    platforms: ["facebook", "instagram"],
  },
];

export const BUSINESS_TYPES = [
  "Restaurant / Cafe",
  "Retail Store",
  "Hair / Beauty Salon",
  "Fitness / Gym",
  "Medical / Dental",
  "Legal / Professional Services",
  "Real Estate",
  "Home Services",
  "Pet Services",
  "Auto Services",
  "Boutique / Fashion",
  "Bakery / Pastry",
  "Bar / Brewery",
  "Photography / Studio",
  "Other",
];

export const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly & Casual" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
];
