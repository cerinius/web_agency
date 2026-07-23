export const site = {
  name: "Agency Foundry",
  shortName: "AF",
  description: "Conversion-focused websites for established local service businesses in Niagara and Southern Ontario.",
  location: "Niagara, Ontario",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100"
};

export const navigation = [
  { href: "/work/dorchester-hair-fashions", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" }
];

export const packages = [
  {
    id: "launch",
    name: "Launch",
    price: "$4,800",
    cadence: "project",
    bestFor: "Established service businesses that need a credible, conversion-ready foundation.",
    featured: false,
    includes: [
      "Strategy and conversion plan",
      "Up to five focused pages",
      "Custom mobile-first design",
      "Quote or consultation flow",
      "Local SEO foundations",
      "Analytics and launch support"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    price: "$7,500",
    cadence: "project",
    bestFor: "Teams with multiple services or locations that need a stronger lead-generation system.",
    featured: true,
    includes: [
      "Everything in Launch",
      "Up to ten service and location pages",
      "Advanced proof and comparison sections",
      "CRM or booking integration",
      "Conversion event tracking",
      "Ninety-day optimization plan"
    ]
  },
  {
    id: "care",
    name: "Foundry Care",
    price: "$349",
    cadence: "month",
    bestFor: "Clients who want a healthy, improving website without managing it themselves.",
    featured: false,
    includes: [
      "Managed hosting and monitoring",
      "Security and dependency updates",
      "Monthly content or conversion improvement",
      "Analytics summary",
      "Priority support"
    ]
  }
];
