// ==============================================================================
// Studio Defaults & Types (Client-Safe, No Server/Payload Dependencies)
// ==============================================================================

export interface FallbackPortfolioItem {
  id: string;
  title: string;
  category: "weddings" | "events" | "fashion" | "concerts" | "commercial";
  categoryLabel: string;
  src: string;
  location: string;
  slug?: string;
}

export const defaultPortfolio: FallbackPortfolioItem[] = [
  {
    id: "p1",
    title: "Nepali Wedding Ceremony",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85",
    location: "Kathmandu",
  },
  {
    id: "p2",
    title: "Bride Portrait",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=85",
    location: "Pokhara",
  },
  {
    id: "p3",
    title: "Couple Session",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=85",
    location: "Nagarkot",
  },
  {
    id: "p4",
    title: "Corporate Gala",
    category: "events",
    categoryLabel: "Events",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=85",
    location: "Kathmandu",
  },
  {
    id: "p5",
    title: "Live Concert Coverage",
    category: "concerts",
    categoryLabel: "Concerts",
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1000&q=85",
    location: "Kathmandu",
  },
  {
    id: "p6",
    title: "Luxury Fashion Editorial",
    category: "fashion",
    categoryLabel: "Fashion",
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85",
    location: "Studio",
  },
  {
    id: "p7",
    title: "Bridal Portrait",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=85",
    location: "Bhaktapur",
  },
  {
    id: "p8",
    title: "Cultural Celebration",
    category: "events",
    categoryLabel: "Events",
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1000&q=85",
    location: "Patan",
  },
  {
    id: "p9",
    title: "Fashion Portrait Series",
    category: "fashion",
    categoryLabel: "Fashion",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=85",
    location: "Studio",
  },
  {
    id: "p10",
    title: "Music Festival",
    category: "concerts",
    categoryLabel: "Concerts",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000&q=85",
    location: "Lalitpur",
  },
  {
    id: "p11",
    title: "Golden Hour Portraits",
    category: "weddings",
    categoryLabel: "Weddings",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=85",
    location: "Chitwan",
  },
  {
    id: "p12",
    title: "Wedding Reception",
    category: "events",
    categoryLabel: "Events",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=85",
    location: "Kathmandu",
  },
];

export interface FallbackFilmItem {
  id: string;
  title: string;
  category: string;
  thumb: string;
  duration: string;
  videoUrl: string;
}

