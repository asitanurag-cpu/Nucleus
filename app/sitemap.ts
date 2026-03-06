import { MetadataRoute } from "next";
import { articles } from "@/lib/data/articles";
import { signals } from "@/lib/data/signals";
import { vcFirms } from "@/lib/data/vc-firms";
import { playbooks } from "@/lib/data/playbooks";

const BASE_URL = "https://nucleusvc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/analysis`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/funding`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/signals`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/landscape`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/playbooks`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/newsletter`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const articlePages = articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      url: `${BASE_URL}/analysis/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const signalPages = signals.map((s) => ({
    url: `${BASE_URL}/signals/${s.startup_slug}`,
    lastModified: new Date(s.added_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const vcPages = vcFirms.map((f) => ({
    url: `${BASE_URL}/landscape/${f.slug}`,
    lastModified: new Date(f.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const playbookPages = playbooks.map((p) => ({
    url: `${BASE_URL}/playbooks/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages, ...signalPages, ...vcPages, ...playbookPages];
}
