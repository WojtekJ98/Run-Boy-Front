import CategoryShoe from "@/components/CategoryShoe";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import LogoSlider from "@/components/LogoSlider";
import SliderMain from "@/components/Slider";
import { Product } from "./models/Product";
import mongooseConnect from "./lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Layout from "@/components/Layout";

export default async function Home() {
  const product = await getProduct();
  const newProducts = await getNewProducts();

  return (
    <Layout>
      <SliderMain />
      <LogoSlider />
      <CategoryShoe />
      <Featured product={product} />
      <NewProducts products={newProducts} />
    </Layout>
  );
}

async function getProduct() {
  const featuredProductId = "672a481ac48e793417ace053";
  await mongooseConnect();
  const productFeatured = await Product.findById(featuredProductId).lean();
  return JSON.parse(JSON.stringify(productFeatured));
}

async function getNewProducts() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { updatedAt: -1 },
    limit: 10,
  }).lean();
  return newProducts.map((product) => JSON.parse(JSON.stringify(product)));
}