export const defaultFilms: FallbackFilmItem[] = [
  {
    id: "f1",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85",
    category: "Wedding Film",
    title: "Priya & Aarav — A Kathmandu Love Story",
    duration: "4:32",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "f2",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85",
    category: "Cinematic Reel",
    title: "Mountains & Moments — Nepal Highlands",
    duration: "3:18",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "f3",
    thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=85",
    category: "Event Aftermovie",
    title: "The Grand Gala 2024",
    duration: "6:05",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "f4",
    thumb: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1000&q=85",
    category: "Concert Film",
    title: "Midnight Crescendo — Live at Malla Hotel",
    duration: "5:47",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "f5",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=85",
    category: "Wedding Film",
    title: "Sita & Rohan — A Pokhara Dream",
    duration: "7:22",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "f6",
    thumb: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85",
    category: "Commercial",
    title: "Luxury Brand Campaign 2024",
    duration: "1:30",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
];

export interface FallbackServiceItem {
  id: string;
  num: string;
  name: string;
  desc: string;
  icon: string;
}

export const defaultServices: FallbackServiceItem[] = [
  {
    id: "s1",
    num: "001",
    name: "Wedding Photography",
    desc: "Timeless luxury wedding coverage capturing every intimate emotion and golden detail of your sacred day.",
    icon: "camera",
  },
  {
    id: "s2",
    num: "002",
    name: "Cinematic Videography",
    desc: "Cinematic wedding films crafted like Hollywood productions — emotional, gripping, and eternally beautiful.",
    icon: "film",
  },
  {
    id: "s3",
    num: "003",
    name: "Drone Coverage",
    desc: "Breathtaking aerial perspectives that reveal the grandeur of your venue and the scale of your celebration.",
    icon: "compass",
  },
  {
    id: "s4",
    num: "004",
    name: "Event Coverage",
    desc: "Comprehensive documentation of corporate galas, cultural celebrations, and milestone anniversaries.",
    icon: "party",
  },
  {
    id: "s5",
    num: "005",
    name: "Concert Photography",
    desc: "High-energy concert and music event photography that captures the raw power of live performances.",
    icon: "music",
  },
  {
    id: "s6",
    num: "006",
    name: "Music Video Production",
    desc: "Professional music video production from concept to screen — artistic, cinematic, and deeply impactful.",
    icon: "video",
  },
  {
    id: "s7",
    num: "007",
    name: "Digital Marketing",
    desc: "Strategic digital campaigns that elevate your brand presence across all major platforms and markets.",
    icon: "smartphone",
  },
  {
    id: "s8",
    num: "008",
    name: "Social Media Branding",
    desc: "Premium social media content creation and management that builds an authentic, luxury brand identity.",
    icon: "sparkles",
  },
  {
    id: "s9",
    num: "009",
    name: "Commercial Advertisement",
    desc: "Compelling commercial ad production for brands seeking to communicate quality and drive lasting results.",
    icon: "tv",
  },
  {
    id: "s10",
    num: "010",
    name: "Creative Direction",
    desc: "Full-spectrum creative direction and visual storytelling strategy for discerning brands and individuals.",
    icon: "lightbulb",
  },
];

export interface FallbackTestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export const defaultTestimonials: FallbackTestimonialItem[] = [
  {
    id: "t1",
    name: "Priya Maharjan",
    role: "Bride · Kathmandu",
    text: "The Golden Light Creations transformed our wedding into a cinematic masterpiece. Every frame was a painting. We still cry watching our wedding film — in the most beautiful way possible.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
  },
  {
    id: "t2",
    name: "Bikash Shrestha",
    role: "Groom · Pokhara",
    text: "From the very first consultation, we knew we were in extraordinary hands. The team's eye for detail and emotional intelligence is unmatched. Our photos are beyond anything we imagined.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "t3",
    name: "Suman KC",
    role: "Event Director · Lalitpur",
    text: "We hired them for our annual corporate gala and the results were stunning. Professional, punctual, and incredibly talented. The aftermovie they produced became our brand's most-viewed content.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    rating: 5,
  },
  {
    id: "t4",
    name: "Aarav Basnet",
    role: "Brand Manager · Kathmandu",
    text: "The commercial campaign they produced for us exceeded every expectation. The production quality rivals international studios — but with authentic Nepali heart. Truly world-class.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
    rating: 5,
  },
  {
    id: "t5",
    name: "Anisha Tamang",
    role: "Bride · Bhaktapur",
    text: "I wanted my wedding photos to look like they belonged in a luxury magazine. That is exactly what I got. Every single image is magazine-worthy. Absolute perfection.",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80",
    rating: 5,
  },
  {
    id: "t6",
    name: "Dipesh Gurung",
    role: "Music Artist · Kathmandu",
    text: "My music video was produced with Hollywood-level care and creativity. The team understood my artistic vision completely and elevated it beyond what I thought was possible.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
  },
];

export const defaultStudioSettings = {
  hero: {
    eyebrow: "Nepal's Finest Creative Studio",
    headlinePart1: "We Don't Just Shoot",
    headlinePart2: "We Create Emotions",
    subheadline:
      "Luxury Photography, Cinematic Films & Digital Branding Services in Nepal. Crafting timeless visual stories since 2019.",
  },
  marqueeItems: [
    { text: "Wedding Photography" },
    { text: "Cinematic Films" },
    { text: "Drone Coverage" },
    { text: "Concert Photography" },
    { text: "Fashion Shoots" },
    { text: "Commercial Ads" },
    { text: "Digital Marketing" },
    { text: "Social Branding" },
  ],
  stats: {
    projectsCount: 500,
    clientsCount: 300,
    socialReach: "20M+",
    yearsExperience: 5,
  },
  story: {
    headline: "Born From Golden Light",
    quote: "Every frame tells a timeless story.",
    paragraph1:
      "The Golden Light Creations was born in the heart of Nepal with a singular vision — to transform fleeting moments into eternal visual poetry. We are not just photographers and filmmakers; we are storytellers, artists, and dreamers who believe every love story, every brand, and every emotion deserves to be captured in its purest, most luminous form.",
    paragraph2:
      "From the misty mountains of Kathmandu to luxury resort ceremonies, we bring an international eye and a deeply Nepali soul to every project we undertake.",
  },
  contact: {
    phone: "+977 9810175322",
    whatsappNumber: "9779810175322",
    email: "info@thegoldenlightcreations.com",
    address: "Kathmandu, Nepal",
  },
  socialHandles: {
    instagram: "https://instagram.com/the_golden_creations",
    youtube: "https://youtube.com/@thegoldenlightcreations",
    tiktok: "https://tiktok.com/@thegoldencreations",
    facebook: "https://facebook.com/thegoldenlightcreations",
  },
};

export interface FallbackPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime?: string;
}

export const defaultPosts: FallbackPostItem[] = [
  {
    id: "post-1",
    title: "Mastering the Golden Hour: Creative Lighting Secrets Behind Our Signature Glow",
    slug: "mastering-the-golden-hour-cinematic-lighting-secrets",
    excerpt:
      "A director's breakdown on utilizing negative fill, natural diffusion, and warm low-angle rim lighting across Nepal's most breathtaking landscapes.",
    category: "Behind The Lens",
    date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85",
    readTime: "5 min read",
  },
  {
    id: "post-2",
    title: "Destination Pre-Wedding in the Himalayas: A Visual Guide to Mustang & Pokhara",
    slug: "destination-pre-wedding-shoots-himalayas-mustang-pokhara",
    excerpt:
      "Balancing ancient sacred rituals with modern editorial fashion aesthetics. Why authentic human emotion beats posed perfection every single time.",
    category: "Destination",
    date: "Aug 2026",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=85",
    readTime: "6 min read",
  },
  {
    id: "post-3",
    title: "The Art of Cinematography: Crafting 4K Film-Look Videos with Natural Light",
    slug: "art-of-cinematography-4k-film-look-natural-light",
    excerpt:
      "Navigating altitude, extreme winds, and harsh desert canyons while crafting an ethereal high-fashion pre-wedding visual film in Upper Mustang.",
    category: "Cinematography",
    date: "Jul 2026",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=85",
    readTime: "4 min read",
  },
];

