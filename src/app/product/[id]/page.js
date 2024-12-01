import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import ProductModel from "@/models/Product";
import connectToDb from "@/configs/db";
import mongoose from "mongoose";

const product = async ({ params }) => {
  connectToDb();
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

  //find Related Product that similar to as "Smell"
  const relatedProductData = await ProductModel.find({
    smell: product.smell,
  });
  const relatedProduct = JSON.parse(JSON.stringify(relatedProductData));

  return (
    <div className={styles.container}>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />
          <Gallery />
        </div>
        <Tabs product={product} />
        <MoreProducts relatedProduct={relatedProduct} />
      </div>
    </div>
  );
};

export default product;
