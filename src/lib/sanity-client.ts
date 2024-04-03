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

const productByIdQuery = groq`*[_type == 'product' && _id == $productId][0]{...}`

export const productById = async (_id: string) => {
  const product: ProductProps = await client.fetch(productByIdQuery, {
    productId: _id,
  })
  return product
}

// export const getProductById = async (productId: string) => {
//   const query = groq`
//     *[_type == 'product' && _id == $productId][0] {
//       // Define the fields you want to retrieve for the product
//       _id,
//       title,
//       description,
//       // Add other fields as needed
//     }
//   `

//   const params = { productId }
//   const productData = await getCliClient().fetch(query, params)
//   return productData
// }