export interface NavSubmenuItem {
  label: string;
  href: string;
  description?: string | null;
  badge?: string | null;
  id?: string | null;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string | null;
  id?: string | null;
  submenu?: NavSubmenuItem[] | null;
}

export interface StudioNavigation {
  navItems: NavItem[];
  ctaButton?: {
    label?: string | null;
    href?: string | null;
  } | null;
  enableSearch?: boolean | null;
  enableWhatsApp?: boolean | null;
  enableLocaleSwitcher?: boolean | null;
}

export const defaultNavigation: StudioNavigation = {
  navItems: [
    {
      label: "Portfolio",
      href: "/portfolio",
      submenu: [
        {
          label: "All Works",
          href: "/portfolio",
          description: "Curated collection of our finest visual masterpieces.",
        },
        {
          label: "Client Photo Albums",
          href: "/albums",
          description: "Private & public heirloom client wedding galleries.",
          badge: "Client",
        },
        {
          label: "Weddings & Rituals",
          href: "/portfolio?category=weddings",
          description: "Sacred ceremonies and royal celebrations across South Asia.",
          badge: "Featured",
        },
        {
          label: "Fashion & Editorial",
          href: "/portfolio?category=fashion",
          description: "Haute couture and high-concept lifestyle campaigns.",
        },
        {
          label: "Commercial & Brands",
          href: "/portfolio?category=commercial",
          description: "Impactful brand stories and corporate cinema.",
        },
        {
          label: "Concerts & Live",
          href: "/portfolio?category=concerts",
          description: "High-energy festival and live performance photography.",
        },
      ],
    },
    {
      label: "Films",
      href: "/films",
      submenu: [
        {
          label: "Cinematic Film Reels",
          href: "/films",
          description: "4K/8K anamorphic film showcase with bespoke scores.",
          badge: "4K",
        },
        {
          label: "Wedding Cinema",
          href: "/films?category=weddings",
          description: "Emotional heirloom love stories and teaser trailers.",
        },
        {
          label: "Commercial Brand Ads",
          href: "/films?category=commercial",
          description: "High-production brand adverts and campaign reels.",
        },
        {
          label: "Documentaries",
          href: "/films?category=documentaries",
          description: "Cultural heritage and high-altitude Himalayan stories.",
        },
      ],
    },
    {
      label: "Services",
      href: "/services",
      submenu: [
        {
          label: "All Services",
          href: "/services",
          description: "Full spectrum of production and branding capabilities.",
        },
        {
          label: "Wedding Photography",
          href: "/services",
          description: "Comprehensive multi-day wedding coverage.",
        },
        {
          label: "Cinematography & 4K Video",
          href: "/services",
          description: "Hollywood-grade video production with cinema rigs.",
        },
        {
          label: "Drone Aerial Cinematography",
          href: "/services",
          description: "Licensed high-altitude aerial perspectives.",
        },
        {
          label: "Digital Branding",
          href: "/services",
          description: "Social media creative strategy and content scaling.",
        },
      ],
    },
    {
      label: "Journal",
      href: "/posts",
      submenu: [
        {
          label: "Studio Stories",
          href: "/posts",
          description: "Behind the lens diaries and creative perspectives.",
        },
        {
          label: "Lighting Breakdown",
          href: "/posts/mastering-the-golden-hour-cinematic-lighting-secrets",
          description: "Secrets to our signature high-altitude golden glow.",
        },
        {
          label: "Himalayan Destination Guide",
          href: "/posts/destination-pre-wedding-shoots-himalayas-mustang-pokhara",
          description: "Mustang and Pokhara elopement photography guide.",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      submenu: [
        {
          label: "The Studio Story",
          href: "/about",
          description: "Our founding vision, philosophy, and artistic roots.",
        },
        {
          label: "Creative Production Process",
          href: "/#process",
          description: "The 4-step client journey from discovery to delivery.",
        },
        {
          label: "Studio Pillars",
          href: "/#pillars",
          description: "The 4 standards of cinematic and artistic excellence.",
        },
        {
          label: "Client Inquiries (FAQ)",
          href: "/#faq",
          description: "Answers to booking, gear, and delivery questions.",
        },
      ],
    },
  ],
  ctaButton: {
    label: "Book a Shoot",
    href: "/contact",
  },
  enableSearch: false,
  enableWhatsApp: false,
  enableLocaleSwitcher: true,
};
