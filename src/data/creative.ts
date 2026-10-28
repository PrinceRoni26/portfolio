import type { CreativeCategory, CreativeImage, CreativeItem } from "@/types";

export const creativeCategories: ("All Work" | CreativeCategory)[] = [
  "All Work",
  "Social Media Graphics",
  "Video Editing",
  "Motion Graphics",
  "Marketing Campaigns",
  "Brand Identity",
];

/**
 * Creative work gallery. Only include client work you have permission to show.
 *
 * Originals live in /my-works (not committed). Optimized copies are in
 * /public/images/creative (WebP, max 1600px) and /public/videos (720p MP4).
 *
 *   Image:   media: { type: "image", src: "/images/creative/post.webp", width: 1080, height: 1350 }
 *   Several: media: { type: "gallery", images: [{ src, width, height }, ...] }
 *   Video:   media: { type: "video", src: "/videos/reel.mp4", poster: "/images/creative/reel-poster.webp", width: 720, height: 1280 }
 *
 * `date` is optional — add the real publish date when you know it.
 */

const img = (name: string, width: number, height: number): CreativeImage => ({
  src: `/images/creative/${name}.webp`,
  width,
  height,
});

const vertical = (name: string, poster = `${name}-poster`) =>
  ({ type: "video", src: `/videos/${name}.mp4`, poster: `/images/creative/${poster}.webp`, width: 720, height: 1280 }) as const;

const landscape = (name: string, width = 1280, height = 720) =>
  ({ type: "video", src: `/videos/${name}.mp4`, poster: `/images/creative/${name}-poster.webp`, width, height }) as const;

const GMEA = "GMEA SunPower Solutions";
const GMEA_ELECTRONICS = "GMEA Electronics";
const GMEA_GROUP = "GMEA Group";
const PRODISENYO = "Prodisenyo Builders Corp.";
const MR_DEPOT = "MR Depot";

