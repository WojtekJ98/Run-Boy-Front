import ProductsPage from "@/components/ProductsPage";
import mongooseConnect from "../lib/mongoose";
import { Product } from "../models/Product";
import { Category } from "../models/Categories";

export default async function Page() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await mongooseConnect();
  const allProducts = await Product.find({}).lean();
  const allCategories = await Category.find({}).lean();
  const products = allProducts.map((product) =>
    JSON.parse(JSON.stringify(product))
  );
  const categories = allCategories.map((category) =>
    JSON.parse(JSON.stringify(category))
  );
  await sleep(2000); // Simulate delay

  return <ProductsPage products={products} categories={categories} />;
}
