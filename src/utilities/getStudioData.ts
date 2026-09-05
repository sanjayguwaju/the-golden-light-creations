import { getPayload } from "payload";
import configPromise from "@payload-config";
import {
  defaultPortfolio,
  defaultFilms,
  defaultServices,
  defaultTestimonials,
  defaultStudioSettings,
  defaultPosts,
  defaultNavigation,
  type FallbackPortfolioItem,
  type FallbackFilmItem,
  type FallbackServiceItem,
  type FallbackTestimonialItem,
  type FallbackPostItem,
  type StudioNavigation,
} from "./studioDefaults";

// Re-export defaults and types for convenience
export {
  defaultPortfolio,
  defaultFilms,
  defaultServices,
  defaultTestimonials,
  defaultStudioSettings,
  defaultPosts,
  defaultNavigation,
  type FallbackPortfolioItem,
  type FallbackFilmItem,
  type FallbackServiceItem,
  type FallbackTestimonialItem,
  type FallbackPostItem,
  type StudioNavigation,
};

// ==============================================================================
// Server-Side Data Loaders (Runs ONLY on the server)
// ==============================================================================

export async function getStudioPortfolio(): Promise<FallbackPortfolioItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "portfolio",
      sort: "order",
      limit: 100,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        const mediaUrl =
          typeof doc.image === "object" && doc.image?.url
            ? doc.image.url
            : doc.imageUrl || defaultPortfolio[0].src;

        return {
          id: String(doc.id),
          title: doc.title,
          category: doc.category,
          categoryLabel:
            doc.category.charAt(0).toUpperCase() + doc.category.slice(1),
          src: mediaUrl,
          location: doc.location || "Kathmandu",
          slug: doc.slug,
        };
      });
    }
  } catch (error) {
    console.warn("Failed to fetch studio portfolio from database, using fallback:", error);
  }

  return defaultPortfolio;
}

export async function getStudioFilms(): Promise<FallbackFilmItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "films",
      sort: "order",
      limit: 50,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        const thumbUrl =
          typeof doc.posterImage === "object" && doc.posterImage?.url
            ? doc.posterImage.url
            : doc.posterUrl || defaultFilms[0].thumb;

        return {
          id: String(doc.id),
          title: doc.title,
          category: doc.category,
          thumb: thumbUrl,
          duration: doc.duration || "3:30",
          videoUrl: doc.videoUrl,
        };
      });
    }
  } catch (error) {
    console.warn("Failed to fetch studio films from database, using fallback:", error);
  }

  return defaultFilms;
}

export async function getStudioServices(): Promise<FallbackServiceItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "services",
      sort: "order",
      limit: 50,
      depth: 0,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        num: doc.serviceNumber || "001",
        name: doc.title,
        desc: doc.shortDescription,
        icon: doc.icon || "camera",
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch studio services from database, using fallback:", error);
  }

  return defaultServices;
}

export async function getStudioTestimonials(): Promise<FallbackTestimonialItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 50,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        const avatarUrl =
          typeof doc.avatar === "object" && doc.avatar?.url
            ? doc.avatar.url
            : doc.avatarUrl || defaultTestimonials[0].avatar;

        return {
          id: String(doc.id),
          name: doc.clientName,
          role: doc.roleOrEvent,
          text: doc.quote,
          avatar: avatarUrl,
          rating: doc.rating || 5,
        };
      });
    }
  } catch (error) {
    console.warn("Failed to fetch studio testimonials from database, using fallback:", error);
  }

  return defaultTestimonials;
}

