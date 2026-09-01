"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import {
  ChevronRight,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Droplets,
  Layers,
  Wrench,
  Hammer,
  Shield,
  ArrowRight,
  Clock,
  Star,
  RefreshCw,
  Info,
  Check,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utilities/ui";
import { gsap } from "gsap";

// Static curated guides data
const staticGuides = [
  {
    id: "guide-1",
    slug: "prep-walls-pro",
    title: "How to Prep Your Walls Like a Pro",
    category: "prep",
    categoryLabel: "Prep Work",
    difficulty: "Beginner",
    readTime: "5 mins",
    summary: "Prep work is 80% of any paint job. Learn the secrets of sanding, cleaning, and repairing walls before painting.",
    steps: [
      "Clear the room: Move furniture and mask fixtures.",
      "Clean the walls with mild soapy water to remove grease.",
      "Fill holes or cracks using Reliance Acrylic Wall Putty.",
      "Sand the patched areas smooth once dry using 120-grit sandpaper.",
      "Wipe away all sanding dust with a damp sponge.",
      "Apply a high-quality primer like Reliance PrimeShield to seal the surface."
    ],
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "guide-2",
    slug: "master-cut-in",
    title: "Mastering the Cut-In Technique",
    category: "techniques",
    categoryLabel: "Pro Techniques",
    difficulty: "Intermediate",
    readTime: "4 mins",
    summary: "Learn how to paint clean, razor-sharp edges along ceilings, baseboards, and corners without using painter's tape.",
    steps: [
      "Hold your paint brush like a pencil close to the metal ferrule.",
      "Dip the brush 1-2 inches into the paint, tapping off the excess.",
      "Draw the brush along the edge in a long, steady stroke.",
      "Keep a wet edge and feather out the paint to avoid thick ridges.",
      "Use an angled sash brush for optimal line control."
    ],
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "guide-3",
    slug: "choose-paint-sheen",
    title: "Choosing the Right Paint Sheen",
    category: "color",
    categoryLabel: "Color Harmony",
    difficulty: "Beginner",
    readTime: "6 mins",
    summary: "From flat matte to high gloss, understand how different sheens affect color depth, light reflection, and washability.",
    steps: [
      "Matte/Flat: Hides surface flaws, perfect for low-traffic ceilings.",
      "Eggshell/Satin: Soft glow, easy to clean, great for living rooms and bedrooms.",
      "Semi-Gloss: Refined shine, moisture-resistant, ideal for trim and doors.",
      "Gloss: Extremely durable, high reflection, perfect for high-touch metal/wood."
    ],
    image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "guide-4",
    slug: "eco-friendly-painting",
    title: "Eco-Friendly Painting Practices",
    category: "eco",
    categoryLabel: "Eco-Friendly",
    difficulty: "Beginner",
    readTime: "3 mins",
    summary: "How to paint sustainably using low-VOC Reliance EcoGuard paints, reduce waste, and safely dispose of excess materials.",
    steps: [
      "Select certified low-VOC or zero-VOC paints to protect indoor air quality.",
      "Calculate your paint needs accurately to prevent buying excess paint.",
      "Store leftovers in a cool place with the lid tightly sealed and upside down.",
      "Never pour paint down the drain; let it dry out or donate it to local community projects."
    ],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "guide-5",
    slug: "painting-exterior-masonry",
    title: "Painting Exterior Concrete Walls",
    category: "techniques",
    categoryLabel: "Pro Techniques",
    difficulty: "Advanced",
    readTime: "7 mins",
    summary: "Protect your exterior masonry from harsh sunlight and heavy monsoon rains using specialized primers and weatherproofing paint.",
    steps: [
      "Power wash the exterior to remove dirt, algae, and loose flaking paint.",
      "Inspect for hairline cracks and patch them with exterior grade sealant.",
      "Apply a coat of Reliance DampShield sealer to prevent rising dampness.",
      "Finish with two coats of Reliance WeatherMax exterior emulsion for UV protection."
    ],
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "guide-6",
    slug: "accent-wall-guide",
    title: "Creating a Stunning Accent Wall",
    category: "color",
    categoryLabel: "Color Harmony",
    difficulty: "Intermediate",
    readTime: "5 mins",
    summary: "Add depth and personality to any room. Learn how to select the right wall, choose a contrasting shade, and execute the design.",
    steps: [
      "Choose the focal wall (usually the wall behind the bed or TV console).",
      "Pick a bold color that complements the room's neutral tones.",
      "Apply painter's tape cleanly along the adjacent walls.",
      "Apply two coats of premium paint like Reliance Silk Emulsion for a rich velvety finish."
    ],
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=600&auto=format&fit=crop"
  }
];

