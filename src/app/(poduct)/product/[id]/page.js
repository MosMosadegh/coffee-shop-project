import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import ProductModel from "@/models/Product";
import connectToDb from "@/configs/db";
import mongoose from "mongoose";

//Start MetaData
export async function generateMetadata({ params }) {
  await connectToDb();
  const productID = params.id;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return {
      title: "محصول یافت نشد",
      description: "محصول مورد نظر یافت نشد.",
    };
  }

  const productData = await ProductModel.findOne({ _id: productID }, "-__v");
  const product = JSON.parse(JSON.stringify(productData));

  return {
    title: `${product.name} - فروشگاه ما`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.img,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${productID}`,
      // type: "product",
      siteName: "فروشگاه ما",
    },
  };
}
//Finish MetaData

//Start Main Function
const product = async ({ params }) => {
  await connectToDb();
  const productID = params.id;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return (
      <div className={styles.container}>
        <div data-aos="fade-up" className={styles.contents}>
          Invalid product ID
        </div>
      </div>
    );
  }

  const productData = await ProductModel.findOne(
    { _id: productID },
    "-__v"
  ).populate("comments", "-__v");
  const product = JSON.parse(JSON.stringify(productData));

  return (
    <>
    <div className={styles.container}>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />
          <Gallery productImg={product.img} />
        </div>
        <Tabs product={product} />
        {/* find Related Product that similar to as "Smell" */}
        <MoreProducts smell={product.smell} productID={product._id} />
      </div>
    </div>
    </>
  );
};

export default product;