export const creativeWork: CreativeItem[] = [
  {
    id: "prodisenyo-carousel-b",
    title: "Building Dreams Carousel",
    client: PRODISENYO,
    description:
      "A four-slide Facebook carousel introducing Prodisenyo's design, build, and fit-out services — from residential homes to commercial spaces — ending with a clear call to message the team.",
    category: "Marketing Campaigns",
    tools: [],
    aspect: "1/1",
    media: {
      type: "gallery",
      images: [1, 2, 3, 4].map((n) => img(`prodisenyo-carousel-b-${n}`, 1254, 1254)),
    },
  },
  {
    id: "gmea-solar-tips-ep2",
    featured: true,
    title: "Solar Tips Ep. 2 — Which System Fits You?",
    client: GMEA,
    description:
      "Animated explainer comparing on-grid, hybrid, and off-grid solar systems, with Filipino captions so homeowners can quickly see which setup matches their needs.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-solar-tips-ep2"),
  },
  {
    id: "mr-depot-your-space",
    title: "Your Space, Reimagined",
    client: MR_DEPOT,
    description:
      "A 30-second vertical reel showcasing custom modular storage — from floor-plan line art to finished under-stair cabinetry.",
    category: "Video Editing",
    tools: [],
    aspect: "9/16",
    media: vertical("mr-depot-your-space"),
  },
  {
    id: "gmea-solar-packages",
    title: "Hybrid Solar Package Posts",
    client: GMEA,
    description:
      "A series of price-forward product posts for GMEA's 3 kW to 12 kW hybrid solar packages, each listing panel count, battery spec, and what's included.",
    category: "Social Media Graphics",
    tools: [],
    aspect: "4/5",
    media: {
      type: "gallery",
      images: ["3kw", "3kw-25-6v", "3kw-alt", "6kw", "6kw-alt", "8kw", "10kw", "12kw"].map((k) =>
        img(`solar-package-${k}`, 1122, 1402),
      ),
    },
  },
  {
    id: "prodisenyo-business-reel",
    featured: true,
    title: "Spaces That Mean Business",
    client: PRODISENYO,
    description:
      "A 20-second reel highlighting completed commercial fit-outs — Fully Booked, Puma Ayala, and Koufuku — built to drive inquiries for new business spaces.",
    category: "Video Editing",
    tools: [],
    aspect: "9/16",
    media: vertical("prodisenyo-business-reel"),
  },
  {
    id: "gmea-logo-family",
    title: "GMEA Logo Family",
    client: GMEA_GROUP,
    description:
      "Logo system for the GMEA group: the parent mark plus SunPower, Electronics, and Products & Services sub-brands, along with early concept explorations for GMEA Electronics.",
    category: "Brand Identity",
    tools: [],
    aspect: "1/1",
    media: {
      type: "gallery",
      images: [
        img("gmea-logo-solutions", 1536, 1024),
        img("gmea-sunpower-logo", 1254, 1254),
        img("gmea-products-services-logo", 1536, 1024),
        img("gmea-electronics-logo", 1254, 1254),
        img("gmea-electronics-logo-concepts", 1254, 1254),
      ],
    },
  },
  {
    id: "gmea-carousel-oct",
    title: "Project Spotlight Carousel",
    client: GMEA,
    description:
      "A three-slide carousel featuring a 31 kWp commercial installation — the system specs, the installation quality, and the range of projects GMEA can cater to.",
    category: "Marketing Campaigns",
    tools: [],
    aspect: "4/5",
    media: {
      type: "gallery",
      images: [1, 2, 3].map((n) => img(`gmea-carousel-${n}`, 1080, 1350)),
    },
  },
  {
    id: "probuild-promo",
    title: "ProBuild Product Promo",
    client: PRODISENYO,
    description:
      "A 30-second animated promo for ProBuild, Prodisenyo's internal operations system — showing approvals, payroll, and role-based access in one place.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("probuild-promo"),
  },
  {
    id: "probuild-demo",
    title: "ProBuild Product Demo",
    client: PRODISENYO,
    description:
      "A 90-second landscape demo of ProBuild with voiceover, sound design, and animated walkthroughs of each role — CEO, engineer, purchaser, and payroll manager.",
    category: "Motion Graphics",
    tools: [],
    aspect: "16/9",
    media: landscape("probuild-demo"),
  },
  {
    id: "mr-depot-platform-promo",
    featured: true,
    title: "MR Depot Platform Promo",
    client: MR_DEPOT,
    description:
      "A landscape walkthrough of the MR Depot website and project pipeline — public portfolio, drag-and-drop project tracking, and the mobile view.",
    category: "Video Editing",
    tools: [],
    aspect: "16/9",
    media: landscape("mr-depot-platform-promo"),
  },
  {
    id: "electric-fence-posts",
    title: "Electric Fence Product Posts",
    client: GMEA_ELECTRONICS,
    description:
      "Product graphics for GMEA's electric fence line: complete solutions, professional installation, and the accessories that go with it.",
    category: "Social Media Graphics",
    tools: [],
    aspect: "4/5",
    media: {
      type: "gallery",
      images: ["solutions", "installation", "accessories"].map((k) => img(`electric-fence-${k}`, 1448, 1086)),
    },
  },
  {
    id: "prodisenyo-quotation-checklist",
    title: "Quotation Checklist Reel",
    client: PRODISENYO,
    description:
      "Before asking “How much per sqm?” — a voiced-over reel walking clients through the four things to prepare for an accurate construction quote.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("prodisenyo-quotation-checklist", "prodisenyo-quotation-checklist-poster"),
  },
  {
    id: "gmea-solar-tips-ep1",
    title: "Solar Tips Ep. 1 — Read Your Bill",
    client: GMEA,
    description:
      "Character-led animated explainer showing homeowners how to find their kWh usage on their electric bill and estimate the solar system size they need.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-solar-tips-ep1"),
  },
  {
    id: "prodisenyo-carousel-a",
    title: "Meet Prodisenyo Carousel",
    client: PRODISENYO,
    description:
      "An introductory carousel covering who Prodisenyo is, what they build (residential, commercial, retail, fit-out), completed work, and how to get in touch.",
    category: "Marketing Campaigns",
    tools: [],
    aspect: "4/5",
    media: {
      type: "gallery",
      images: [1, 2, 3, 4].map((n) => img(`prodisenyo-carousel-a-${n}`, 1080, 1440)),
    },
  },
  {
    id: "mr-depot-modular-reel",
    title: "Modular Kitchens & Cabinets",
    client: MR_DEPOT,
    description: "A 30-second reel presenting MR Depot's modular kitchens and custom cabinets and wardrobes as design inspiration.",
    category: "Video Editing",
    tools: [],
    aspect: "9/16",
    media: vertical("mr-depot-modular-reel"),
  },
  {
    id: "gmea-business-cards",
    title: "Business Card Designs",
    client: GMEA_GROUP,
    description:
      "Front-and-back business cards for each GMEA brand — SunPower, Products & Services, Rental, and Electronics — with QR codes linking to their pages.",
    category: "Brand Identity",
    tools: [],
    aspect: "16/9",
    media: {
      type: "gallery",
      images: [
        img("gmea-sunpower-business-card", 1600, 900),
        img("gmea-products-business-card", 1600, 900),
        img("gmea-business-card-dark", 1536, 1024),
        img("gmea-business-card-template", 1600, 900),
        img("gmea-rental-business-card", 1448, 1086),
        img("gmea-electronics-business-card", 1600, 900),
      ],
    },
  },
  {
    id: "prodisenyo-tianlala",
    title: "Tianlala Opening Reel",
    client: PRODISENYO,
    description: "A short reel celebrating the opening of Tianlala Ice Cream Tea & Coffee at Limketkai Mall — a recently completed Prodisenyo fit-out.",
    category: "Video Editing",
    tools: [],
    aspect: "9/16",
    media: vertical("prodisenyo-tianlala"),
  },
  {
    id: "gmea-mag-solar-na",
    title: "Mag-Solar Na!",
    client: GMEA,
    description: "A punchy 20-second reel introducing GMEA's 6 kW to 12 kW+ hybrid solar packages for homes, ending on a quote request.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-mag-solar-na"),
  },
  {
    id: "prodisenyo-fully-booked",
    title: "Project Post: Fully Booked",
    client: PRODISENYO,
    description: "A completed-project post for the Fully Booked bookstore fit-out, finished in just 20 days.",
    category: "Social Media Graphics",
    tools: [],
    aspect: "1/1",
    media: { type: "image", ...img("prodisenyo-fully-booked", 1254, 1254) },
  },
  {
    id: "gmea-logo-animation",
    title: "GMEA Logo Animation",
    client: GMEA_GROUP,
    description: "An animated logo reveal that builds the GMEA mark piece by piece — camera, home, solar panel, and excavator — for use in video intros.",
    category: "Motion Graphics",
    tools: [],
    aspect: "16/9",
    media: landscape("gmea-logo-animation"),
  },
  {
    id: "prodisenyo-facebook-reel",
    title: "Spaces That Bring People Together",
    client: PRODISENYO,
    description: "A project spotlight reel featuring the Zubaibai and Koufuku restaurant fit-outs, closing with a call to book a consultation.",
    category: "Video Editing",
    tools: [],
    aspect: "9/16",
    media: vertical("prodisenyo-facebook-reel"),
  },
  {
    id: "gmea-solar-sizing",
    title: "Solar Sizing, Step by Step",
    client: GMEA,
    description: "A voiced-over animated guide that walks viewers through three steps to size a solar system, from reading the bill to local sun hours.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-solar-sizing"),
  },
  {
    id: "xray-inspection-system",
    title: "X-Ray Inspection System",
    client: GMEA_ELECTRONICS,
    description: "A product graphic presenting GMEA Electronics' X-ray screening system for security and inspection operations.",
    category: "Social Media Graphics",
    tools: [],
    aspect: "4/5",
    media: { type: "image", ...img("xray-inspection-system", 1448, 1086) },
  },
  {
    id: "prodisenyo-marketing-promo",
    title: "Prodisenyo Marketing Promo",
    client: PRODISENYO,
    description: "A landscape promo with sound, moving through recent restaurant and retail projects and ending with a call to book a consultation.",
    category: "Video Editing",
    tools: [],
    aspect: "16/9",
    media: landscape("prodisenyo-marketing-promo"),
  },
  {
    id: "gmea-solar-tips-ep2-iso",
    title: "Solar Tips Ep. 2 — Isometric Cut",
    client: GMEA,
    description: "An alternate isometric take on Episode 2, diagramming how on-grid and hybrid systems connect panels, inverter, battery, and the grid.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-solar-tips-ep2-iso"),
  },
  {
    id: "gmea-mascot",
    title: "GMEA SunPower Mascot",
    client: GMEA,
    description: "A friendly technician character created for GMEA SunPower, used across the animated Solar Tips series.",
    category: "Brand Identity",
    tools: [],
    aspect: "4/5",
    media: { type: "image", ...img("gmea-mascot", 1024, 1536) },
  },
  {
    id: "gmea-solar-starts",
    title: "Solar Starts With Your Needs",
    client: GMEA,
    description: "A clean typographic reel asking viewers to choose their priority — savings, backup power, or both — before planning a system.",
    category: "Motion Graphics",
    tools: [],
    aspect: "9/16",
    media: vertical("gmea-solar-starts-with-your-needs"),
  },
  {
    id: "mr-depot-covers",
    title: "Facebook Cover & Social Preview",
    client: MR_DEPOT,
    description: "Facebook page cover and the link-preview image for the MR Depot website.",
    category: "Social Media Graphics",
    tools: [],
    aspect: "16/9",
    media: {
      type: "gallery",
      images: [img("mr-depot-social-cover", 1200, 630), img("mr-depot-fb-cover", 960, 432)],
    },
  },
];