// Troubleshooter data
const troubleshooterIssues = [
  {
    id: "peeling",
    title: "Peeling & Flaking Paint",
    symptom: "Paint curling away, cracking, and falling off in scales or sheets.",
    severity: "High",
    severityColor: "text-reliance-red bg-reliance-red/10 border-reliance-red/20",
    icon: AlertTriangle,
    causes: "Moisture trapped beneath the paint film, painting over dirty/dusty walls, or using low-quality paint that loses adhesion.",
    remedy: [
      "Scrape away all loose, peeling paint with a putty knife.",
      "Wash the area with detergent and water, then let it dry completely.",
      "Fill holes/divots with Reliance Acrylic Wall Putty.",
      "Apply a high-adhesion undercoat like Reliance PrimeShield.",
      "Apply 2 coats of Reliance Premium Emulsion paint."
    ],
    recommendedProduct: "Reliance PrimeShield Primer & Reliance Wall Putty"
  },
  {
    id: "mould",
    title: "Mould & Mildew Ingress",
    symptom: "Black, grey, or green spots appearing on damp walls, especially in bathrooms or kitchens.",
    severity: "Medium",
    severityColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    icon: Droplets,
    causes: "High humidity, poor ventilation, and moisture leakage combined with standard paints that lack anti-fungal properties.",
    remedy: [
      "Wash the surface with a bleach-water solution (1:3 ratio) or professional mould remover.",
      "Scrub the mould away and rinse with clean water. Let dry.",
      "Ensure any water leaks or ventilation issues are repaired.",
      "Apply Reliance DampShield sealer to lock out moisture.",
      "Paint with anti-bacterial Reliance HealthGuard paint."
    ],
    recommendedProduct: "Reliance DampShield Waterproof Sealer & HealthGuard Acrylic Emulsion"
  },
  {
    id: "cracks",
    title: "Hairline Plaster Cracks",
    symptom: "Fine, spiderweb-like cracks on the plaster surface.",
    severity: "Low",
    severityColor: "text-reliance-gold bg-reliance-gold/10 border-reliance-gold/20",
    icon: Layers,
    causes: "Natural house settling, temperature fluctuations, or plaster shrinkage due to quick drying during initial application.",
    remedy: [
      "Use a wire brush or scraper to widen the crack slightly to form a V-groove.",
      "Brush out any dust or loose debris.",
      "Apply Reliance Acrylic Wall Putty into the crack using a putty knife.",
      "Once cured, sand smooth and apply a primer before painting."
    ],
    recommendedProduct: "Reliance Acrylic Wall Putty & PrimeShield Primer"
  },
  {
    id: "blistering",
    title: "Paint Blistering (Bubbling)",
    symptom: "Bubbles or raised paint pockets forming on drywall or wood siding.",
    severity: "Medium",
    severityColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    icon: HelpCircle,
    causes: "Painting in direct, hot sunlight (trapping solvent vapor), or moisture rising through the substrate from the inside.",
    remedy: [
      "Pop and scrape the blisters to expose the bare wall or wood.",
      "Sand the edges smooth to feather the patch.",
      "Identify and fix the moisture leak if applicable.",
      "Apply an oil-based or acrylic primer before top-coating during cooler hours."
    ],
    recommendedProduct: "Reliance DampShield Sealer & WeatherMax Exterior Paint"
  },
  {
    id: "chalking",
    title: "Chalking / Powdering",
    symptom: "A fine, powdery residue rubs off on your fingers when touching the wall.",
    severity: "Low",
    severityColor: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    icon: Sparkles,
    causes: "Normal weathering of the paint binder due to UV rays, or using interior paint on exterior surfaces.",
    remedy: [
      "Power wash the wall or use a stiff bristle brush to scrub away the chalky powder.",
      "Allow the surface to dry completely.",
      "Apply a high-performance penetrating binder primer to lock down any remaining chalk.",
      "Top-coat with premium exterior paint with high UV resistance."
    ],
    recommendedProduct: "Reliance WeatherMax Silk Exterior Emulsion"
  }
];