export async function getStudioSettings() {
  try {
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({
      slug: "studio-settings",
      depth: 1,
    });

    if (settings) {
      return {
        hero: {
          eyebrow: settings.hero?.eyebrow || defaultStudioSettings.hero.eyebrow,
          headlinePart1: settings.hero?.headlinePart1 || defaultStudioSettings.hero.headlinePart1,
          headlinePart2: settings.hero?.headlinePart2 || defaultStudioSettings.hero.headlinePart2,
          subheadline: settings.hero?.subheadline || defaultStudioSettings.hero.subheadline,
        },
        marqueeItems:
          settings.marqueeItems && settings.marqueeItems.length > 0
            ? settings.marqueeItems
            : defaultStudioSettings.marqueeItems,
        stats: {
          projectsCount: settings.stats?.projectsCount ?? defaultStudioSettings.stats.projectsCount,
          clientsCount: settings.stats?.clientsCount ?? defaultStudioSettings.stats.clientsCount,
          socialReach: settings.stats?.socialReach || defaultStudioSettings.stats.socialReach,
          yearsExperience: settings.stats?.yearsExperience ?? defaultStudioSettings.stats.yearsExperience,
        },
        story: {
          headline: settings.story?.headline || defaultStudioSettings.story.headline,
          quote: settings.story?.quote || defaultStudioSettings.story.quote,
          paragraph1: settings.story?.paragraph1 || defaultStudioSettings.story.paragraph1,
          paragraph2: settings.story?.paragraph2 || defaultStudioSettings.story.paragraph2,
        },
        contact: {
          phone: settings.contact?.phone || defaultStudioSettings.contact.phone,
          whatsappNumber: settings.contact?.whatsappNumber || defaultStudioSettings.contact.whatsappNumber,
          email: settings.contact?.email || defaultStudioSettings.contact.email,
          address: settings.contact?.address || defaultStudioSettings.contact.address,
        },
        socialHandles: {
          instagram: settings.socialHandles?.instagram || defaultStudioSettings.socialHandles.instagram,
          youtube: settings.socialHandles?.youtube || defaultStudioSettings.socialHandles.youtube,
          tiktok: settings.socialHandles?.tiktok || defaultStudioSettings.socialHandles.tiktok,
          facebook: settings.socialHandles?.facebook || defaultStudioSettings.socialHandles.facebook,
        },
        navigation: {
          navItems:
            settings.navigation?.navItems && settings.navigation.navItems.length > 0
              ? settings.navigation.navItems
              : defaultNavigation.navItems,
          ctaButton: {
            label:
              settings.navigation?.ctaButton?.label ||
              defaultNavigation.ctaButton?.label ||
              "Book a Shoot",
            href:
              settings.navigation?.ctaButton?.href ||
              defaultNavigation.ctaButton?.href ||
              "/contact",
          },
          enableSearch: settings.navigation?.enableSearch ?? defaultNavigation.enableSearch,
          enableWhatsApp: settings.navigation?.enableWhatsApp ?? defaultNavigation.enableWhatsApp,
          enableLocaleSwitcher:
            settings.navigation?.enableLocaleSwitcher ?? defaultNavigation.enableLocaleSwitcher,
        },
      };
    }
  } catch (error) {
    console.warn("Failed to fetch studio settings global, using fallback:", error);
  }

  return {
    ...defaultStudioSettings,
    navigation: defaultNavigation,
  };
}

export async function getStudioPosts(limit = 3): Promise<FallbackPostItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      limit,
      depth: 1,
      overrideAccess: false,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        const imageUrl =
          typeof doc.meta?.image === "object" && doc.meta.image?.url
            ? doc.meta.image.url
            : typeof doc.heroImage === "object" && doc.heroImage?.url
            ? doc.heroImage.url
            : defaultPosts[0].image;

        const categoryTitle =
          Array.isArray(doc.categories) && doc.categories.length > 0 && typeof doc.categories[0] === "object"
            ? doc.categories[0].title || "Stories"
            : "Journal";

        const formattedDate = doc.publishedAt
          ? new Date(doc.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "Recently";

        return {
          id: String(doc.id),
          title: doc.title || "Untitled",
          slug: doc.slug || "",
          excerpt:
            doc.meta?.description ||
            "Read our latest studio perspectives, wedding advice, and cinematography breakdowns.",
          category: categoryTitle,
          date: formattedDate,
          image: imageUrl,
          readTime: "5 min read",
        };
      });
    }
  } catch (error) {
    console.warn("Failed to fetch studio posts from database, using fallback:", error);
  }

  return defaultPosts.slice(0, limit);
}
