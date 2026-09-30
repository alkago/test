import { siteConfig } from "./site";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(siteConfig.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