// Project planner steps
const projectChecklists: Record<string, string[]> = {
  interior: [
    "Clear the room: Move furniture to the center and cover with plastic sheets.",
    "Clean walls: Wipe away dust, dirt, and grease using a damp cloth.",
    "Tape edges: Mask baseboards, door frames, and ceilings with painter's tape.",
    "Repair walls: Fill cracks or holes with Reliance Wall Putty and sand flat.",
    "Prime: Apply one coat of Reliance PrimeShield to ensure uniform absorption.",
    "Paint edges: 'Cut-in' corners and borders with a synthetic brush.",
    "Roll walls: Paint the main areas in a W or V pattern with a roller.",
    "Second coat: Wait 4 hours, then apply a second coat for even color coverage.",
    "Clean up: Remove painter's tape while paint is damp; clean brushes immediately."
  ],
  exterior: [
    "Power wash: Clean dirt, algae, and mold off the exterior walls.",
    "Scrape and sand: Remove loose or flaking paint from previous layers.",
    "Repair cracks: Seal structural cracks using exterior filler or cement mortar.",
    "Prime: Seal the porous walls with a coat of Reliance DampShield.",
    "Paint trims: Paint window frames, fascia boards, and trim edges first.",
    "First coat: Roll or spray Reliance WeatherMax on the main exterior walls.",
    "Second coat: Apply a second weatherproofing layer after 6 hours.",
    "Inspect: Check for missed spots and check weatherproofing seals."
  ],
  wood: [
    "Remove hardware: Take off handles, hinges, and locks.",
    "Sand wood: Sand with medium grit sand paper along the wood grain.",
    "Wipe clean: Remove sanding dust with a tack cloth.",
    "Wood priming: Apply Reliance Wood Primer to seal the grain.",
    "Sand lightly: Sand with fine grit paper to smooth wood fibers.",
    "Paint first coat: Apply enamel paint using a natural bristle brush.",
    "Final coat: Apply a second coat of Gloss enamel for a durable finish."
  ],
  metal: [
    "De-rust: Use a wire brush or sandpaper to scrape away any rust spots.",
    "Clean surface: Wipe down metal with mineral spirits to remove grease and dust.",
    "Rust Priming: Paint with a rust-inhibitive metal primer immediately.",
    "Paint first coat: Apply Reliance Gloss Enamel using a small brush.",
    "Paint second coat: Apply second layer after 12-24 hours for full rust protection."
  ]
};

// Tool suggestions mapping
const surfaceTools: Record<
  string,
  { brush: string; roller: string; tape: string; undercoat: string }
> = {
  drywall: {
    brush: "Synthetic angular brush (2-inch or 2.5-inch) for cutting in.",
    roller: "Short pile roller (3/8 inch or 9mm pile) for a smooth finish.",
    tape: "Medium-tack blue painter's tape.",
    undercoat: "Reliance PrimeShield Acrylic Primer."
  },
  masonry: {
    brush: "Stiff synthetic brush.",
    roller: "Long pile roller (3/4 inch or 20mm pile) to get into cracks.",
    tape: "High-tack painter's tape.",
    undercoat: "Reliance DampShield Waterproof Sealer."
  },
  wood: {
    brush: "Natural bristle brush for oil-based paint, or high-density foam brush.",
    roller: "Foam roller or short pile mohair roller.",
    tape: "Delicate surface painter's tape.",
    undercoat: "Reliance Wood & Metal Primer."
  },
  metal: {
    brush: "Natural bristle brush for enamel, or round detail brush.",
    roller: "Mini-foam roller.",
    tape: "Standard painter's tape.",
    undercoat: "Reliance Anti-Rust Zinc Chromate Primer."
  }
};

