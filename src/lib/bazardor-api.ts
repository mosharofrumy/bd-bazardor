import type { Product, Category } from "@/types/product";

const API_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_ENDPOINTS) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();

      if (Array.isArray(json)) return json as T;
      if (json && typeof json === "object") {
        const foundKey = ["data", "products", "categories", "results"].find(
          (key) => key in json,
        );
        if (foundKey) return (json as Record<string, unknown>)[foundKey] as T;
      }

      return json as T;
    } catch (error) {
      lastError = error;
    }
  }
  
  throw new Error(`সব API রিকোয়েস্ট ব্যর্থ হয়েছে: ${endpoint}`, {
    cause: lastError,
  });
}

export const getProducts = () => fetchFromAPI<Product[]>("/products");

export const getCategories = () => fetchFromAPI<Category[]>("/categories");

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === categorySlug);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}
