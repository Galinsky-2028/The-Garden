export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { SEARCH_INDEXING_ENABLED } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", ...(SEARCH_INDEXING_ENABLED ? { allow: "/" } : { disallow: "/" }) }] };
}
