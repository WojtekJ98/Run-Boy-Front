import mongooseConnect from "@/app/lib/mongoose";
import { Category } from "@/app/models/Categories";
import { Product } from "@/app/models/Product";

import SingleProduct from "@/components/SingleProduct";

export const dynamicParams = true;

// export async function generateStaticParams() {
//   await mongooseConnect();
//   const products = await Product.find({}, "_id");
//   return products.map((product) => ({ id: product._id.toString() }));
// }

async function getSingleProduct(params) {
  await mongooseConnect();
  const singleProduct = await Product.findById(params.slug).lean();
  return JSON.parse(JSON.stringify(singleProduct));
}
async function getCategories() {
  await mongooseConnect();
  const categories = await Category.find().lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function SingleProductPage({ params }) {
  const product = await getSingleProduct(params);
  const categories = await getCategories();

  if (!product) {
    return <div>Product not found</div>;
  }
  return <SingleProduct product={product} categories={categories} />;
}
