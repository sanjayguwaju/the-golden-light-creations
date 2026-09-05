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
  slug: string;
  tagline?: string;
  heroImageUrl?: string;
  overview?: string;
  targetAudience?: string;
  confidentialityNotice?: string;
  deliverables?: { title: string; description: string; highlight?: string }[];
  processSteps?: { stepNumber: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

export const defaultServices: FallbackServiceItem[] = [
  {
    id: "s1",
    num: "001",
    name: "Wedding Photography",
    slug: "wedding-photography",
    tagline: "Timeless luxury wedding coverage capturing every sacred emotion and golden detail.",
    desc: "Timeless luxury wedding coverage capturing every intimate emotion and golden detail of your sacred day.",
    icon: "camera",
    heroImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85",
    overview: "Our flagship wedding photography service treats your union not as a standard photoshoot, but as an heirloom visual heritage. Utilizing prime cinema optics and natural amber lighting, we capture the unrepeatable poetry of your sacred day across Nepal's most majestic palace courtyards, temples, and luxury resorts.",
    targetAudience: "Luxury Destination Couples, Royal Newari & Vedic Weddings, Discerning Families",
    deliverables: [
      { title: "Full-Day Multi-Angle Coverage", description: "Two senior master photographers documenting bridal dressing, rituals, family portraits, and reception.", highlight: "Dual Masters" },
      { title: "Signature Fine-Art Album", description: "Handcrafted 14x11 heirloom leather-bound album with archival Fuji Crystal paper.", highlight: "Handmade" },
      { title: "Ultra-High Resolution RAW Masters", description: "Comprehensive online digital gallery with full-resolution downloads and print licensing.", highlight: "Archival" },
      { title: "Same-Day Teaser Gallery", description: "Curated 25-frame editorial teaser delivered within 24 hours for immediate family sharing.", highlight: "24h Delivery" },
    ],
    processSteps: [
      { stepNumber: "01", title: "Creative Consultation", description: "Deep dive into your wedding timeline, family traditions, and bespoke aesthetic preferences." },
      { stepNumber: "02", title: "Location Recce & Lighting Map", description: "Detailed venue inspection to choreograph golden hour timing and sacred Agni angles." },
      { stepNumber: "03", title: "Unobtrusive Sacred Capture", description: "Discreet documentary coverage that preserves the authentic emotional atmosphere." },
      { stepNumber: "04", title: "Bespoke Color Science & Master Delivery", description: "Individual hand-grading of every selected frame and luxury album binding." },
    ],
    faqs: [
      { question: "How far in advance should we book our wedding?", answer: "We recommend reserving your dates 6 to 12 months in advance, especially during the auspicious autumn and spring wedding seasons." },
      { question: "Do you travel across Nepal and internationally?", answer: "Yes. Our team frequently travels to Pokhara, Chitwan, Mustang, and international South Asian destination weddings." },
    ],
  },
  {
    id: "s2",
    num: "002",
    name: "Cinematic Videography",
    slug: "cinematic-videography",
    tagline: "Hollywood-grade cinematic films crafted with anamorphic glass and emotive sound design.",
    desc: "Cinematic wedding films crafted like Hollywood productions — emotional, gripping, and eternally beautiful.",
    icon: "film",
    heroImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    overview: "We produce 4K HDR cinema films that look and feel like motion pictures. Using custom anamorphic lenses, 32-bit float audio recorders, and custom film stock emulation, we craft gripping stories that bring you back to the exact heartbeat of your celebration.",
    targetAudience: "Couples who value cinema, art directors, high-end private celebrations",
    deliverables: [
      { title: "4K Cinematic Feature Film", description: "10 to 15 minute choreographed story film with original sound design and licensed music score.", highlight: "4K Master" },
      { title: "Cinematic 60-Sec Social Teaser", description: "Punchy, dynamic 4K trailer delivered within 48 hours for immediate social premiere.", highlight: "48h Delivery" },
      { title: "Full Ceremony Documentary Cut", description: "Complete multicam coverage of vows, speeches, and unedited cultural rituals.", highlight: "Multicam" },
      { title: "32-Bit Float Sound Capture", description: "Studio-grade wireless microphones recording distortion-free vows, laughter, and sacred chants.", highlight: "Pro Audio" },
    ],
  },
  {
    id: "s3",
    num: "003",
    name: "Drone Coverage",
    slug: "drone-coverage",
    tagline: "FAA & CAAN certified aerial cinema revealing the monumental scale of Nepal's landscapes.",
    desc: "Breathtaking aerial perspectives that reveal the grandeur of your venue and the scale of your celebration.",
    icon: "compass",
    heroImageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=85",
  },
  {
    id: "s4",
    num: "004",
    name: "Event Coverage",
    slug: "event-coverage",
    tagline: "Elite multi-camera coverage for high-profile galas, summits, and grand cultural festivals.",
    desc: "Comprehensive documentation of corporate galas, cultural celebrations, and milestone anniversaries.",
    icon: "party",
    heroImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=85",
  },
  {
    id: "s5",
    num: "005",
    name: "Concert Photography",
    slug: "concert-photography",
    tagline: "High-voltage live music and stadium concert visuals with electric stage presence.",
    desc: "High-energy concert and music event photography that captures the raw power of live performances.",
    icon: "music",
    heroImageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=85",
  },
  {
    id: "s6",
    num: "006",
    name: "Music Video Production",
    slug: "music-video-production",
    tagline: "Artistic music video creation from concept scripting to cinematic screen delivery.",
    desc: "Professional music video production from concept to screen — artistic, cinematic, and deeply impactful.",
    icon: "video",
    heroImageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85",
  },
  {
    id: "s7",
    num: "007",
    name: "Digital Marketing",
    slug: "digital-marketing",
    tagline: "Data-driven visual storytelling campaigns that build high-converting brand loyalty.",
    desc: "Strategic digital campaigns that elevate your brand presence across all major platforms and markets.",
    icon: "smartphone",
    heroImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
  },
  {
    id: "s8",
    num: "008",
    name: "Mayors & Civic Leadership Media",
    slug: "mayors-civic-leadership",
    tagline: "Cinema-grade public address, campaign documentaries, and official media for city mayors and civic leaders.",
    desc: "State-level media production for city mayors, municipal leaders, and civic campaigns with same-day press turnarounds.",
    icon: "award",
    heroImageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1600&q=85",
    overview: "In modern civic governance, authentic visual communication bridges the gap between visionary leaders and their citizens. The Golden Light Creations provides cinema-grade media production specifically tailored for City Mayors, Municipal Authorities, Ministry Dignitaries, and Public Governance Campaigns across Nepal. From historic policy keynote addresses and infrastructure unveils to citizen engagement micro-documentaries, we deliver authoritative, inspiring imagery with military precision and strict protocol adherence.",
    targetAudience: "City Mayors, Municipal Corporations, Civic Leaders, State Dignitaries, Election Campaigns",
    confidentialityNotice: "Strict Confidentiality, Official Protocol Adherence & Vetted Production Crew",
    deliverables: [
      { title: "Keynote & Policy Address Cinema Coverage", description: "Multi-cam 4K broadcast capture with teleprompter integration, balanced studio lighting, and studio-grade audio.", highlight: "Broadcast 4K" },
      { title: "Infrastructure & Development Documentaries", description: "Cinematic drone fly-throughs, before-and-after time lapses, and documentary narratives showcasing public milestone delivery.", highlight: "4K Aerial" },
      { title: "Citizen Outreach Social Reels", description: "Fast-turnaround vertical reels (9:16) with burnt-in bilingual subtitles (Nepali/English) optimized for viral social engagement.", highlight: "Same-Day" },
      { title: "Press Release & Official Portrait Pack", description: "Color-calibrated, publication-ready high-resolution portraits delivered within 3 hours for national press and news wires.", highlight: "3-Hour Press Pack" },
      { title: "Town Hall & Public Rally Media Support", description: "Comprehensive crowd documentation and live broadcast feeds engineered for municipal social channels and LED displays.", highlight: "Live Multi-Cam" },
      { title: "Archival Government Vault Storage", description: "Dual-redundant LTO cold backup of all uncompressed footage for permanent historical and municipal archives.", highlight: "Cold Archival" },
    ],
    processSteps: [
      { stepNumber: "01", title: "Protocol Briefing & Security Clearance", description: "Direct coordination with the Mayor's communications team to align on agenda, security clearance, and media distribution windows." },
      { stepNumber: "02", title: "Rapid Multi-Camera Deployment", description: "Discreet setup of cinema bodies, wireless audio, and stabilized gimbals with zero disruption to official ceremonies." },
      { stepNumber: "03", title: "Same-Day Press & Social Turnaround", description: "Immediate field-editing suite generating press-ready stills and polished social clips within hours of the event." },
      { stepNumber: "04", title: "Master Archival & Long-Form Delivery", description: "Color-graded 4K master documentary cut delivered with comprehensive metadata for municipal records." },
    ],
    faqs: [
      { question: "Can your team accommodate last-minute official municipal events?", answer: "Yes. We maintain an agile rapid-response crew in Kathmandu and Bagmati Province equipped for short-notice ministerial and mayoral assignments." },
      { question: "How are confidential policy announcements or embargoed materials handled?", answer: "All production members sign strict Non-Disclosure Agreements (NDAs). Footage is encrypted with hardware-level security until official public release." },
      { question: "Do you provide bilingual captions and subtitles for civic reels?", answer: "Yes, our post-production team specializes in both Nepali and English typography, subtitles, and localized graphics." },
    ],
  },
  {
    id: "s9",
    num: "009",
    name: "Celebrity & VIP Editorial Shoots",
    slug: "celebrity-vip-shoots",
    tagline: "Confidential editorial portraiture, red carpet cinema, and private portfolio production for high-profile public figures.",
    desc: "Ultra-private, high-security visual production for actors, musicians, cultural icons, and visiting international dignitaries.",
    icon: "star",
    heroImageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85",
    overview: "For celebrities, prominent public figures, and cultural icons, imagery is legacy. We offer private, high-security photo and cinema sessions conducted under strict Non-Disclosure Agreements. Whether shooting an international magazine cover in Kathmandu's heritage courtyards, documenting a private luxury retreat, or producing a high-energy red carpet film, our studio ensures total discretion, impeccable styling, and Hollywood-level aesthetics.",
    targetAudience: "Actors, A-List Musicians, Public Figures, Visiting International VIPs, Cultural Icons",
    confidentialityNotice: "Full Non-Disclosure Agreement (NDA) & Private Studio Lockdown Guaranteed",
    deliverables: [
      { title: "High-Fashion Editorial Cover Sessions", description: "Bespoke studio or exclusive on-location portraiture with master gaffer lighting, hair/makeup coordination, and high-fashion retouching.", highlight: "Cover Grade" },
      { title: "Private Red Carpet & Premiere Cinema", description: "Stabilized cinema gimbal tracking, slow-motion glamour reels, and arrival documentation for film premieres and VIP galas.", highlight: "4K 120fps" },
      { title: "Confidential Portfolio & Lookbook", description: "Curated high-res lookbooks for international agency representation, modeling agencies, and brand endorsements.", highlight: "Agency Grade" },
      { title: "Cinematic BTS & Personal Brand Reels", description: "Intimate, tastefully graded behind-the-scenes video reels showing the artistry and depth of the public figure.", highlight: "Viral 9:16" },
      { title: "Hardware-Encrypted Asset Delivery", description: "Private biometric download links with zero public portfolio sharing unless explicitly authorized by the client's management team.", highlight: "Encrypted Cloud" },
    ],
    processSteps: [
      { stepNumber: "01", title: "Management Consultation & NDA Execution", description: "Private coordination with the celebrity's agent or PR team; mutual NDA signed prior to any creative sharing." },
      { stepNumber: "02", title: "Moodboard & Wardrobe Choreography", description: "Detailed lookbook preparation aligning lighting, high-fashion styling, and location security." },
      { stepNumber: "03", title: "Closed-Set Production", description: "Strict closed-set policy with only essential creative personnel permitted; private green room and security protocol." },
      { stepNumber: "04", title: "PR-Approved Color Grading & Release", description: "Iterative retouching review directly with the talent's management before synchronized media rollout." },
    ],
    faqs: [
      { question: "Is our identity and project guaranteed to remain confidential?", answer: "Absolutely. We routinely handle projects under strict NDAs. No footage or images are published or used for promotion without explicit written management approval." },
      { question: "Can sessions be conducted at private residences or remote luxury resorts?", answer: "Yes. Our mobile cinema and lighting packages are engineered for seamless deployment to luxury villas, private mountain lodges, and remote estates." },
    ],
  },
  {
    id: "s10",
    num: "010",
    name: "Executive & Public Figure Branding",
    slug: "executive-public-branding",
    tagline: "Authoritative visual identity and thought leadership cinema for corporate CEOs, diplomats, and founders.",
    desc: "High-impact executive portraits and thought-leadership documentary films for CEOs, founders, and diplomats.",
    icon: "lightbulb",
    heroImageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85",
    overview: "Leadership today requires visual gravitas. We craft commanding executive portraiture, corporate documentary profiles, and thought-leadership video series for corporate CEOs, international diplomats, venture founders, and industry trailblazers. Our productions convey confidence, vision, and timeless elegance across global investor decks, annual reports, Forbes-tier editorial features, and prestigious summits.",
    targetAudience: "Corporate CEOs, Diplomats, Venture Capitalists, Tech Founders, Keynote Speakers",
    confidentialityNotice: "Executive Confidentiality & Fast Executive Turnaround",
    deliverables: [
      { title: "Master Executive Portrait Series", description: "Commanding environmental and studio portraits designed for annual reports, investor briefs, and keynote brochures.", highlight: "Forbes Grade" },
      { title: "Thought-Leadership Mini-Documentary", description: "3 to 5 minute cinematic interview weaving the executive's philosophy with high-production b-roll of headquarters and operations.", highlight: "4K Master" },
      { title: "LinkedIn & Social Authority Media Pack", description: "Optimized multi-ratio visual assets formatted specifically for executive profiles and executive op-eds.", highlight: "Multi-Format" },
      { title: "Summit & Keynote Stage Visuals", description: "Ultra-crisp stage photography and high-definition speech recaps for international conferences and global summits.", highlight: "Stage Capture" },
    ],
    processSteps: [
      { stepNumber: "01", title: "Executive Brand Assessment", description: "Aligning on the leader's core message, corporate brand identity, and target stakeholder audience." },
      { stepNumber: "02", title: "Time-Efficient Executive Session", description: "Respecting tight calendars with streamlined 60 to 90 minute sessions engineered for maximum creative output." },
      { stepNumber: "03", title: "Precision Retouching & Grading", description: "Subtle, natural skin tone preservation that radiates leadership and approachability." },
      { stepNumber: "04", title: "Multi-Channel Asset Package Delivery", description: "Ready-to-deploy assets tailored for web, print publications, investor pitches, and press kits." },
    ],
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

export interface FallbackTeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  specialties: string[];
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    email?: string;
  };
  featured?: boolean;
  order?: number;
}

export const defaultTeamMembers: FallbackTeamMember[] = [
  {
    id: "tm1",
    name: "Sanjay Guwaju",
    role: "Founder & Creative Director",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
    bio: "Visionary filmmaker and master visual storyteller with over a decade of experience crafting royal destination weddings, high-fashion editorials, and iconic brand campaigns across Nepal and beyond.",
    specialties: ["Creative Direction", "Anamorphic Cinema", "Lighting Design", "Visual Poetry"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sanjayguwaju",
      instagram: "https://instagram.com/thegoldenlightcreations",
      twitter: "https://x.com/thegoldenlightc",
      facebook: "https://facebook.com/thegoldenlightcreations",
      email: "sanjay@thegoldenlightcreations.com",
    },
    featured: true,
    order: 1,
  },
  {
    id: "tm2",
    name: "Aarav Shrestha",
    role: "Lead Cinematographer & Drone Pilot",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85",
    bio: "CAAN-certified aerial cinema specialist and Director of Photography renowned for capturing high-altitude Himalayan elopements and dynamic cinematic camera movement.",
    specialties: ["Aerial Cinema", "Steadicam Rigging", "Himalayan Expeditions", "Slow Motion 4K"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/aarav-shrestha-cinematography",
      instagram: "https://instagram.com/aarav.films",
      twitter: "https://x.com/aarav_cinemas",
      email: "aarav@thegoldenlightcreations.com",
    },
    featured: true,
    order: 2,
  },
  {
    id: "tm3",
    name: "Prashant Maharjan",
    role: "Principal Portrait Artist & Lighting Master",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85",
    bio: "Obsessed with natural golden-hour luminescence and authentic human emotion, crafting editorial bridal portraits and luxury editorial spreads that look effortlessly painted with light.",
    specialties: ["Bridal Editorial", "Fine-Art Lighting", "Medium Format", "Posing Direction"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/prashant-maharjan-portraits",
      instagram: "https://instagram.com/prashant.light",
      twitter: "https://x.com/prashant_studio",
      email: "prashant@thegoldenlightcreations.com",
    },
    featured: true,
    order: 3,
  },
  {
    id: "tm4",
    name: "Shristi Thapa",
    role: "Senior Art Director & VIP Producer",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85",
    bio: "Leading concept art direction, wardrobe coordination, and VIP client hospitality for luxury editorial campaigns, high-profile celebrity shoots, and civic leader profiles.",
    specialties: ["Art Direction", "VIP Management", "Wardrobe Styling", "Campaign Production"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/shristi-thapa-producer",
      instagram: "https://instagram.com/shristi.creates",
      twitter: "https://x.com/shristi_prod",
      email: "shristi@thegoldenlightcreations.com",
    },
    featured: true,
    order: 4,
  },
  {
    id: "tm5",
    name: "Rohan Joshi",
    role: "Head of Post-Production & Colorist",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=85",
    bio: "Color scientist and post-production supervisor preserving the signature warm-gold and rich-crimson tones across all studio deliveries with surgical precision.",
    specialties: ["DaVinci Resolve Studio", "Film Emulation", "Master Sound Design", "HDR Delivery"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/rohan-joshi-colorist",
      instagram: "https://instagram.com/rohan.color",
      twitter: "https://x.com/rohan_grade",
      email: "rohan@thegoldenlightcreations.com",
    },
    featured: true,
    order: 5,
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
