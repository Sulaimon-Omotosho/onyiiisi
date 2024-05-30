import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import {
  CategoriesProps,
  CollectionsProps,
  ProductProps,
  SpecialsProps,
} from "./types";
import { getCliClient } from "sanity/cli";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

export const categoryQuery = groq`*[_type =='category']{...} | order(createdAt asc)`;

export const categories = async () => {
  const categories: CategoriesProps[] = await client.fetch(categoryQuery);
  return categories;
};

export const specialsQuery = groq`*[_type == 'specials']{...} | order(createdAt asc)`;

export const specials = async () => {
  const specials: SpecialsProps[] = await client.fetch(specialsQuery);
  return specials;
};

export const collectionsQuery = groq`*[_type == 'collection']{...} | order(createdAt asc)`;

export const collection = async () => {
  const collection: CollectionsProps[] = await client.fetch(collectionsQuery);
  return collection;
};

const productsByCategoryQuery = groq`
*[_type == 'product' && references(*[_type == 'category' && title == $categoryName]._id)] {...} | order(createdAt asc)`;

export const productsByCategory = async (categoryName: string) => {
  const products: ProductProps[] = await client.fetch(productsByCategoryQuery, {
    categoryName,
  });
  return products;
};

const productsByCategoryKeyQuery = groq`
*[_type == 'product' && references(*[_type == 'category' && _id == $categoryKey])] {...} | order(createdAt desc)`;

export const productsByCategoryKey = async (categoryKey: string) => {
  const products: ProductProps[] = await client.fetch(
    productsByCategoryKeyQuery,
    {
      categoryKey,
    }
  );
  return products;
};

const productsBySpecialQuery = groq`
*[_type == 'product' && references(*[_type == 'specials' && title == $specialsName]._id)] {...} | order(createdAt asc)`;

export const productsBySpecial = async (specialsName: string) => {
  const products: ProductProps[] = await client.fetch(productsBySpecialQuery, {
    specialsName,
  });
  return products;
};

const productsByCollectionQuery = groq`
*[_type == 'product' && references(*[_type == 'collection' && title == $collectionName]._id)] {...} | order(createdAt asc)`;

export const productsByCollection = async (collectionName: string) => {
  const products: ProductProps[] = await client.fetch(
    productsByCollectionQuery,
    {
      collectionName,
    }
  );
  return products;
};

const popularProductsQuery = groq`*[_type == 'product' && popular == true] {...} | order(createdAt desc)`;

export const popularProd = async (popular: any) => {
  const products: ProductProps[] = await client.fetch(popularProductsQuery, {
    popular: true,
  });
  return products;
};

const trendingProductsQuery = groq`*[_type == 'product' && trending == true] {...} | order(createdAt desc)`;

export const trendingProd = async (trending: any) => {
  const products: ProductProps[] = await client.fetch(trendingProductsQuery, {
    trending: true,
  });
  return products;
};
const limitedProductsQuery = groq`*[_type == 'product' && limited == true] {...} | order(createdAt desc)`;

export const limitedProd = async (limited: any) => {
  const products: ProductProps[] = await client.fetch(limitedProductsQuery, {
    limited: true,
  });
  return products;
};

const productByIdQuery = groq`*[_type == 'product' && _id == $productId][0]{...}`;

export const productById = async (_id: string) => {
  const product: ProductProps = await client.fetch(productByIdQuery, {
    productId: _id,
  });
  return product;
};

const latestProductsQuery = groq`*[_type == 'product']{...} | order(_createdAt desc) [0..7]`;

export const productsByLatest = async () => {
  const products: ProductProps = await client.fetch(latestProductsQuery);
  return products;
};

const getAllProductsQuery = groq`*[_type == "product"] {
  _id,
  title,
  slug,
  image,
  brand,
  price,
  details,
  quantity,
  "category": category->{ _key, title }
}`;

export const getAllProducts = async () => {
  try {
    const products: ProductProps[] = await client.fetch(getAllProductsQuery);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const productsByDetailsQuery = groq`
  *[_type == 'product' &&
    (gram == $gram ||
     price == $price ||
     ratings == $ratings)]
  {...}
  | order(createdAt desc)
`;

export const productsByDetails = async (
  gram: number,
  price: number,
  ratings: number
) => {
  const products: ProductProps[] = await client.fetch(productsByDetailsQuery, {
    gram,
    price,
    ratings,
  });
  return products;
};