interface PaintingTipsClientProps {
  locale: string;
  initialPosts?: any[];
}

export default function PageClient({ locale, initialPosts = [] }: PaintingTipsClientProps) {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  // Troubleshooter state
  const [selectedIssueId, setSelectedIssueId] = useState("peeling");
  const activeIssue = troubleshooterIssues.find((issue) => issue.id === selectedIssueId) || troubleshooterIssues[0];

  // Project Planner state
  const [selectedProject, setSelectedProject] = useState("interior");
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  // Tool Estimator state
  const [selectedSurface, setSelectedSurface] = useState("drywall");

  // Animations ref
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Trigger GSAP entry animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    });
    return () => ctx.revert();
  }, []);

  // Set up project checklist steps toggled state when project changes
  useEffect(() => {
    const initialChecked: Record<string, boolean> = {};
    const steps = projectChecklists[selectedProject] || [];
    steps.forEach((_, idx) => {
      initialChecked[`${selectedProject}-${idx}`] = false;
    });
    setCheckedSteps(initialChecked);
  }, [selectedProject]);

  // Handle step checkbox toggle
  const toggleStep = (index: number) => {
    const key = `${selectedProject}-${index}`;
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate project progress
  const currentSteps = projectChecklists[selectedProject] || [];
  const completedCount = currentSteps.filter((_, idx) => checkedSteps[`${selectedProject}-${idx}`]).length;
  const progressPercent = currentSteps.length > 0 ? Math.round((completedCount / currentSteps.length) * 100) : 0;

  // Reset current checklist
  const resetChecklist = () => {
    const resetChecked: Record<string, boolean> = {};
    currentSteps.forEach((_, idx) => {
      resetChecked[`${selectedProject}-${idx}`] = false;
    });
    setCheckedSteps(resetChecked);
  };

  // Filter static guides based on search and category
  const filteredGuides = staticGuides.filter((guide) => {
    const matchesCategory = activeCategory === "all" || guide.category === activeCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.steps.some((step) => step.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-page-bg font-sans selection:bg-reliance-gold selection:text-reliance-navy">
      {/* ── HERO BANNER ── */}
      <section ref={heroRef} className="relative bg-reliance-navy pt-12 pb-24 md:pb-28 overflow-hidden text-reliance-white">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-reliance-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-125 h-125 bg-reliance-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-reliance-white/60 text-sm mb-8 animate-fade-up">
            <Link href="/" className="hover:text-reliance-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-reliance-white">Painting Tips & DIY Guides</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-reliance-gold/10 rounded-none border border-reliance-gold/30 px-4 py-1.5 text-reliance-gold text-sm mb-6 uppercase tracking-widest font-bold animate-fade-up">
              <Sparkles className="w-4 h-4" />
              <span>DIY Masterclass</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-heading leading-tight animate-fade-up">
              Paint Like a Professional
            </h1>
            <p className="text-reliance-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-8 animate-fade-up">
              Transform your spaces with confidence. Explore our smart estimators, interactive troubleshooters, and step-by-step guides developed by Reliance Paints experts.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up">
              <Button
                onClick={() => {
                  document.getElementById("guides-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-reliance-gold hover:bg-white text-reliance-navy font-bold rounded-none px-6 py-6 transition-all duration-300 shadow-lg cursor-pointer"
              >
                Browse Guides
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  document.getElementById("paint-doctor")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-none px-6 py-6 transition-all cursor-pointer"
              >
                Diagnose Wall Issues
                <Droplets className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS / ADVANTAGES ── */}
      <section className="container -translate-y-12 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-gray-200/50 shadow-2xl p-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-reliance-navy/5 flex items-center justify-center text-reliance-navy shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-reliance-navy text-lg mb-1">DIY Checklists</h3>
              <p className="text-reliance-grey text-sm">Interactive action plans for room prep, exterior, wood, and metal.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 md:border-l md:border-gray-100 md:pl-6">
            <div className="w-12 h-12 bg-reliance-navy/5 flex items-center justify-center text-reliance-navy shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-reliance-navy text-lg mb-1">Paint Troubleshooter</h3>
              <p className="text-reliance-grey text-sm">Diagnose peeling, cracking, mould and immediately find cures.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 md:border-l md:border-gray-100 md:pl-6">
            <div className="w-12 h-12 bg-reliance-navy/5 flex items-center justify-center text-reliance-navy shrink-0">
              <Hammer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-reliance-navy text-lg mb-1">Smart Tool Selector</h3>
              <p className="text-reliance-grey text-sm">Select surface types to find the ideal brushes, rollers, and primers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TOOLS AREA: CHECKLIST & ESTIMATOR ── */}
      <section className="container max-w-6xl py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-reliance-navy font-heading mb-4">
            Interactive Painting Planners
          </h2>
          <p className="text-reliance-grey max-w-xl mx-auto text-base">
            Take the guesswork out of paint preparation. Track your progress live and estimate your tool requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project Checklist Planner (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200/50 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-reliance-gold/15 flex items-center justify-center text-reliance-gold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-reliance-navy text-xl">Project Step Tracker</h3>
                    <p className="text-xs text-reliance-grey">Check off steps as you complete them</p>
                  </div>
                </div>

                <button
                  onClick={resetChecklist}
                  className="flex items-center gap-1.5 text-xs font-semibold text-reliance-navy hover:text-reliance-gold transition-colors border border-gray-200 px-2.5 py-1.5 cursor-pointer"
                  title="Reset checklist"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* Project Type Selection Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {[
                  { id: "interior", label: "Interior" },
                  { id: "exterior", label: "Exterior" },
                  { id: "wood", label: "Wood Paint" },
                  { id: "metal", label: "Metal Polish" }
                ].map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(proj.id)}
                    className={cn(
                      "py-2.5 px-3 text-xs font-bold transition-all border text-center cursor-pointer",
                      selectedProject === proj.id
                        ? "bg-reliance-navy text-white border-reliance-navy shadow-md"
                        : "bg-reliance-offwhite/50 text-reliance-navy border-gray-200 hover:bg-reliance-offwhite"
                    )}
                  >
                    {proj.label}
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="bg-reliance-offwhite/50 border border-gray-200/50 p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-reliance-navy">Project Completion</span>
                  <span className="text-sm font-bold text-reliance-gold">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2.5 bg-gray-200" />
              </div>

              {/* Steps List */}
              <div className="space-y-3 max-h-75 overflow-y-auto pr-2 scrollbar-thin">
                {currentSteps.map((step, idx) => {
                  const stepKey = `${selectedProject}-${idx}`;
                  const isChecked = checkedSteps[stepKey] || false;

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={cn(
                        "flex items-start gap-3 p-3.5 border transition-all cursor-pointer select-none",
                        isChecked
                          ? "bg-reliance-gold/5 border-reliance-gold/30 opacity-80"
                          : "bg-white border-gray-200 hover:border-reliance-navy"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 border shrink-0 flex items-center justify-center transition-all",
                          isChecked
                            ? "bg-reliance-gold border-reliance-gold text-reliance-navy"
                            : "border-gray-300 bg-white"
                        )}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <span className={cn("text-sm text-reliance-navy leading-snug", isChecked && "line-through text-reliance-grey")}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {progressPercent === 100 && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-sm flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold">Fantastic job!</span> You have completed all steps for your {selectedProject} painting project. Ready to pick colors?
                </div>
              </div>
            )}
          </div>

          {/* Smart Tool Selector (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-reliance-navy border border-white/10 p-6 sm:p-8 text-reliance-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-reliance-gold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Tool & Paint Selector</h3>
                  <p className="text-xs text-reliance-white/50">Determine essential tools dynamically</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-reliance-gold uppercase tracking-wider mb-2">
                  Select Surface Type
                </label>
                <select
                  value={selectedSurface}
                  onChange={(e) => setSelectedSurface(e.target.value)}
                  className="w-full bg-[#162032] border border-white/20 text-white rounded-none p-3.5 text-sm outline-none focus:border-reliance-gold transition-colors"
                >
                  <option value="drywall">Smooth Drywall / Plastered Walls</option>
                  <option value="masonry">Rough Concrete / Textured Masonry</option>
                  <option value="wood">Raw Wood / Furniture / Doors</option>
                  <option value="metal">Metal Railings / Grills / Gates</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-reliance-gold pl-4 py-1">
                  <span className="block text-xs text-reliance-white/50 font-bold uppercase">Ideal Brush</span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {surfaceTools[selectedSurface]?.brush}
                  </p>
                </div>

                <div className="border-l-2 border-reliance-gold pl-4 py-1">
                  <span className="block text-xs text-reliance-white/50 font-bold uppercase">Roller Type</span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {surfaceTools[selectedSurface]?.roller}
                  </p>
                </div>

                <div className="border-l-2 border-reliance-gold pl-4 py-1">
                  <span className="block text-xs text-reliance-white/50 font-bold uppercase">Masking Tape</span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {surfaceTools[selectedSurface]?.tape}
                  </p>
                </div>

                <div className="border-l-2 border-reliance-gold pl-4 py-1">
                  <span className="block text-xs text-reliance-white/50 font-bold uppercase">Recommended Undercoat</span>
                  <p className="text-sm font-semibold text-reliance-gold mt-0.5">
                    {surfaceTools[selectedSurface]?.undercoat}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-reliance-white/60">Need to calculate paint quantity?</span>
              <Link
                href="/calculator"
                className="flex items-center gap-1 text-xs font-bold text-reliance-gold hover:text-white transition-colors"
              >
                Paint Calculator
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PAINT DIAGNOSTICIAN ("PAINT DOCTOR") ── */}
      <section id="paint-doctor" className="bg-[#0A101C] py-20 text-white relative overflow-hidden">
        {/* Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,168,76,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-reliance-gold/5 rounded-full blur-3xl" />

        <div className="container max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-reliance-red/10 border border-reliance-red/30 text-reliance-red px-3 py-1 font-bold uppercase text-[10px] tracking-wider rounded-none mb-4">
              Diagnostic Tool
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
              The Wall Diagnostics Lab
            </h2>
            <p className="text-reliance-white/60 max-w-xl mx-auto text-base">
              Got wall issues? Select a symptom below to uncover its root causes and professional step-by-step cures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Symptom selector list (Left 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-reliance-gold mb-1 block">
                Select Observed Symptom
              </span>
              {troubleshooterIssues.map((issue) => {
                const IsSelected = issue.id === selectedIssueId;
                const IssueIcon = issue.icon;

                return (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={cn(
                      "w-full text-left p-4 border transition-all flex items-center gap-4 cursor-pointer relative",
                      IsSelected
                        ? "bg-[#162032] border-reliance-gold shadow-lg shadow-reliance-gold/5"
                        : "bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 flex items-center justify-center shrink-0",
                        IsSelected ? "bg-reliance-gold text-reliance-navy" : "bg-white/5 text-white/60"
                      )}
                    >
                      <IssueIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm sm:text-base truncate">
                          {issue.title}
                        </span>
                        <span className={cn("text-[9px] font-extrabold uppercase px-2 py-0.5 tracking-wider border", issue.severityColor)}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 line-clamp-1">
                        {issue.symptom}
                      </p>
                    </div>

                    {IsSelected && (
                      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-reliance-gold" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Diagnostic Panel (Right 7 Cols) */}
            <div className="lg:col-span-7 bg-[#162032] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <h4 className="text-xl font-bold text-white">Diagnostics Report</h4>
                  <div className="flex items-center gap-1.5 text-xs text-reliance-gold font-bold">
                    <Info className="w-4 h-4" />
                    Professional Standard
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-2xl font-bold text-reliance-gold mb-2 font-heading">
                    {activeIssue.title}
                  </h5>
                  <p className="text-sm text-white/80 leading-relaxed italic bg-black/20 p-4 border-l-2 border-reliance-red/50">
                    &ldquo;{activeIssue.symptom}&rdquo;
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-reliance-gold uppercase tracking-wider block mb-1">
                    Root Causes
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {activeIssue.causes}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-reliance-gold uppercase tracking-wider block mb-3">
                    The Cure (Step-by-Step)
                  </span>
                  <div className="space-y-3">
                    {activeIssue.remedy.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-reliance-gold/20 text-reliance-gold flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-white/85 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <div>
                  <span className="block text-[10px] text-white/50 font-bold uppercase">
                    Recommended Solution
                  </span>
                  <span className="font-bold text-reliance-gold text-sm sm:text-base">
                    {activeIssue.recommendedProduct}
                  </span>
                </div>
                <Link
                  href="/products"
                  className="bg-reliance-gold hover:bg-white text-reliance-navy text-xs font-bold py-3 px-5 text-center transition-colors shrink-0"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RICH CURATED DIY HANDBOOK / GUIDES SECTION ── */}
      <section id="guides-section" className="container max-w-6xl py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-reliance-navy font-heading mb-4">
            The Painting Handbook
          </h2>
          <p className="text-reliance-grey max-w-xl mx-auto text-base">
            Detailed guides curated by painting professionals. Search and filter by category to locate the information you require.
          </p>
        </div>

        {/* Search & Category filter bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 max-w-4xl mx-auto bg-white p-4 border border-gray-200/50 shadow-sm">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides or steps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-reliance-offwhite/50 border border-gray-200 text-reliance-navy outline-none focus:border-reliance-navy transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 justify-center w-full md:w-auto">
            {[
              { id: "all", label: "All" },
              { id: "prep", label: "Prep Work" },
              { id: "techniques", label: "Techniques" },
              { id: "color", label: "Color Selection" },
              { id: "eco", label: "Eco-Friendly" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedGuide(null);
                }}
                className={cn(
                  "py-2 px-4 text-xs font-bold transition-all border cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-reliance-navy text-white border-reliance-navy"
                    : "bg-transparent text-reliance-navy border-gray-200 hover:bg-slate-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 max-w-md mx-auto">
            <Info className="w-12 h-12 text-reliance-grey mx-auto mb-4" />
            <h3 className="font-bold text-reliance-navy text-lg mb-1">No guides found</h3>
            <p className="text-reliance-grey text-sm px-4">
              We couldn&apos;t find any guides matching &quot;{searchQuery}&quot;. Try adjusting your keywords.
            </p>
          </div>
        ) : (
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => {
              const isExpanded = expandedGuide === guide.id;

              return (
                <div
                  key={guide.id}
                  className={cn(
                    "group flex flex-col bg-white border border-gray-200/50 overflow-hidden transition-all duration-300 relative",
                    isExpanded ? "md:col-span-2 lg:col-span-3 border-reliance-gold shadow-xl" : "hover:shadow-xl hover:-translate-y-1"
                  )}
                >
                  {/* Guide Layout Split when expanded, Stacked when collapsed */}
                  <div className={cn("flex flex-col", isExpanded && "lg:flex-row")}>
                    {/* Image */}
                    <div
                      className={cn(
                        "relative aspect-16/10 overflow-hidden bg-gray-100 shrink-0",
                        isExpanded ? "lg:w-2/5 lg:aspect-auto lg:min-h-87.5" : "w-full"
                      )}
                    >
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <Badge className="absolute top-4 left-4 bg-reliance-navy text-white text-[10px] font-bold tracking-widest uppercase rounded-none border-0 px-2.5 py-1">
                        {guide.categoryLabel}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-reliance-grey mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-reliance-gold" />
                            {guide.readTime}
                          </span>
                          <span>&bull;</span>
                          <span className="font-semibold uppercase text-reliance-navy">
                            {guide.difficulty}
                          </span>
                        </div>

                        <h3 className="font-bold text-reliance-navy text-xl sm:text-2xl mb-3 font-heading group-hover:text-reliance-gold transition-colors">
                          {guide.title}
                        </h3>

                        <p className="text-reliance-grey text-sm leading-relaxed mb-4">
                          {guide.summary}
                        </p>

                        {/* Steps (Only visible when expanded) */}
                        {isExpanded && (
                          <div className="mt-6 border-t border-gray-100 pt-6 animate-fade-in">
                            <span className="block text-xs font-bold text-reliance-navy uppercase tracking-wider mb-4">
                              Step-by-Step Directions
                            </span>
                            <div className="space-y-4">
                              {guide.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-reliance-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <span className="text-reliance-navy text-sm leading-relaxed">
                                    {step}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Expand Action Button */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <Button
                          onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                          className={cn(
                            "text-xs font-bold rounded-none px-4 py-2 transition-all cursor-pointer",
                            isExpanded
                              ? "bg-reliance-navy hover:bg-reliance-gold text-white"
                              : "bg-reliance-offwhite hover:bg-reliance-navy hover:text-white text-reliance-navy"
                          )}
                        >
                          {isExpanded ? "Collapse Guide" : "Expand Full Guide"}
                          <ArrowRight className={cn("w-3.5 h-3.5 ml-2 transition-transform", isExpanded && "rotate-90")} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── DYNAMIC POSTS FROM DB COLLECTION ── */}
      {initialPosts && initialPosts.length > 0 && (
        <section className="bg-reliance-offwhite py-20 border-t border-gray-200/30">
          <div className="container max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <Badge className="bg-reliance-gold/10 border border-reliance-gold/30 text-reliance-navy px-3 py-1 font-bold uppercase text-[10px] tracking-wider rounded-none mb-3">
                  Our Painting Journal
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-reliance-navy font-heading">
                  Latest from Reliance Blog
                </h2>
              </div>
              <Link
                href="/posts"
                className="flex items-center gap-1.5 text-sm font-bold text-reliance-navy hover:text-reliance-gold transition-colors shrink-0 group"
              >
                Browse All Articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialPosts.map((post: any, idx: number) => {
                const imgUrl = typeof post.meta?.image === "object" && post.meta.image?.url ? post.meta.image.url : null;

                return (
                  <Link
                    key={post.id || idx}
                    href={`/posts/${post.slug}`}
                    className="group bg-white border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <BookOpen className="w-12 h-12" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {post.publishedAt && (
                          <span className="text-xs text-reliance-grey block mb-2">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        )}
                        <h3 className="font-bold text-reliance-navy text-lg line-clamp-2 mb-2 group-hover:text-reliance-gold transition-colors font-heading leading-snug">
                          {post.title}
                        </h3>
                        {post.meta?.description && (
                          <p className="text-reliance-grey text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {post.meta.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-reliance-navy group-hover:text-reliance-gold transition-colors">
                      Read full article
                      <ArrowUpRight className="w-4 h-4 text-reliance-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CALL TO ACTION ── */}
      <section className="bg-reliance-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1),transparent_50%)]" />
        <div className="container relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-reliance-gold mb-4">
            Still Not Sure Where to Start?
          </h2>
          <p className="text-reliance-white/70 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Try our interactive Color Visualiser to test color combinations on walls in real-time, or search for a dealer nearest to you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/visualiser"
              className="bg-reliance-gold hover:bg-white text-reliance-navy font-bold py-3 px-6 transition-colors shadow-lg"
            >
              Launch Color Visualiser
            </Link>
            <Link
              href="/store-locator"
              className="border border-white/20 hover:bg-white/10 text-white font-bold py-3 px-6 transition-all"
            >
              Locate a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
