export const BUSINESS_VERTICALS = {
  TEXTILES: {
    id: "textiles",
    name: "Babulal Premkumar",
    industry: "Textiles & Apparel",
    slug: "textiles",
    color: "#095181",
    accent: "#DA222A",
    tagline: "India's Legacy in Wholesale Textiles since 1978.",
    seoPattern: "Saree & Apparel Wholesaler in Ranchi",
    categories: ["Saree", "Kurti", "Lehenga", "Suit", "Fabric"],
    image: "/vertical_textiles.png"
  },
  HONDA: {
    id: "honda",
    name: "Premsons Honda",
    industry: "2-Wheelers",
    slug: "honda",
    color: "#095181",
    accent: "#DA222A",
    tagline: "Authorised Honda Wings Dealer.",
    seoPattern: "Honda Showroom in Ranchi",
    categories: ["Scooters", "Motorcycles", "Electric"],
    image: "/vertical_honda.png"
  },
  TRUCKING: {
    id: "trucking",
    name: "Premsons & Poddar Trucking",
    industry: "Commercial Vehicles",
    slug: "trucking",
    color: "#095181",
    accent: "#DA222A",
    tagline: "Ashok Leyland M & HCV Authorised Partner.",
    seoPattern: "Ashok Leyland Trucks Ranchi",
    categories: ["Light CV", "Heavy CV", "Buses"],
    image: "/vertical_trucks.png"
  },
  BAJAJ: {
    id: "bajaj",
    name: "Premsons Bajaj",
    industry: "3-Wheelers",
    slug: "bajaj",
    color: "#095181",
    accent: "#DA222A",
    tagline: "Bajaj RE Authorised Distributor.",
    seoPattern: "Bajaj 3-Wheeler Dealer Ranchi",
    categories: ["Passenger", "Cargo", "Electric"],
    image: "/vertical_bajaj.png"
  },
  MANUFACTURING: {
    id: "manufacturing",
    name: "MUVA Industries",
    industry: "Precision Manufacturing",
    slug: "muva-industries",
    color: "#095181",
    accent: "#DA222A",
    tagline: "Engineering Precision Since 1978.",
    seoPattern: "Precision Engineering Ranchi",
    categories: ["Components", "Machinery", "Custom Fab"],
    image: "/vertical_manufacturing.png"
  }
} as const;

export type VerticalID = keyof typeof BUSINESS_VERTICALS;
 export type Vertical = typeof BUSINESS_VERTICALS[VerticalID];
