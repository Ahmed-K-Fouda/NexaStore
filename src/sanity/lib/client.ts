import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { sanityFetch } from "./live";
import { Product, ProductCategory } from "@/sanity.types";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const getAllProducts = async () => {
  const query = '*[_type == "product"]';
  const products = await sanityFetch({ query: query });
  return products.data as Product[];
};

export const getAllCategories = async () => {
  const query = '*[_type == "productCategory"]';
  const category = await sanityFetch({ query: query });
  return category.data as ProductCategory[];
};

// get category by slug
export const getCategoryBySlug = async function (slug: string) {
  const query = '*[_type == "productCategory" && slug.current == $slug][0]';
  const category = await sanityFetch({ query: query, params: { slug } });
  return category.data as ProductCategory;
};

// get product by category slug
export const getProductsByCategorySlug = async function (slug: string) {
  const query =
    '*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]';
  const products = await sanityFetch({ query: query, params: { slug } });
  return products.data as Product;
};

// search on product
export const searchProducts = async function (searchQuery: string) {
  const query =
    '*[_type == "product" && (title match "*" + $searchQuery + "*" || description match "*" + $searchQuery + "*" || category->title match "*" + $searchQuery + "*" || category->slug match "*" + $searchQuery + "*")]';
  const products = await sanityFetch({ query: query, params: { searchQuery } });
  return products.data as Product;
};

// get product by id

export const getProductById = async function (id: string) {
  const query = '*[_type == "product" && _id == $id][0]';
  const product = await sanityFetch({ query: query, params: { id } });
  return product.data as Product;
};
